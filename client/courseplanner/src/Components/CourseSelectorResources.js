import React from 'react'
import styles from './CourseSelectorResources.module.css'

function CourseSelectorResources() {

        return (<div className={styles.disclaimerWrapper}>
                        <div className={styles.disclaimerHead}>Degree Planning Resources</div>

                        <div className={styles.disclaimerPg}>
                                <a href="https://oue.utdallas.edu/undergraduate-advising/ap-credit/" target="_blank">AP Credit for Courses</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://oue.utdallas.edu/undergraduate-advising/ib-credit" target="_blank">IB Credit for Courses</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://oue.utdallas.edu/undergraduate-advising/clep-credit" target="_blank">CLEP Credit for Courses</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/policies/course-policies#load" target="_blank">Recommended Hours per Semester</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/minors" target="_blank">Undergraduate Minors</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/programs/teacher-education-certification" target="_blank">Teacher Education Certification and UTeach Program</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/2020/undergraduate/policies/course-policies#repeat" target="_blank">Repeating Courses</a>,
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/policies/registration#dropping-and-withdrawing" target="_blank"> 6-Withdrawal Rule</a>, 
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/tuition-and-financial-aid/excessive-hours" target="_blank"> Excessive Undergraduate Hours</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/curriculum/core-curriculum" target="_blank">What is Core Curriculum?</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/policies/graduation#graduation-requirements" target="_blank">Graduation Requirements</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/courses" target="_blank">List of all Undergraduate Courses</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://coursebook.utdallas.edu/" target="_blank">UTD Coursebook</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://utdgrades.com/" target="_blank">UTD Grades</a>
                        </div>

                        <div className={styles.disclaimerHead2}>Disclaimers</div>
                        <div className={styles.disclaimerSmall}>
                                Verify your degree plan with your academic advisor to ensure accurate semester class offerings, prerequisite flow, and degree requirements are met. 
                        </div>
                        <div className={styles.disclaimerSmall}>
                                Make sure to keep track of your prerequisites and corequisites while forming your degree plan.
                        </div>
                        <div className={styles.disclaimerSmall}>
                                Not all courses are offered over Summer, so if you plan to take summer courses, ensure that they are available. You can check previous semester offerings with Coursebook.
                        </div>
                        <div className={styles.disclaimerSmall}>
                                Not all courses are offered through Study Abroad, so check what is available when planning.
                        </div>
                 </div>)
}

export default CourseSelectorResources