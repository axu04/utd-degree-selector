import React from 'react'
import styles from './Homepage.module.css'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

export default class Homepage extends React.Component {
        render() {
                return  <div>
                                <Fade left><div className={styles.title}>UTD 4-Year Planner</div></Fade>
                                <Fade right>
                                        <Link to='/degreeSelector'>
                                                <button className={styles.degreeButton}>Plan Your Degree Now!</button>
                                        </Link>
                                </Fade>
                        </div>
        }
}