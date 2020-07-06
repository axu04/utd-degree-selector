import React from 'react'
import api from './api/api'
import {
        BrowserRouter as Router,
        Switch,
        Route
} from 'react-router-dom'
import Homepage from './Components/Homepage'
import DegreeSelector from './Components/DegreeSelector'
import CourseSelector from './Components/CourseSelector'

export default class App extends React.Component {

        render() {
                return <Router> 
                                <Switch>
                                        <Route exact path='/'><Homepage /></Route>
                                        <Route path='/degrees'><DegreeSelector /></Route>
                                        <Route path='/:title' component={CourseSelector}></Route>
                                </Switch>
                        </Router>
        }
}