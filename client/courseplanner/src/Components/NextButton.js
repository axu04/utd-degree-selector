import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NextButton.module.css'

function NextButton(props) {
        return (<Link to={{
                        pathname: "/courseLayout",
                        myProps: {
                                listing: props.selectedCourses
                        }}}>
                
                        <button className={styles.selectionFinish}>
                                Next Steps  >
                        </button>
                </Link>)
}

export default NextButton