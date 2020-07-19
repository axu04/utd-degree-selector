//Contains the declaration for the ExportCSV component
//Last Edited: Alec Xu -- July 19

import React, { useState, useEffect } from 'react'
import styles from './ExportCSV.module.css'
import {CSVLink} from 'react-csv'

function ExportCSV(props) {
        const [semesterCourses, setSemesterCourses] = useState([])
        const [downloadData, setDownloadData] = useState([])

        //the useEffect method is called only when props.degreeCourses
        //is passed in and sets the semesterCourses state with the
        //passed in data
        useEffect(() => {
                setSemesterCourses(props.degreeCourses)
        }, [props.degreeCourses])

        //handleClick function sets the state of downloadData whenever the 
        //respective div is clicked
        const handleClick = () => {
                setDownloadData(toCSV(pivot(semesterCourses)))
        }

        //pivot() function
        //Parameters: data - an array of object data
        //Returns: A 2D array of all the information stored within the array
        //Does: Takes an array of objects and returns a 2D array containing all
        //      of the nested object data
        const pivot = (data) => {
                var mp = new Map()

                function setValue(a, path, val) {
                        if (Object(val) !== val) {
                                var pathStr = path.join('.')
                                var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr)
                                a[i] = val;
                        } else {
                                for (var key in val) {
                                    setValue(a, key === '0' ? path : path.concat(key), val[key])
                                }
                        }
                        return a
                }
                var result = data.map( obj => setValue([], [], obj) )
                return [[...mp.keys()], ...result]
        }

        //toCSV() function
        //Parameters: data - a 2D array containing exporting
        //Returns: a inverted 2D array of the passed in data
        //Does: Will shift the 2D data into a vertical fashion
        const toCSV = (data) => {
                var csvData = []

                for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].length; j++) {
                                if (i === 0) {
                                        continue
                                } else if (j === 1) {
                                        continue
                                }
                                csvData.push([])
                                csvData[csvData.length-1].push(data[i][j])
                                if (j === 0) {
                                        csvData.push([])
                                        csvData[csvData.length-1].push(" ")
                                }
                        }
                }
                return csvData
                
        }
        return (<div className={styles.ContinueForwardDiv}>
                        <CSVLink filename="DegreePlan.csv" className={styles.ContinuingForward} onClick={handleClick} data={downloadData}>Export to Excel (.CSV)</CSVLink>
                </div>)
}

export default ExportCSV