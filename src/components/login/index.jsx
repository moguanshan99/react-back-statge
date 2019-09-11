import React from 'react';
import {Form,Input,Icon,Button,message} from 'antd'
import axios from 'axios';
import './index.less'
import logo from './logo.png';

//调用一个高阶组件Form.create()()是为了创建form属性，用于自定义表单校验
@Form.create()
 class Login extends React.Component {

    /**
     * 自定义表单校验
     * @param rule  校验规则
     * @param value  所有表单项的值
     * @param callback 必须调用，当callback传参时，表示校验失败，并提示校验参数；当callback不传参时，表示校验成功。
     */
    validator=(rule, value, callback)=>{
        // console.log(rule, value);
        const name=rule.field==='username'?'用户名':'密码';
        if (!value){
           return callback(`请输入${name}`)
        }
        if (value.length<3){
            return callback(`${name}长度必须大于三位`)
        }
        if (value.length>16){
            return callback(`${name}长度必须小于16位`)
        }
        const reg= /^[a-zA-Z0-9_]{3,13}$/;
        if (!reg.test(value)){
            return callback(`${name}只能包含英文、数字和下划线`);
        }

        callback();
    };

    //点击登录
    login=(e)=>{
        //阻止浏览器默认行为
        e.preventDefault();

        /*
        * 1.点击登录后需要对表单项的值进行表单验证，通过验证才能登录
        * 2.form中提供了一个方法用来激活表单项值的验证
        *     ----this.props.form.validateFields((error,values)=>{})
        *              ---第一个参数：error：校验失败   值是一个对象{}
        *                                   检验成功   值为null  故判断error的值就可以校验
        *              ---第二个参数：values：所有表单项的值
        */
        this.props.form.validateFields((error,values)=>{

            if (!error){
                console.log(values);


                //获取表单项的值，解构赋值
                const {username,password}=values;

                //校验成功后发送请求登录
                /*
                *1. ajax发送请求会有跨域问题，浏览器端口号3000，服务器端口号5000（是因为浏览器的同源策略安全机制，要求发送请求只能在同一端口号发送才能成功）
                *2.解决跨域问题：
                *   --1.jsonp：修改服务器接口，要修改服务器代码，不适用
                *   --2.cors：修改服务端代码
                *   --3.proxy：服务器代理模块
                *        ---正向代理（只能用于开发环境，不能用于上线环境）
                *             1).浏览器发送请求给代理服务器（此时端口号一致，不存在跨域问题）
                *             2).代理服务器将请求转发给目标服务器（服务器端不存在跨域问题）
                *             3).目标服务器返回响应给代理服务器
                *             4).代理服务器返回响应给浏览器端
                *        ---反向代理（nginx）
                * 3.React脚手架内置了代理服务器功能，需要在package.json中设置一个字段开启代理服务器功能
                *
                */
                axios.post('http://localhost:3000/api/login',{username,password})
                //返回的值是一个promise实例
                    .then((response)=>{
                        //请求发送成功
                        //判断功能是否完成（即判断返回的status值）
                        if (response.data.status===0){
                            message.success('登录成功')
                        }else{
                            message.error(response.data.msg)
                        }
                    })
                    .catch((error)=>{
                        //请求发送失败
                        message.error('未知错误，请联系管理员')
                    })



            }
        })
    };

    render() {

        // getFieldDecorator 专门表单校验的方法高阶组件
        const {getFieldDecorator}=this.props.form;

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="尚硅谷"/>
                    <h1>React,后台管理系统</h1>
                </header>
                <section className="login-section">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.login}>
                        <Form.Item>
                            {
                                /*
                                    1.在Form组件中，有一个getFieldDecorator方法，是一个高阶组件（作用：复用代码），用于表单验证
                                    2.高阶组件连续调用两次
                                        --第一次调用：参数1：key："",
                                                     参数2：{rules：[{}]}
                                        --第二次调用：传的是一个组件，返回的是一个新的组件
                                */
                                getFieldDecorator(
                                    'username',
                                    {
                                        rules:[

                                             // 只适用于简单的校验
                                            // {require:true,message:'请输入用户名'},
                                            // {min:3,message: '用户名长度必须大于三位'},
                                            // {max:16,message:'用户名长必须小于16位'}

                                            /*
                                            * 1.在getFiledDecorate方法中，有一个自定义校验规则
                                            * 2.validator：值是一个函数，但是函不好复用，故在this上创建一个函数，不用重复创建函数，实现代码的复用
                                            */
                                            {validator: this.validator }
                                            ]
                                    }
                                )(
                                    <Input prefix={<Icon type="user" />} placeholder="username"/>
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password',
                                    {
                                        rules: [
                                            {validator:this.validator}
                                        ]
                                    }
                                )(
                                    <Input prefix={<Icon type="lock" />} placeholder="password" type="password"/>
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                         <Button type="primary" htmlType="submit" className="login-btn" >登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
B

}
export default Login;