import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import routes from "./config/routes";
import NotMatch from "@comps/not-match";
import BasicLayout from "@comps/basic-layout";
import Login from "@conts/login";

export default class App extends React.Component {

    render() {
        return (
            <Router>
                {/*<Switch>*/}
                {/*    <Route path="/" exact component={Home}/>*/}
                {/*    <Route path="/login" exact component={Login}/>*/}
                {/*</Switch>*/}

                {/*
                   Login组件被包裹在BasicLayout组件中，最为该组件的子元素在整个负组件中显示，但Login组件应该单独显示，
                   故应该从BasicLayout组件中提取出来
                */}
                <Switch>
                <Route path='/login' exact component={Login}/>

                {/*
                    1.点击路由，只切换中间部分（即除了中间内容去变化，其他都不影响）
                    2.解决办法：
                        ---在App中引入BasicLayout组件，用来包裹其他组件，但是一旦用组件包裹了，子组件（即被包裹的组件）将不会在显示
                        ---解决办法，将其他组件的内容在<content>中显示，利用this.props.children
                    3.被BasicLayout组件包裹的子元素都会存在于props中children的属性上，children属性就等价于被包裹的所有子组件，只要是
                       被组件包裹的其他子元素都会被添加到children属性上

                 */}
                <BasicLayout>
                <Switch>
                {

                    routes.map((route,index)=>{
                        return <Route {...route} key={index}/>
                    })


                }
                    {/*如果不写path，匹配所有路径*/}
                    <Route component={NotMatch}/>
                </Switch>
                </BasicLayout>
                </Switch>
            </Router>
        );
    }


}