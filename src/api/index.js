
//封装发送请求函数
import axios from './request'

//登录请求
export const resLogin=(username,password)=>axios.post('./login',{username,password});



