//Contains the declaration for the CourseLayoutResources component
//Lists extra resources from UTD as well as disclaimers and instructions on exporting options
//Last Edited: Tanmay Karandikar -- July 21

import React from 'react'
import styles from './CourseLayoutResources.module.css'

function CourseLayoutResources() {

        return (<div className={styles.disclaimerWrapper}>
                        <div className={styles.disclaimerHead}>Exporting Options</div>
                        <div className={styles.disclaimerSmall}>
                                To export as a table including information on semester hours and prerequisites, click the Export to Excel option. This creates a .csv file that can be converted into an Excel file by choosing File, selecting Save as, and picking .xlsx or .xls. Alternatively, this information can be copied and pasted into a different spreadsheet location that you prefer.
                        </div>
                        <div className={styles.disclaimerSmall}>
                                On the other hand, if you would like to save your created degree plan with the box grid above, press control p (or command p on Mac) and make the destination a save as pdf. Be aware that based on height restrictions, not all information may be captured. For the highest quality use landscape, but if courses are not visible in this orientation, switch to portrait.
                        </div>
                        <div className={styles.disclaimerHead}>Degree Planning Resources</div>

                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/curriculum/core-curriculum" target="_blank" rel="noopener noreferrer">What counts as Core Curriculum?</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://oue.utdallas.edu/undergraduate-advising/ap-credit/" target="_blank" rel="noopener noreferrer">AP Credit for Courses</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://oue.utdallas.edu/undergraduate-advising/ib-credit" target="_blank" rel="noopener noreferrer">IB Credit for Courses</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://oue.utdallas.edu/undergraduate-advising/clep-credit" target="_blank" rel="noopener noreferrer">CLEP Credit for Courses</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/minors" target="_blank" rel="noopener noreferrer">Undergraduate Minors</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/curriculum/other-degree-requirements" target="_blank" rel="noopener noreferrer">Double Major Requirements</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/programs/teacher-education-certification" target="_blank" rel="noopener noreferrer">Teacher Education Certification and UTeach Program</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/policies/course-policies#load" target="_blank" rel="noopener noreferrer">Recommended Hours per Semester</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/2020/undergraduate/policies/course-policies#repeat" target="_blank" rel="noopener noreferrer">Repeating Courses</a> ,&nbsp;
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/policies/registration#dropping-and-withdrawing" target="_blank" rel="noopener noreferrer">6-Withdrawal Rule</a> ,&nbsp;
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/tuition-and-financial-aid/excessive-hours" target="_blank" rel="noopener noreferrer">Excessive Undergraduate Hours</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/policies/graduation#graduation-requirements" target="_blank" rel="noopener noreferrer">Graduation Requirements</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://catalog.utdallas.edu/2020/undergraduate/courses" target="_blank" rel="noopener noreferrer">List of All Undergraduate Courses</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://coursebook.utdallas.edu/" target="_blank" rel="noopener noreferrer">UTD Coursebook</a>
                        </div>
                        <div className={styles.disclaimerPg}>
                                <a href="https://utdgrades.com/" target="_blank" rel="noopener noreferrer">UTD Grades</a>
                        </div>

                        <div className={styles.disclaimerHead2}>Disclaimers</div>
                        <div className={styles.disclaimerSmall}>
                                If seeking a double major or degree, one should check the requirements found in the degree planning resources. Also, your current selected courses will remain selected if you return to the degree list.
                        </div>
                        <div className={styles.disclaimerSmall}>
                                Verify your degree plan with your academic advisor to ensure accurate semester class offerings, prerequisite flow, and degree requirements are met. 
                        </div>
                        <div className={styles.disclaimerSmall}>
                                This is made for 2020-2021 school year degree plans. Your degree requirements depend on when you chose your major/minor.
                        </div>
                        <div className={styles.disclaimerSmall}>
                                Make sure to keep track of your prerequisites and corequisites while forming your degree plan.
                        </div>
                        <div className={styles.disclaimerSmall}>
                                Not all courses are offered over summer, so if you plan to take summer courses, ensure that they are available. You can check previous semester offerings with Coursebook.
                        </div>
                        <div className={styles.disclaimerSmall}>
                                Not all courses are offered through Study Abroad, so check what is available when planning.
                        </div>
                        <div className={styles.disclaimerSmall}>
                                Classes with variable hours are only counted as a single hour in the degree planner. Look at the course information in the UTD course list or talk to an advisor to determine the number of hours.
                        </div>
         </div>)
}

export default CourseLayoutResources