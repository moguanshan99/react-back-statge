import React from 'react';
import {Form,Input,Icon,Button,message} from 'antd'
import {connect} from 'react-redux'
import {saveUser} from "@redux/action-creators";
import './index.less'
import logo from '@assets/images/logo.png';
import {resLogin} from '../../api'
import withCheckLogin from "@conts/with-check-login";


/*
* 1.react-redux中有一个方法：connect()(),是一个高阶组件，通过connect方法可以将action-creators中                                         的方法作为props的属性来进行组件间数据的传递
* 2.Login组件中不需要用户数据（状态数据），故可以不传，只引入saveUser方法就好
*/
@withCheckLogin
@connect(
    null,
    {saveUser})

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
                *    ----"proxy": "http://localhost:5000"
                *               ---目标服务器
                */
                // axios.post('http://localhost:3000/api/login',{username,password})
                //
                // //返回的值是一个promise实例，故可以使用.then().catch()
                //
                // //解构赋值  {data}=response.data
                //     .then(({data})=>{
                //         //请求发送成功
                //         //判断功能是否完成（即判断返回的status值）
                //         if (data.status===0){
                //             message.success('登录成功');
                //
                //             /*
                //             * 登录成功之后需要保存用户的其他数据，eg：token等
                //             * 1.数据保存在哪里呢？
                //             *   ---如果数据保存在组件中，那么只有该组件才能用，但是返回的用户数据不仅仅是该组件在使用，其他的组件可能也要用
                //             *   ---故要将用户数据存储到redux中（redux就是集中管理多个组件的共享数据）
                //             * 2.redux是内存存储，页面一旦刷新记录就没有啦，因此还要做持久化存储
                //             *       ---localStorage ：永久存储（只要不删除缓存就一直在）
                //             *           ---localStorage有三个方法
                //             *                    1).存储：setItem(key,value)
                //             *                    2).读取：getItem(key)
                //             *                    3).删除：removeItem(key)
                //             *           ---将这些方法封装一下，放在一个专门的文件中——utils（一般用来放封装工具的方法）
                //             *       ---sessionStorage: 会话存储，一旦页面一关闭，记录就会删除
                //             * 3.Login组件要使用redux中的action.data
                //             *       ---在react-redux中用一个方法：connect()(),是一个高阶组件，通过connect方法可以将action-creators中                                       的方法作为props的属性来进行组件间数据的传递
                //             */
                //
                //             this.props.saveUser(data.data);
                //
                //             //登录成功跳转'/'路由
                //             /*
                //             *  <Redirect to="/"/>;
                //             *  1.用于在render方法中进行重定向（在组件中使用就单纯的将Redirect看成组件）
                //             */
                //
                //             /*
                //             *1. Login组件是通过Route组件加载的，故Login组件props中有history等三个属性，可以通过浏览器历史纪录进行跳转
                //             *2. replace：替换，不需要回退
                //             *3. push：会在组件后追加一个新的，可回退
                //             */
                //             this.props.history.replace('/');  //用于非render方法中进行路由的跳转
                //         }else{
                //             message.error(data.msg)
                //         }
                //     })
                //     .catch((error)=>{
                //         //请求发送失败
                //         message.error('未知错误，请联系管理员')
                //     })
                //
                //     //当登录失败的时候要清空密码，请求时异步的，代码不能写在请求中，否则当你一提交密码还没有等请求发送密码就已经清空了，Es9提供了新                      的方法finally，不管是成功还是失败都会触发
                //     .finally(()=>{
                //         this.props.form.resetFields(['password']);
                //     })

                     resLogin(username,password)

                    .then((result)=>{

                           //登录成功
                            message.success('登录成功');

                            //保存用户数据
                            this.props.saveUser(result);

                            //登录成功，跳转到'/'路由
                            this.props.history.replace('/');  //用于非render方法中进行路由的跳转

                    })
                    .catch((error)=>{
                       //清空密码
                        this.props.form.resetFields(['password']);
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
                                            * 2.validator：值是一个函数，但是函不好复用，故在this上创建一个函数，不用重复创建函数，实现                                                          代码的复用
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