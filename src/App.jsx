import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import routes from "./config/routes";

export default class App extends React.Component {


    render() {
        return (
            <Router>
                {/*<Switch>*/}
                {/*    <Route path="/" exact component={Home}/>*/}
                {/*    <Route path="/login" exact component={Login}/>*/}
                {/*</Switch>*/}

                {
                    routes.map((route,index)=>{
                        return <Route {...route} key={index}/>
                    })
                }
            </Router>
        );
    }


}