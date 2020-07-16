import React, { useState, useEffect } from 'react'
import styles from './ExportCSV.module.css'
import {CSVLink} from 'react-csv'
import ReactTable from 'react-table'

function ExportCSV(props) {
        const [semesterCourses, setSemesterCourses] = useState([])
        const [downloadData, setDownloadData] = useState([])

        useEffect(() => {
                setSemesterCourses(props.degreeCourses)
        })

        const handleClick = () => {
                setDownloadData(toCSV(pivot(semesterCourses)))
        }

        const pivot = (data) => {
                var mp = new Map()

                function setValue(a, path, val) {
                        if (Object(val) !== val) {
                                var pathStr = path.join('.')
                                var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr)
                                a[i] = val;
                        } else {
                                for (var key in val) {
                                    setValue(a, key == '0' ? path : path.concat(key), val[key])
                                }
                        }
                        return a
                }
                var result = data.map( obj => setValue([], [], obj) )
                return [[...mp.keys()], ...result]
        }

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