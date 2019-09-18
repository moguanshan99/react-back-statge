import React from 'react';
import { Layout, Breadcrumb, } from 'antd';
import {withTranslation} from 'react-i18next';
import logo from '@assets/images/logo.png';
import withCheckLogin from '@conts/with-check-login'
import './index.less'
import LeftNav from "./left-nav";
import HeaderMain from "./header-main";
const { Header, Content, Footer, Sider } = Layout;

/*
* 1.withTranslation高阶组件，通过props传递两个参数t（translation）和i18n
*     ---t：专门用来做国际化，t('title'):会根据当前的语言环境去找translation.json中的title
*     ---i18n：是一个对象，身上有一个changeLanguage方法，用来切换语言的
*/
@withTranslation()
//登录验证
@withCheckLogin
class BasicLayout extends React.Component {

    /*
    *  初始化状态数据：
    *     ---collapsed：用来判断导航是否收缩，默认为false
    *     ---isDisplay：用来判断文字是否隐藏，默认为true
    *
    */
    state = {
        collapsed: false,
        isDisplay:true
    };


    //点击'<'：collapsed发生变化，文字也发生变化（展示或隐藏）
    onCollapse = collapsed => {

        //更新状态数据
        this.setState({
                collapsed,
                isDisplay:!this.state.isDisplay
            }
            );
    };

    render() {

        //t专门用来做国际化，t('title'):会根据当前的语言环境去找translation.json中的title
        const {t}=this.props;
        const {isDisplay,collapsed}=this.state;
        return (

            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="basic-layout-logo" >
                        <img src={logo} alt="logo"/>
                        <h1 style={{display:isDisplay?'block':'none'}}>{t('title')}</h1>
                    </div>
                  <LeftNav/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 ,height:80}} >
                           <HeaderMain/>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }

}
export default BasicLayout;