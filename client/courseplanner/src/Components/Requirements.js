//Contains the declaration for the Requirements component
//Last Edited: Alec Xu -- July 19

import React from 'react'
import './Requirements.css'
import apis from '../api/api'

export default class Requirements extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        degreeInfo: []
                }
        }

        //Method is called once after the component first renders 
        //Calls the api to retrieve requirements data for a particular degree 
        //and sets the degreeInfo state with the given data
        async componentDidMount() {
                var data = await apis.getDegreeById(this.props.degreeName)
                for (let i = 0; i < data.data.degreeData.length; i++) {
                        const dataInformation = data.data.degreeData[i][0];
                        if (i === 0) {
                                while (data.data.degreeData[i][0].substring(1, 2) !== '.') {
                                        data.data.degreeData.shift()
                                }
                        }
                        if (dataInformation.substring(0, 3) === 'or ' || 
                                dataInformation.substring(0, 3) === 'Or ') {
                                        data.data.degreeData[i][0] = '\xa0\xa0\xa0'.concat(data.data.degreeData[i][0])
                        }
                }
                this.setState({ degreeInfo: data.data.degreeData })
        }

        render() {
                
                return <div>
                        <div className='degreeRequirements'>Degree Requirements</div>
                        <hr />
                        {this.state.degreeInfo.map((requirements, index) => (
                                
                                <div className={requirements[1]} id={requirements[2]} key={index}>{requirements[0]}</div>
                        ))}
                </div>
        }
}