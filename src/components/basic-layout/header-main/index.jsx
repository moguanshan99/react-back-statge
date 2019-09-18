import React, {Component} from "react";
import {Button,Icon} from 'antd'
import screenfull from 'screenfull';
import './index.less'

class HeaderMain extends Component {

  //初始化状态数据(当点击按钮的时候，图标要发生变化，因此要定义数据状态)
  state={
    isScreenFull:false
  };

  //点击按钮切换全屏
  screenFull=()=>{
    if (screenfull.isEnabled){
      screenfull.toggle();
    }

    // this.setState({
    //   isScreenFull:!this.state.isScreenFull
    // })
  };

  //代码重复了两次，封装成函数
  change=()=>{
    this.setState({
      isScreenFull:!this.state.isScreenFull
    })
  };


  /*
    * toggle:有就退出全屏，没有就全屏，
    *    ---但是有一个问题，当按ESC退出全屏时，也要更新状态数据，但更新状态数据的方法定义在了点击事件中，
    *       不触法点击事件，图标状态就不会改变，因此就要绑定一个事件来解决这个问题
    */

  //绑定事件更新数据变化（事件只需要绑定一次就好，故应该写在componentDidMount生命周期函数中）
  componentDidMount(){

    //绑定事件(change事件中：只要改变就触发这个事件，因此更新状态数据要定义在这个事件中)

   /* screenfull.on("change", ()=>{
      this.setState({
          isScreenFull:!this.state.isScreenFull
         })
    })*/

    screenfull.on("change", this.change)

  };


 /* 当组件被卸载时（DOM元素不存在了，不代表事件也不存在了，因此事件要解绑），事件要解绑（解绑是为了确保内存不会泄露），
    因此事件的解绑要写在componentWillUnmount生命周期函数中【即在组件被卸载前解绑事件】
 */

 componentWillUnmount() {

   //解绑事件

  /* screenfull.off("change", ()=>{
     this.setState({
       isScreenFull:!this.state.isScreenFull
     })
   })*/

   screenfull.off("change", this.change)
 }


  render() {
    const {isScreenFull}=this.state;
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.screenFull}><Icon type={isScreenFull?'fullscreen-exit':'fullscreen'} /></Button>
          <Button className="header-main-btn" size="small">English</Button>
          <span>欢迎,xxx</span>
          <Button type='link' size="small">退出</Button>
        </div>
        <div className="header-main-bottom">
           <h3>首页</h3>
          <span>我是莫关山</span>
        </div>
      </div>
    );
  }
}

export default HeaderMain;