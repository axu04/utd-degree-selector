import React from 'react'
import styles from './ExportCSV.module.css'

export default class ExportCSV extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        degreePlan: []
                }
        }

        componentDidMount() {
                this.setState({ degreePlan: this.props.data })
        }

        render() {
                console.log(this.state.degreePlan)
                return (<div className={styles.ContinueForwardDiv}>
                                <button className={styles.ContinuingForward}> Export Your Degree </button>
                                
                        </div>)
        }
}