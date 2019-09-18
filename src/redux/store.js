import {createStore,applyMiddleware} from "redux";
import {isEnv} from '@config';

//引入异步中间件
import thunk from "redux-thunk";

//引入开发者工具
import { composeWithDevTools } from 'redux-devtools-extension';

//引入reducers
import reducers from './reducers';

let store;
if(isEnv){

    //开发环境
    store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
}else{

    //生产环境
    store=createStore(reducers,applyMiddleware(thunk));
}

export default store;
