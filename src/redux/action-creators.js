/*
* 包含n个生成action对象的工厂函数模块
*/

import {SAVE_USER} from './action-types';

export const saveUser=(user)=>({
     type:SAVE_USER,data:user
});