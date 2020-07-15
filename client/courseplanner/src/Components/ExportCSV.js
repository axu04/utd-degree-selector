import React, { useState, useEffect } from 'react'
import styles from './ExportCSV.module.css'
import {CSVLink} from 'react-csv'
import ReactTable from 'react-table'

function ExportCSV(props) {
        const [semesterCourses, setSemesterCourses] = useState([])
        const [downloadData, setDownloadData] = useState([])
        const [headers, setHeaders] = useState([{label: 'Semester', key: 'Semester'}])

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
                return data.map( row => 
                        row.map ( val => isNaN(val) ? JSON.stringify(val) : +val ).join(',')
                ).join('\n');
        }
        console.log(downloadData)
        return (<div className={styles.ContinueForwardDiv}>
                        <button onClick={handleClick} className={styles.ContinuingForward}> Export Your Degree </button>
                        <CSVLink data={downloadData}>Download Data</CSVLink>
                </div>)
}

export default ExportCSV