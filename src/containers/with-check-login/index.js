import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
/*
* 为什么要做登录验证？
*    --1.有些页面需要登录成功之后才能访问，因此要对这些页面进行登录验证
*    --2.只有登录了才能访问，否则跳转回登录夜页面
*    --3.如果已经登陆了，再访问登录页面就定向到该页面，不用再登录
*/

//定义一个高阶组件用来进行登录验证（是因为每个组件都要进行这个登录验证，为实现代码的复用，故定义高阶组件来实现）

export default function withCheckLogin(WrappedComponent) {

    return connect(
        (state)=>({token:state.user.token}),
        null
    )(class extends Component{

        //组件重命名
            static displayName=`CheckLogin(${WrappedComponent.displayName||WrappedComponent.name||'component'})`;

            render() {

                // const {location,token,history,match}=this.props;
                // const {pathname}=location;

                const {token,...rest}=this.props;//除了token，剩余的其他属性全部打包到rest中
                const {location:{pathname}}=rest;
                //登录验证
                /*
                * 1.首先判断当前地址是否为'/login'
                *     --由路由（<Route/>）加载的组件都有路由的三大属性【history，location，match】,而在location中又有一个pathname属性                       ，值为当前的地址
                *     --因为返回的新的组件（即Login组件外面包裹着一个withCheckLogin组件），而新组建是被路由组件加载的，故新组件身上有路由                       的三大属性，故可以直接使用location，但是Login组件不是通过路由加载的，因此已经没有路由的三大属性了，但是可以通过                         withCheck组件传递
                * 2.如果用户已经登陆了，跳转到'/'
                *     --如何判断用户已经登陆了？
                *        ---1).根据token，如果有token证明用户已经登陆了
                *        ---2).如何获取到token  通过connect高阶组件将token传过来
                * 3.如果用户没有登录，则不变
                */

                // if (pathname==='/login'){
                //     if (token){
                //           return <Redirect to="/"/>
                //     }
                // }else{
                //     if (!token){
                //         return <Redirect to="/login"/>
                //     }
                // }

                if (pathname==='/login'&&token) return <Redirect to="/"/>;
                if (pathname!=='/login'&&!token) return <Redirect to="/login"/>;


                //Login组件已经没有路由的三大属性了，故需要通过新组建传递过去
                // return <WrappedComponent history={history} loaction={location} match={match}/>;
                return <WrappedComponent {...rest}/> //解包
            }
        }
    )
}