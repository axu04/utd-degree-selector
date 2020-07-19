//Contains the declaration for DegreeSelector Component
//Last Edited: Alec Xu -- July 19

import React from 'react'
import apis from '../api/api'
import styles from './DegreeSelector.module.css'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'

export default class DegreeSelector extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        degrees: []
                }
        }

        //Method is called only once after the compoenent is first rendered 
        //Gets all data from the api and changes the degree state data to 
        //contain the information received from the api
        async componentDidMount() {
                var degreeData = await apis.getAllDegrees()
                var degrees = []
                for (let i = 0; i < degreeData.data.length; i++) {
                        const degreeName = degreeData.data[i].degreeTitle
                        degrees.push(degreeName)
                }

                const data = degrees.sort()
                this.setState({ degrees: data })
        }

        render() {
                return (<div>
                                <Fade top>
                                        <div className={styles.choose}>Choose Your Degree<hr /></div>
                                </Fade>
                                
                                {this.state.degrees.map((title, index) => (
                                        <Link to={`${title}`} key={index}>
                                                <Fade left key={index}>
                                                        <button className={styles.eachDegree} key={index}>{title}</button>
                                                </Fade>
                                        </Link>
                                ))}
                        </div>)

        }
}