//Contains the declaration for hte CourseLayout componenet
//Last Edited: Alec Xu -- July 19

import React, { useState, useEffect, useRef } from 'react'
import { animateScroll } from 'react-scroll'
import './CourseLayout.css'
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

        //Method that is called whenever the showingMessage state is updated
        //Function will scroll to the bottom of the page when updated
        useEffect(() => {
                element.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }, [showingMessage])

        //Function that runs once when the component initially renders
        //Gets the data from props passed in through the CourseDND and NextButton components
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
        }, [data.location.myProps])

        //Scrolls to the bottom of each semester box whenever the list state is updated
        useEffect(() => {
                if (dragItem.current !== undefined && dragItem.current !== null) {
                        if (dragItem.current.semesterIndex !== 0) {
                                scrollToBottom()
                        }
                }
        }, [list])

        //scrollToBottom() function
        //Params: Nothing
        //Returns: Nothing
        //Does: Scrolls to the bottom of the div element given the 
        //      semester index of the current item being dragged
        const scrollToBottom = () => {
                animateScroll.scrollToBottom({
                        containerId: dragItem.current.semesterIndex
                })
        }

        //handDragStart() function
        //Params: e - the event passed into the function
        //        params - the arrayIndex and itemIndex of the item being dragged
        //Returns: Nothing
        //Does: Initializes data for dragNode and dragItem whenever an item is being dragged
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

        //handleDragEnter() function
        //Params: e - the event passed into the function
        //        params - arrayIndex, itemIndex, typeList and onDiv values for the object 
        //                 being entered
        //Returns: Nothing 
        //Does: Resets and updates the list state based on where the current item being dragged
        //      is being dropped
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

        //handleDragEnd() function
        //Params: e - event passed into the function
        //Returns: Nothing
        //Does: Sorts the 'Available Courses' list as well as clean up dragItem and dragNode values
        const handleDragEnd = (e) => {
                setDragging(false)
                dragItem.current = null
                dragNode.current.removeEventListener('dragend', handleDragEnd)
                dragNode.current = null
                e.preventDefault()
        }

        //dragOver() function
        //Parameters: e - event that is passed into the function
        //Returns: Nothing
        //Does: Calls the preventDefault function in order to remove 
        //      the 'draggable' reverting animation
        const dragOver = e => {
                e.preventDefault()
        }

        //getStyles() function
        //Parameters: params - the item's arrayIndex as well as itemIndex
        //Returns: The div element's className
        //Does: Determines if the item being hovered over is the same as the item being dragged and returns
        //      respective className for css styling
        const getStyles = (params) => {
                const currentItem = dragItem.current
                if (currentItem.semesterIndex === params.semesterIndex && currentItem.itemIndex === params.itemIndex) {
                        return 'draggingCourse'
                }
                return 'selectedCourse'
        }

        //changeOnClickState() function
        //Parameters: e - event passed into the function
        //            params - the arrayIndex and itemIndex of the current item being dragged
        //Returns: Nothing
        //Does: Updates if a course is showing it's description (requirements and credit hours)
        const changeOnClickState = (e, params) => {
                if (dragging) {
                        return
                }
                setOnClickArray(oldArray => {
                        let newArray = [...oldArray]
                        newArray[courseNameArray.indexOf(list[params.semesterIndex].courses[params.itemIndex].courseLabel)] = 
                                !newArray[courseNameArray.indexOf(list[params.semesterIndex].courses[params.itemIndex].courseLabel)]
                        return newArray
                })
                
        }

        //calculateHours() function
        //Parameters: params - the semester being currently calculated
        //Reutrns: the number of credit hours stored in that semester
        //Does: Sums the total number of credit hours of all the courses in
        //      the semester and returns the total
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

        //showHours() function
        //Parameters: params - the course that is being clicked
        //Reutrns: The number of hours 
        //Does: Finds the number of credit hours is within the object passed in through params and returns a string 
        const showHours = params => {
                return params.course.semesterHours.substring(1,params.course.semesterHours.length-1)
        }

        //changeMessage() function
        //Parameters: Nothing
        //Returns: Nothing
        //Does: Changes the state of showingMessage (true/false)
        const changeMessage = () => {
                setShowingMessage(oldMessage => {
                        let newMessage = !oldMessage;
                        return newMessage
                })
        }

        //swapMessage() function
        //Parameters: Nothing
        //Returns: Div tag with the message being printed
        //Does: Checks the state of showingMessage and returns the respective div tag
        const swapMessage = () => {
                if (showingMessage === false) {
                        return <div>&#62; Information and More Resources</div>
                } else {
                        return <div>&or; Information and More Resources</div>
                }
        }

        const listsForEachSem = list
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