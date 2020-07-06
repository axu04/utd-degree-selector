import React from 'react'
import styles from './CourseSelector.module.css'
import Requirements from './Requirements'
import Fade from 'react-reveal/Fade'
import CourseDND from './CourseDND'

export default class CourseSelector extends React.Component {
        render() {
                var route = this.props.location.pathname
                const degreeTitle = route.slice(1, route.length)
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
                                                        <CourseDND />
                                                </div>
                                        </Fade>
                                </div>
                        </div>
        }
}