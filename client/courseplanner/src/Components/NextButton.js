import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NextButton.module.css'

function NextButton(props) {
        console.log(props.degreeTitle)
        return (<Link to={{
                        pathname: "/courseLayout",
                        myProps: {
                                listing: props.selectedCourses,
                                degreeTitle: props.degreeTitle
                        }}}>
                
                        <button className={styles.selectionFinish}>
                                Next Steps &#62;
                        </button>
                </Link>)
}

export default NextButton