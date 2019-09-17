import React from 'react';
import {Menu,Icon} from 'antd';
import {withRouter,Link} from 'react-router-dom'
import menus from "@config/menus";
const {SubMenu}=Menu;


// @withCheckLogin
@withRouter
//将Menu封装成一个单独的组件，是为了便于以后对导航操作，实现不同的功能，这样就不用在父组件中进行操作
class LeftNav extends React.Component {



    /*
    * 1.点击切换地址；Link组件，用Link组件将菜单包裹，利用Link组件中的to属性，进行跳转
    * 2.当点击菜单时，利用Link组件先改变要跳转的地址，一旦地址变化，就会触发render方法重新渲染组件得到最新的地址
    * 3.当再次刷新时（相当于将内存中的所有的组件都被卸载，重新渲染生成新的组件，即所有的组件都会初始化渲染），掉用render方法得到当前的pathname
    *   同时又根据menu.key的值去动态的选择那个菜单被高亮选中
    */

    //一旦代码重复使用两次，就进行封装
    createItem=(menu)=>{
        return (
            <Menu.Item key={menu.key}>
                <Link to={menu.key}>
                <Icon type={menu.Icon}/>
                <span>{menu.title}</span>
                </Link>
            </Menu.Item>
            )

    };

    //创建菜单的方法
    createMenu=()=>{
        //遍历menus
        return  menus.map((menu)=>{
            //判断是否是二级菜单
            if (menu.children){
              return (
                  <SubMenu
                      key={menu.key}
                      title={
                          <span>
                           <Icon type={menu.Icon}/>
                            <span>{menu.title}</span>
                        </span>
                      }
                  >
                      {
                          //二级菜单是一个数组，遍历生成其中的每一个子菜单
                          menu.children.map((cMenu) => {
                             return (
                                this.createItem(cMenu)
                             )
                          })
                      }

                  </SubMenu>
              )

            }else {

                //一级菜单
                return this.createItem(menu)
            }
        })
    };

    //判断路径是否是二级菜单的某项
    findOpenKeys=(pathname)=>{

      /*
   * forEach遍历的缺点：当已经找到二级菜单的某项时，在进行遍历已经没有意义了，但是return又跳不出整个函数（只跳出了当前函数）
   *                   只能在外面定义一个变量，将值赋值给这个变量，在函数外return出去，阻止不了遍历，效率低
   */
        // let openKeys='';
        // menus.forEach((menu)=>{
        //     if (menu.children){
        //         menu.children.forEach((cMenu)=>{
        //             if (cMenu.key===pathname){
        //                 openKeys=menu.key
        //             }
        //         })
        //     }
        // });
        // return openKeys;
      for (let i = 0; i <menus.length ; i++) {
        const menu=menus[i];
        if (menu.children){
          for (let j = 0; j <menu.children.length ; j++) {
              const cMenu=menu.children[j];
            if(cMenu.key===pathname){
             return menu.key;
            }
          }
        }
      }
    };

    render() {

        const {pathname}=this.props.location;
        console.log(pathname);

        //定义一个方法用来生成menu
        const menus=this.createMenu();

        //定义一个方法用来判断路径是否是二级菜单的某项
        const openKeys=this.findOpenKeys(pathname);


        return (

          /*
          * 1.theme="dark"：调整主题
          * 2.defaultSelectedKeys={['1']}：默认选中的key（即key值是什么对应就高亮显示那个菜单）
          *     ----思路：
          *        ----1).根据路径（利用路由的三大属性：location属性中的pathname）去匹配哪一个菜单高亮显示，即要设置对应的key值
          *        ----2).但是该组件不是通过路由去加载的没有路由的三大属性，要获得该三大属性就需要通过一个高阶组件withRoute进行传递
          *        ----3).随后根据pathname去menus中找到对应的key，因此要在menus中设置对应的路径，即将key值变成路由路径
          * 3.mode="inline"：列表展示的方式
          * 4.defaultOpenKeys={[]}:默认选中的是否是打开状态（即选中的是二级菜单，当刷新时，一级菜单默认展开）
          *     ----思路：
          *          --定义一个方法，传一个参数【pathname】，根据pathname去查找menus中对应的key，判断该路径是否是二级菜单中的某一项
          *            若是则展开对应的一级菜单
          */
            <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKeys]} mode="inline">

                {
                    menus
                }

            </Menu>
        );
    }

}
export default LeftNav;