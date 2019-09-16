/*
* 1.对请求进行进一步的封装，在发送请求中只处理成功，失败的交给拦截器去操作，简化了请求的操作
* 2.发送请求的同时会携带一些公共的参数，故需要设置拦截器，用来处理需要发送的一些公共参数
*/

import axios from 'axios';
import store from '@redux/store';
import {message} from 'antd';

//创建axios的实例,返回的是一个实例对象
const instance=axios.create({
        //基本路径
        baseURL:'http://localhost:3000/api',

        //超时处理
        timeout:3000

});

//设置请求拦截器---发送请求之前触发函数（目的是为了携带一些公共的请求头参数，eg：token）
instance.interceptors.request.use(

    (config) =>{
        //设置需要发送的公共请求头参数
        //config就是发送请求的配置对象信息（请求的方法，请求头，请求头参数）

        /*
        * 1.这里需要发送的公共请求头就是authorzation，即：token
        * 2.token值的获取方式有两种
        *      ----1).从localstorage获取token，但是由于localstorage存储在本地，可近似看成是对数据库进行的操作，因此效率较慢
        *      ----2).从redux中获取token，redux是内存存储，处理速度较快，故在这里利用redux来获取token
        * 3.如何获取redux中的token？
        *      ----1).利用高阶组件connect方法，但是要使用connect的必须是一个组件，这里不是组件故使用不了
        *      ----2).使用store.getState()方法来获取状态数据
        * 4./api/login不需要请求头，故要做处理
        */
        const {token}=store.getState().user;
        if (token){
            config.headers.authorzation=token;
        }
       return config;
}
    /*(err) => {
        return Promise.reject(err);
      }*/
    );

//设置响应拦截器---处理响应之前触发的函数
instance.interceptors.response.use(


    /*
    * 1.请求成功---状态码为200，但是请求成功不代表功能成功
    * 2.第一个回调相当于一个then方法，返回一个实例触发后面（即触发axios请求中的catch方法）的then方法（如果返回的是一个成功的实例【功能成功】）或者是         catch方法（如果返回的是一个失败的实例【功能失败】）
    *
    */
    (response)=>{

        const result=response.data;

        if (result.status===0){
            //如果status===0，代表功能成功
            return result.data;
        }else{
            //功能失败---错误信息
             message.error(result.msg);

            //返回一个失败的Promise实例---触发后面的catch方法
            return Promise.reject(result.msg)
        }

    },

    //
    /*
    * 1.请求失败---响应状态码为400，500
    * 2.第二个回调相当于一个catch方法，返回一个失败的实例，触发后面的catch方法（即触发axios请求中的catch方法）
    *
    *
    */
    (error)=>{

        //打印出错误的结果，方面代码人员调试
        console.log('axios请求失败：',error);

        //错误信息
        message.error('未知错误，请联系管理员');

        //返回一个失败的Promise实例---触发后面的catch方法
        return Promise.reject('未知错误，请联系管理员')
    }
);

export default instance;