
//封装发送请求函数
import axios from './request'

export const resLogin=(username,password)=>axios.post('./login',{username,password});