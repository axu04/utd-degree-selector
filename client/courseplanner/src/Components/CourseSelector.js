import React, { useState, useRef, useEffect } from 'react'
import styles from './CourseSelector.module.css'
import Requirements from './Requirements'
import Fade from 'react-reveal/Fade'
import CourseDND from './CourseDND'
import CourseSelectorResources from './CourseSelectorResources'
import { animateScroll } from 'react-scroll'

function CourseSelector(props) {
        const [showingMessage, setShowingMessage] = useState(false)

        const element = useRef(null)

        useEffect(() => {
                element.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        })

        const changeMessage = () => {
                setShowingMessage(oldMessage => {
                        let newMessage = !oldMessage;
                        return newMessage
                })
        }
        var route = props.location.pathname
        const degreeTitle = route.slice(1, route.length)
        localStorage.setItem('Degree', degreeTitle)
        return <div>
                        <Fade top>
                                <div className={styles.title}>{degreeTitle}</div>
                        </Fade>
                        <div className={styles.bigContainer}>
                                <Fade left>
                                        <div className={styles.container}><Requirements degreeName={degreeTitle}/></div>
                                </Fade>
                                <Fade right>
                                        <div className={styles.courseList}>
                                                <CourseDND changeMessage={changeMessage} degreeTitle={degreeTitle} showingMessage={showingMessage}/>
                                        </div>
                                </Fade>
                                
                        </div>
                {showingMessage ? <CourseSelectorResources /> : null}
                <div id={'element'} ref={element}></div>
        </div>
}

export default CourseSelector