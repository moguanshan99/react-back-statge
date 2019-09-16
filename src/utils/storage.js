
//设置永久化存储
function setItem(key,value) {
   window.localStorage.setItem(key,JSON.stringify(value));
}

//读取存储的数据
function getItem(key) {
    const result=window.localStorage.getItem(key);
    return JSON.parse(result);

}

//删除数据
function removeItem(key) {
    window.localStorage.removeItem(key);


}
export {
    setItem,
    getItem,
    removeItem
}