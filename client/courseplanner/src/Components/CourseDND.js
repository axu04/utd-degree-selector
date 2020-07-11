import React, { useEffect, useState, useRef } from 'react'
import styles from './CourseDND.module.css'
import apis from '../api/api'
import NextButton from './NextButton'

function CourseDND() {
        const [list, setList] = useState([])
        const [tempList, setTempList] = useState([])
        const [originalList, setOriginalList] = useState([])
        const [courseNames, setCourseNames] = useState([])
        const [dragging, setDragging] = useState(false)
        const [searchValue, setSearchValue] = useState('')
        const [onClickArray, setOnClickArray] = useState([])

        const dragItem = useRef()
        const dragNode = useRef()

        useEffect( () => {
                async function getData() {
                        var courseData = await apis.getAllCourses()
                        var classes = courseData.data
                        classes.sort((a, b) => (a.courseLabel > b.courseLabel) ? 1 : -1)
                        setList([ { title: 'Available Courses', courses: classes },{ title: 'Selected Courses', courses: [] }])
                        setTempList([ { title: 'Available Courses', courses: classes },{ title: 'Selected Courses', courses: [] }])
                        setOriginalList([ { title: 'Available Courses', courses: classes },{ title: 'Selected Courses', courses: [] }])

                        var tempArray = []
                        for (let i = 0; i < classes.length; i++) {
                                tempArray.push(false)
                        }
                        setOnClickArray(tempArray)
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
                resetTempList()
                const target = e.target

                e.dataTransfer.setData('cardId', target.id)

                dragNode.current = e.target
                dragNode.current.addEventListener('dragend', handleDragEnd)
                dragItem.current = params
                setTimeout(() => {
                        setDragging(true)
                }, 0) 
        }

        const handleDragEnter = (e, params) => {
                if (params.onDiv === 'onDiv' || params.arrayIndex === dragItem.current.arrayIndex) {
                        return
                }

                var currentItem = dragItem.current
                var newCurrentItem = currentItem.itemIndex

                if (params.onDiv === undefined && currentItem.arrayIndex === 0) {
                        params.itemIndex = list[1].courses.length;
                }
                if (params.onDiv === undefined && currentItem.arrayIndex === 1) {
                        params.itemIndex = list[0].courses.length;
                } 

                if (currentItem.arrayIndex !== 1) {
                        newCurrentItem = list[0].courses.indexOf(tempList[0].courses[currentItem.itemIndex])
                }

                if (e.target !== dragNode.current) {
                        setList((oldList) => {
                                let newList = JSON.parse(JSON.stringify(oldList))
                                newList[params.arrayIndex].courses.splice(params.itemIndex, 0, newList[currentItem.arrayIndex].courses.splice(newCurrentItem, 1)[0])
                                dragItem.current = params
                                return newList
                        })
                        setTempList((oldList) => {
                                let newList = JSON.parse(JSON.stringify(oldList))
                                newList[params.arrayIndex].courses.splice(params.itemIndex, 0, newList[currentItem.arrayIndex].courses.splice(currentItem.itemIndex, 1)[0])
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
                resetTempList()
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

        const changeOnClickState = (e, params) => {
                if (dragging) {
                        return
                }

                var courseNameArray = []
                for (let i = 0; i < originalList[0].courses.length; i++) {
                        courseNameArray.push(originalList[0].courses[i].courseLabel)
                }

                setOnClickArray(oldArray => {
                        let newArray = [...oldArray]
                        resetTempList()
                        if (params.arrayIndex === 0) {
                                newArray[courseNameArray.indexOf(tempList[params.arrayIndex].courses[params.itemIndex].courseLabel)] = !newArray[courseNameArray.indexOf(tempList[params.arrayIndex].courses[params.itemIndex].courseLabel)]
                        } else {
                                newArray[courseNameArray.indexOf(list[params.arrayIndex].courses[params.itemIndex].courseLabel)] = !newArray[courseNameArray.indexOf(list[params.arrayIndex].courses[params.itemIndex].courseLabel)]
                        }
                        return newArray
                })
        }
        
        var selectedCourses = []
        if (tempList[0] !== undefined) {
                selectedCourses = [ { title: 'Available Courses', courses: list[0].courses.filter((course) => { 
                        return course.courseLabel.indexOf(searchValue.toUpperCase()) !== -1 }
                )},{ title: 'Selected Courses', courses: list[1].courses }]
        }
        var courseNameArray = []
        if (originalList[0] !== undefined) {
                for (let i = 0; i < originalList[0].courses.length; i++) {
                        courseNameArray.push(originalList[0].courses[i].courseLabel)
                }
        }

        return (<div>
                        <div className={styles.wrapper}>
                                {selectedCourses.map((typeList, arrayIndex) => (
                                        <div 
                                                key={arrayIndex} 
                                                className={styles.dndGroup} 
                                                onDragEnter={dragging && !typeList.courses.length ? e => handleDragEnter(e, {arrayIndex, itemIndex: 0, onDiv: 'first', typeList}) : 
                                                                dragging ? e => handleDragEnter(e, {arrayIndex, itemIndex: typeList.courses.length-1, typeList}) : null }
                                                onDragEnd={e => e.preventDefault()}
                                                onDragOver={dragOver}
                                                onDrop={e => e.preventDefault()}
                                        >
                                                <div className={styles.coursesHeader}>
                                                        {typeList.title} <hr />
                                                </div>
                                                {typeList.title === 'Available Courses' ? <input className={styles.courseFilter}
                                                                                                placeholder="Course Filter (ex. CS 1337)" 
                                                                                                type="text"
                                                                                                value={searchValue}
                                                                                                onChange={e => updateFilter(e)}
                                                                                                >
                                                </input> : null}
                                        {typeList.courses.map((course, itemIndex) => (
                                                <div key={itemIndex} >
                                                        <div 
                                                                draggable
                                                                onDragStart={ e => {handleDragStart(e, {arrayIndex, itemIndex})}}
                                                                onDragEnter={dragging ? (e) => {handleDragEnter(e, {arrayIndex, itemIndex, onDiv: 'onDiv', typeList})} : null}
                                                                className={dragging ? getStyles({arrayIndex, itemIndex, typeList}) : styles.dndItem } 
                                                                onDragEnd={e => e.preventDefault()}
                                                                onClick={e => changeOnClickState(e, {arrayIndex, itemIndex})}
                                                        >
                                                                <div>{course.courseLabel}</div>
                                                                <div>{course.courseTitle}</div>
                                                        </div>
                                                        <div>
                                                                {originalList[0] === undefined || originalList[1] === undefined ? null : 
                                                                        onClickArray[courseNameArray.indexOf(course.courseLabel)] === true ? <div className={styles.explanation}>
                                                                                                                                        {course.requirements}
                                                                                                                                </div>: null }
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                                ))}

                        </div>
                        <NextButton selectedCourses={selectedCourses}/>
                </div>)
}

export default CourseDND

