import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BackButton.module.css'

function BackButton() {
        return (<Link to='/degreeSelector'>
                <button className={styles.selectionFinish}>
                        &#60; Change Degree
                </button>
        </Link>)
}

export default BackButton