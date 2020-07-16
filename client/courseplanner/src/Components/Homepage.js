import React from 'react'
import styles from './Homepage.module.css'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import logo from '../mainLogo.png'

export default class Homepage extends React.Component {
        render() {
                return  <div> 

                                <Fade top>
                                        <img src={logo} width="8%" height="8%" className={styles.logo}></img>  
                                </Fade>
                                <Fade left><div className={styles.title}>UTD 4-Year Planner</div></Fade>
                                <Fade right>
                                        <Link to='/degreeSelector'>
                                                <button className={styles.degreeButton}>Plan Your Degree Now!</button>
                                        </Link>

                                </Fade>
                                <Fade bottom>
                                        <div className={styles.acknowledgements}>Created by Alec Xu and Tanmay Karandikar.</div>
                                </Fade>
                                
                        </div>
        }
}