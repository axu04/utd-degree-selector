import React, { useState, useEffect, useRef } from 'react'
import { animateScroll } from 'react-scroll'
import './CourseLayout.css'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ExportCSV from './ExportCSV'
import { Link } from 'react-router-dom'
import CourseLayoutResources from './CourseLayoutResources'

function CourseLayout(data) {
        const [list, setList] = useState([])
        const [dragging, setDragging] = useState(false)
        const [onClickArray, setOnClickArray] = useState([])
        const [courseNameArray, setCourseNameArray] = useState([])
        const [degree, setDegree] = useState('')
        const [showingMessage, setShowingMessage] = useState(false)


        const dragItem = useRef()
        const dragNode = useRef()
        const element = useRef(null)

        useEffect(() => {
                element.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        })

        useEffect(() => {
                var courses = []
                const getLocalStorage = JSON.parse(localStorage.getItem('DndMainItem'))
                if (getLocalStorage !== undefined && getLocalStorage !== null){
                        courses = getLocalStorage[1].courses
                } else if (data.location.myProps === undefined) {
                        courses = []
                } else {
                        courses = data.location.myProps.listing[1].courses
                }
                setList([{title: 'Selected Courses', stylingName: 'selectedWrapper', courses: courses},
                        {title: 'First Year Fall', stylingName: 'semester1Wrapper', courses: []}, 
                        {title: 'First Year Spring', stylingName: 'semester2Wrapper', courses: []},
                        {title: 'Second Year Fall', stylingName: 'semester4Wrapper', courses: []},
                        {title: 'Second Year Spring', stylingName: 'semester5Wrapper', courses: []},
                        {title: 'Third Year Fall', stylingName: 'semester7Wrapper', courses: []},
                        {title: 'Third Year Spring', stylingName: 'semester8Wrapper', courses: []},
                        {title: 'Fourth Year Fall', stylingName: 'semester10Wrapper', courses: []},
                        {title: 'Fourth Year Spring', stylingName: 'semester11Wrapper', courses: []} ])
                var tempArray = []
                for (let i = 0; i < courses.length; i++) {
                        tempArray.push(false)
                }
                setOnClickArray(tempArray)

                var courseNameArrayTemp = []
                for (let i = 0; i < courses.length; i++) {
                        courseNameArrayTemp.push(courses[i].courseLabel)
                }
                setCourseNameArray(courseNameArrayTemp)
                var degree = ''
                const degreeLocalStorage = localStorage.getItem('Degree')
                if (getLocalStorage !== undefined && getLocalStorage !== null) {
                        degree = degreeLocalStorage
                } else {
                        degree = data.location.myProps.degreeTitle
                }
                setDegree(degree)
        }, [])

        useEffect(() => {
                if (dragItem.current !== undefined && dragItem.current !== null) {
                        if (dragItem.current.semesterIndex !== 0) {
                                scrollToBottom()
                        }
                }
        }, [list])

        const scrollToBottom = () => {
                animateScroll.scrollToBottom({
                        containerId: dragItem.current.semesterIndex
                })
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
        }

        const handleDragEnter = (e, params) => {
                if (params.onDiv === 'onDiv' || params.semesterIndex === dragItem.current.semesterIndex) {
                        return
                }

                if (params.onDiv === undefined) {
                        params.itemIndex = params.semester.courses.length;
                }
                const currentItem = dragItem.current
                if (e.target !== dragNode.current) {
                        setList(oldList => {
                                let newList = JSON.parse(JSON.stringify(oldList))
                                newList[params.semesterIndex].courses.splice(params.itemIndex, 0, newList[currentItem.semesterIndex].courses.splice(currentItem.itemIndex, 1)[0])
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
        }

        const dragOver = e => {
                e.preventDefault()
        }

        const getStyles = (params) => {
                const currentItem = dragItem.current
                if (currentItem.semesterIndex === params.semesterIndex && currentItem.itemIndex === params.itemIndex) {
                        return 'draggingCourse'
                }
                return 'selectedCourse'
        }

        const changeOnClickState = (e, params) => {
                if (dragging) {
                        return
                }
                setOnClickArray(oldArray => {
                        let newArray = [...oldArray]
                        newArray[courseNameArray.indexOf(list[params.semesterIndex].courses[params.itemIndex].courseLabel)] = !newArray[courseNameArray.indexOf(list[params.semesterIndex].courses[params.itemIndex].courseLabel)]
                        return newArray
                })
                
        }

        const calculateHours = params => {
                if (params.semester.courses.length === 0) {
                        return 0;
                }
                const courses = params.semester.courses
                var sum = 0;
                for (let i = 0; i < courses.length; i++) {
                        sum += parseInt(courses[i].semesterHours.substring(1,2))
                }
                return sum
        }

        const showHours = params => {
                return params.course.semesterHours.substring(1,params.course.semesterHours.length-1)
        }

        const changeMessage = () => {
                setShowingMessage(oldMessage => {
                        let newMessage = !oldMessage;
                        return newMessage
                })
        }

        const swapMessage = () => {
                if (showingMessage === false) {
                        return <div>&#62; Information and More Resources</div>
                } else {
                        return <div>&or; Information and More Resources</div>
                }
        }

        const listsForEachSem = list

        console.log(data.location.myProps)
                
        return (<div>
                        <div className='choosingWrapper' id='semesters'>
                                {listsForEachSem.map((semester, semesterIndex) => (
                                        <div 
                                                        key={semesterIndex}
                                                        id={semesterIndex}
                                                        className={semester.stylingName}
                                                        onDragEnter={dragging && !semester.courses.length ? e => handleDragEnter(e, {semesterIndex, itemIndex: 0, onDiv: 'first'}) :
                                                                        dragging ? e => handleDragEnter(e, {semesterIndex, itemIndex: semester.courses.length-1, semester}) : null}
                                                        onDragEnd={e => e.preventDefault()}
                                                        onDragOver={dragOver}
                                                        onDrop={e => e.preventDefault()}
                                                >
                                                <div className='selectedHeader'>{semester.title} <div className={"hours"}>Total Hours: {calculateHours({semester})}</div> <hr /></div>
                                                {semester.courses.map((course, itemIndex) => (
                                                        <div key={itemIndex}>
                                                                        <div 
                                                                                        draggable
                                                                                        onDragStart={ e => {handleDragStart(e, {semesterIndex, itemIndex})}}
                                                                                        onDragEnter={dragging ? (e) => {handleDragEnter(e, {semesterIndex, itemIndex, onDiv: 'onDiv'})} : null}
                                                                                        className={dragging ? getStyles({semesterIndex, itemIndex, semester}) : 'selectedCourse' } 
                                                                                        onDragEnd={e => e.preventDefault()}
                                                                                        onClick={e => changeOnClickState(e, {semesterIndex, itemIndex})}

                                                                                >
                                                                                <div>{course.courseLabel}</div>
                                                                                <div>{course.courseTitle}</div>
                                                                        </div>
                                                                        {onClickArray[courseNameArray.indexOf(course.courseLabel)] === true ? <div className="explanation">
                                                                                                                                                        <b><div className="requirementsTextDesc">Requirements</div></b> 
                                                                                                                                                        <div>-----------------------</div>
                                                                                                                                                        {course.requirements}
                                                                                                                                                        <b><div className="hoursTextDesc">Hours</div></b>
                                                                                                                                                        <div>---------</div>
                                                                                                                                                        {showHours({course})}
                                                                                                                                                </div> : null }
                                                        </div>
                                                        
                                                ))}
                                                
                                                <div></div>
                                        </div>
                                ))}     
                        </div>
                        <div className="buttonsWrapper">
                                <div className="infoWrapper">
                                        <button className="moreResources" onClick={changeMessage}><div className="buttonText">{swapMessage()}</div></button>
                                </div>
                                <div className="goBackwardsDiv">
                                        <Link to={degree}>
                                                <button className="goBackwards">&#60; Reselect Courses</button>
                                        </Link>
                                </div>
                                <ExportCSV degreeCourses={list}/>
                        </div>
                        {showingMessage ? <CourseLayoutResources /> : null}
                        <div id={'element'} ref={element}></div>
                </div>)
}

export default CourseLayout