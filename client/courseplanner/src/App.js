import React from 'react'
import {
        Switch,
        Route,
        HashRouter
} from 'react-router-dom'
import Homepage from './Components/Homepage'
import DegreeSelector from './Components/DegreeSelector'
import CourseSelector from './Components/CourseSelector'
import CourseLayout from './Components/CourseLayout'

export default class App extends React.Component {

        render() {
                return <HashRouter> 
                                <Switch>
                                        <Route exact path='/'><Homepage /></Route>
                                        <Route path='/degreeSelector'><DegreeSelector /></Route>
                                        <Route path='/courseLayout' component={CourseLayout}></Route>
                                        <Route path='/:title' component={CourseSelector}></Route>
                                        
                                </Switch>
                        </HashRouter>
        }
}