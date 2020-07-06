import React, { useEffect, useState, useRef } from 'react'
import styles from './CourseDND.module.css'
import apis from '../api/api'

function CourseDND() {
        const [list, setList] = useState([])
        const [dragging, setDragging] = useState(false)

        const dragItem = useRef()
        const dragNode = useRef()

        useEffect( () => {
                async function getData() {
                        var courseData = await apis.getAllCourses()
                        var classes = courseData.data
                        setList([ { title: 'Available Courses', courses: classes },{ title: 'Selected Courses', courses: [] }])
                }
                getData()
        }, [])

        const handleDragStart = (e, params) => {
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

                if (params.onDiv === undefined) {
                        params.itemIndex = params.typeList.courses.length + 1;
                }
                const currentItem = dragItem.current
                if (e.target !== dragNode.current) {
                        setList(oldList => {
                                let newList = JSON.parse(JSON.stringify(oldList))
                                newList[params.arrayIndex].courses.splice(params.itemIndex, 0, newList[currentItem.arrayIndex].courses.splice(currentItem.itemIndex, 1)[0])
                                dragItem.current = params
                                return newList
                        })
                }
                console.log(list)
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

        return (<div className={styles.wrapper}>
                        {list.map((typeList, arrayIndex) => (
                                <div 
                                        key={arrayIndex} 
                                        className={styles.dndGroup} 
                                        onDragEnter={dragging && !typeList.courses.length ? e => handleDragEnter(e, {arrayIndex, itemIndex: 0, onDiv: 'first'}) : 
                                                        dragging ? e => handleDragEnter(e, {arrayIndex, itemIndex: typeList.courses.length-1, typeList}) : null }
                                        onDragEnd={e => e.preventDefault()}
                                        onDragOver={dragOver}
                                        onDrop={e => e.preventDefault()}
                                >
                                        <div className={styles.coursesHeader}>
                                                {typeList.title} <hr />
                                        </div>
                                {typeList.courses.map((course, itemIndex) => (
                                        <div 
                                                draggable
                                                onDragStart={ e => {handleDragStart(e, {arrayIndex, itemIndex})}}
                                                onDragEnter={dragging ? (e) => {handleDragEnter(e, {arrayIndex, itemIndex, onDiv: 'onDiv'})} : null}
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
                </div>)
}

export default CourseDND

