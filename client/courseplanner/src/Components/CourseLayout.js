import React, { useState, useEffect, useRef } from 'react'
import './CourseLayout.css'

function CourseLayout(data) {
        const [list, setList] = useState([])

        const [dragging, setDragging] = useState(false)

        const dragItem = useRef()
        const dragNode = useRef()

        useEffect(() => {
                var courses = []
                if (data.location.myProps === undefined) {
                        courses = []
                } else {
                        courses = data.location.myProps.listing[1].courses
                }
                setList([{title: 'Selected Courses', stylingName: 'selectedWrapper', courses: courses},
                        {title: 'First Year Fall', stylingName: 'semester1Wrapper', courses: []}, 
                        {title: 'Second Year Fall', stylingName: 'semester2Wrapper', courses: []},
                        {title: 'Third Year Fall', stylingName: 'semester3Wrapper', courses: []},
                        {title: 'Fourth Year Fall', stylingName: 'semester4Wrapper', courses: []},
                        {title: 'First Year Spring', stylingName: 'semester5Wrapper', courses: []},
                        {title: 'Second Year Spring', stylingName: 'semester6Wrapper', courses: []},
                        {title: 'Third Year Spring', stylingName: 'semester7Wrapper', courses: []},
                        {title: 'Fourth Year Spring', stylingName: 'semester8Wrapper', courses: []}])
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
                console.log('entered')
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

        const listsForEachSem = list
                
        return (<div className='choosingWrapper'>
                       {listsForEachSem.map((semester, semesterIndex) => (
                               <div 
                                        key={semesterIndex}
                                        className={semester.stylingName}
                                        onDragEnter={dragging && !semester.courses.length ? e => handleDragEnter(e, {semesterIndex, itemIndex: 0, onDiv: 'first'}) :
                                                        dragging ? e => handleDragEnter(e, {semesterIndex, itemIndex: semester.courses.length-1, semester}) : null}
                                        onDragEnd={e => e.preventDefault()}
                                        onDragOver={dragOver}
                                        onDrop={e => e.preventDefault()}
                                >
                                       <div className='selectedHeader'>{semester.title} <hr /></div>
                                       {semester.courses.map((course, itemIndex) => (
                                               <div 
                                                        draggable
                                                        onDragStart={ e => {handleDragStart(e, {semesterIndex, itemIndex})}}
                                                        onDragEnter={dragging ? (e) => {handleDragEnter(e, {semesterIndex, itemIndex, onDiv: 'onDiv'})} : null}
                                                        className={dragging ? getStyles({semesterIndex, itemIndex, semester}) : 'selectedCourse' } 
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

export default CourseLayout