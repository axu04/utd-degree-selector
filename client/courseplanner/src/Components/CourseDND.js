import React, { useEffect, useState, useRef } from 'react'
import styles from './CourseDND.module.css'
import apis from '../api/api'
import NextButton from './NextButton'
import BackButton from './BackButton'
import HowToText from './HowToText'
import { animateScroll } from 'react-scroll'
import { reactLocalStorage } from 'reactjs-localstorage'

function CourseDND(props) {
        const [list, setList] = useState([])
        const [tempList, setTempList] = useState([])
        const [originalList, setOriginalList] = useState([])
        const [dragging, setDragging] = useState(false)
        const [searchValue, setSearchValue] = useState('')
        const [onClickArray, setOnClickArray] = useState([])

        const [message, setMessage] = useState('> More Resources')

        const dragItem = useRef()
        const dragNode = useRef()

        useEffect( () => {
                async function getData() {
                        var courseData = await apis.getAllCourses()
                        var classes = courseData.data
                        classes.sort((a, b) => (a.courseLabel > b.courseLabel) ? 1 : -1)
                        const getLocalStorage = reactLocalStorage.getObject('DndMainItem')
                        if (getLocalStorage !== "undefined" || getLocalStorage !== "null") {
                                setList(getLocalStorage)
                        } else {
                                setList([ { title: 'Available Courses', courses: classes },{ title: 'Selected Courses', courses: [] }])
                        }
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

        useEffect(() => {
                resetTempList()
                if (dragItem.current !== undefined && dragItem.current !== null) {
                        if (dragItem.current.arrayIndex === 1) {
                                scrollToBottom()
                        }
                }
        }, [list])

        const scrollToBottom = () => {
                animateScroll.scrollToBottom({
                        containerId: 1
                })
        }

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
                                reactLocalStorage.setObject('DndMainItem', newList)
                                dragItem.current = params
                                return newList
                        })
                }  
        }

        const handleDragEnd = (e, params) => {
                setDragging(false)
                dragItem.current = null
                dragNode.current = null
                e.preventDefault()
                resetTempList()
                setList(oldList => {
                        let newList = JSON.parse(JSON.stringify(oldList))
                        newList[0].courses.sort((a, b) => (a.courseLabel > b.courseLabel) ? 1 : -1)
                        reactLocalStorage.setObject('DndMainItem', newList)
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
                e.target.value = e.target.value.toUpperCase()
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

        const showHours = params => {
                return params.course.semesterHours.substring(1,params.course.semesterHours.length-1)
        }

        const deleteSelected = params => {
                setList(oldList => {
                        var newList = JSON.parse(JSON.stringify(originalList))
                        reactLocalStorage.setObject('DndMainItem', newList)
                        return newList
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
                                                id={arrayIndex}
                                                className={styles.dndGroup} 
                                                onDragEnter={dragging && !typeList.courses.length ? e => handleDragEnter(e, {arrayIndex, itemIndex: 0, onDiv: 'first', typeList}) : 
                                                                dragging ? e => handleDragEnter(e, {arrayIndex, itemIndex: typeList.courses.length-1, typeList}) : null }
                                                onDragEnd={e => handleDragEnd(e, {arrayIndex})}
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
                                                </input> : <button className={styles.deleteButton} onClick={deleteSelected}>Delete Selected Courses</button>}
                                                {typeList.title === 'Selected Courses' && typeList.courses.length === 0 ? <HowToText /> : null}
                                        {typeList.courses.map((course, itemIndex) => (
                                                <div key={itemIndex} >
                                                        <div 
                                                                draggable
                                                                onDragStart={ e => {handleDragStart(e, {arrayIndex, itemIndex})}}
                                                                onDragEnter={dragging ? (e) => {handleDragEnter(e, {arrayIndex, itemIndex, onDiv: 'onDiv', typeList})} : null}
                                                                className={dragging ? getStyles({arrayIndex, itemIndex, typeList}) : styles.dndItem } 
                                                                onDragEnd={e => handleDragEnd(e)}
                                                                onClick={e => changeOnClickState(e, {arrayIndex, itemIndex})}
                                                        >
                                                                <div>{course.courseLabel}</div>
                                                                <div>{course.courseTitle}</div>
                                                        </div>
                                                        <div>
                                                                {originalList[0] === undefined || originalList[1] === undefined ? null : 
                                                                        onClickArray[courseNameArray.indexOf(course.courseLabel)] === true ? 
                                                                                                                                <div className={styles.explanation}>
                                                                                                                                        <b><div className={styles.requirementsText}>Requirements </div></b> 
                                                                                                                                        <div>-----------------------</div>
                                                                                                                                        {course.requirements}
                                                                                                                                        <b><div className={styles.hoursText}>Hours</div></b>
                                                                                                                                        <div>---------</div>
                                                                                                                                        {showHours({course})}
                                                                                                                                </div> : null }
                                                        </div>
                                                </div>
                                        ))}
                                        <div></div>
                                </div>
                                ))}
                        </div> 
                                <button className={styles.moreResources} onClick={props.changeMessage}><div className={styles.buttonText}>{message}</div></button>
                                <BackButton link={'/degreeSelector'}/>
                                <NextButton selectedCourses={selectedCourses}/>
                </div>)
}

export default CourseDND

