import React from 'react';


//定义一个组件，当路径匹配不上时（即地址错误），页面不存在，返回404
export default class NotMatch extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                404
            </div>
        );
    }


}