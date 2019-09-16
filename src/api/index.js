
//封装发送请求函数
import axios from './request'

export const resLogin=(username,password)=>axios.post('./login',{username,password});



/*
* 备注：
*    1.const 定义的为常量
*    2.  eg：  const a=1；
*                 a=2
*             结果：报错
*
*
*
*
*/