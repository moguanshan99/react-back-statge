import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';

//引入公共的样式
import './assets/less/index.less'
import store from "./redux/store";

//引入国际化
import './i18n';


ReactDOM.render(<Provider store={store}> <App /></Provider>, document.getElementById('root'));
