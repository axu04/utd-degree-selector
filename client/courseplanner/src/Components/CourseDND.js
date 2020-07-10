import React, { useEffect, useState, useRef } from 'react'
import styles from './CourseDND.module.css'
import apis from '../api/api'
import NextButton from './NextButton'

function CourseDND() {
        const [list, setList] = useState([])
        const [tempList, setTempList] = useState([])
        const [dragging, setDragging] = useState(false)
        const [searchValue, setSearchValue] = useState('')

        const dragItem = useRef()
        const dragNode = useRef()

        useEffect( () => {
                async function getData() {
                        var courseData = await apis.getAllCourses()
                        var classes = courseData.data
                        setList([ { title: 'Available Courses', courses: classes },{ title: 'Selected Courses', courses: [] }])
                        setTempList([ { title: 'Available Courses', courses: classes },{ title: 'Selected Courses', courses: [] }])
                }
                getData()
        }, [])

        useEffect(() => {
                resetTempList()
                
        }, [searchValue])

        const resetTempList = () => {
                if (tempList[0] !== undefined) {
                        const selectedCourses = [ { title: 'Available Courses', courses: list[0].courses.filter((course) => { 
                                return course.courseLabel.indexOf(searchValue) !== -1 }
                        )},{ title: 'Selected Courses', courses: list[1].courses }]
                        setTempList(selectedCourses)
                }
        }

        const handleDragStart = (e, params) => {
                const target = e.target

                e.dataTransfer.setData('cardId', target.id)

                dragNode.current = e.target
                dragNode.current.addEventListener('dragend', handleDragEnd)
                dragItem.current = params
                setTimeout(() => {
                        setDragging(true)
                }, 0) 
                resetTempList()
        }

        const handleDragEnter = (e, params) => {
                if (params.onDiv === 'onDiv' || params.arrayIndex === dragItem.current.arrayIndex) {
                        return
                }

                if (params.onDiv === undefined) {
                        params.itemIndex = params.typeList.courses.length;
                } 
                var currentItem = dragItem.current
                var newCurrentItem = currentItem.itemIndex
                if (currentItem.arrayIndex === 0 && searchValue !== '') {
                        newCurrentItem = list[0].courses.indexOf(tempList[0].courses[currentItem.itemIndex])
                        console.log(tempList[0].courses[currentItem.itemIndex])
                        
                }
                if (e.target !== dragNode.current) {
                        setTempList(oldList => {
                                let newList = JSON.parse(JSON.stringify(oldList))
                                newList[params.arrayIndex].courses.splice(params.itemIndex, 0, newList[currentItem.arrayIndex].courses.splice(currentItem.itemIndex, 1)[0])
                                dragItem.current = params
                                return newList
                        })
                        setList(oldList => {
                                let newList = JSON.parse(JSON.stringify(oldList))
                                newList[params.arrayIndex].courses.splice(params.itemIndex, 0, newList[currentItem.arrayIndex].courses.splice(newCurrentItem, 1)[0])
                                dragItem.current = params
                                return newList
                        })
                }
        }

        const handleDragEnd = (e) => {
                setDragging(false)
                dragItem.current = null
                dragNode.current.removeEventListener('dragend', handleDragEnd)
                dragNode.current = null
                e.preventDefault()
                setList(oldList => {
                        let newList = JSON.parse(JSON.stringify(oldList))
                        newList[0].courses.sort((a, b) => (a.courseLabel > b.courseLabel) ? 1 : -1)
                        return newList
                })
        }

        const dragOver = e => {
                e.preventDefault()
        }

        const getStyles = (params) => {
                const currentItem = dragItem.current
                if (currentItem.arrayIndex === params.arrayIndex && currentItem.itemIndex === params.itemIndex) {
                        return styles.currentItem
                }
                return styles.dndItem
        }

        const updateFilter = (e) => {
                setSearchValue(e.target.value)
        }
        
        var selectedCourses = []
        if (tempList[0] !== undefined) {
                selectedCourses = [ { title: 'Available Courses', courses: list[0].courses.filter((course) => { 
                        return course.courseLabel.indexOf(searchValue) !== -1 }
                )},{ title: 'Selected Courses', courses: list[1].courses }]
        }
        return (<div>
                        <div className={styles.wrapper}>
                                {selectedCourses.map((typeList, arrayIndex) => (
                                        <div 
                                                key={arrayIndex} 
                                                className={styles.dndGroup} 
                                                onDragEnter={dragging && !typeList.courses.length ? e => handleDragEnter(e, {arrayIndex, itemIndex: 0, typeList}) : 
                                                                dragging ? e => handleDragEnter(e, {arrayIndex, itemIndex: typeList.courses.length-1, typeList}) : null }
                                                onDragEnd={e => e.preventDefault()}
                                                onDragOver={dragOver}
                                                onDrop={e => e.preventDefault()}
                                        >
                                                <div className={styles.coursesHeader}>
                                                        {typeList.title} <hr />
                                                </div>
                                                {typeList.title === 'Available Courses' ? <input className={styles.courseFilter}
                                                                                                placeholder="Filter Courses" 
                                                                                                type="text"
                                                                                                value={searchValue}
                                                                                                onChange={e => updateFilter(e)}
                                                                                                >
                                                </input> : null}
                                        {typeList.courses.map((course, itemIndex) => (
                                                <div 
                                                        draggable
                                                        onDragStart={ e => {handleDragStart(e, {arrayIndex, itemIndex})}}
                                                        onDragEnter={dragging ? (e) => {handleDragEnter(e, {arrayIndex, itemIndex, onDiv: 'onDiv', typeList})} : null}
                                                        className={dragging ? getStyles({arrayIndex, itemIndex, typeList}) : styles.dndItem } 
                                                        onDragEnd={e => e.preventDefault()}
                                                        key={itemIndex} 
                                                >
                                                        <div>{course.courseLabel}</div>
                                                        <div>{course.courseTitle}</div>
                                                </div>
                                        ))}
                                </div>
                                ))}

                        </div>
                        <NextButton selectedCourses={selectedCourses}/>
                </div>)
}

export default CourseDND

