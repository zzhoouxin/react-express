/**
 * Created by zhouxin on 2017/11/22.
 */
import React from 'react'
import { Route} from 'react-router'
import WrapContainer from './modules/wrapContainer';

/**
 * 将微应用里面声明的路由,自动注入到开发界面。 对应异步按需加载模块
 * rootPathAlias => 微应用根路由在开发界面注册的路由。
 * routes =>微应用的所有路由
 * */
export default (rootPathAlias,routes) => {
    let tmp = [];
    Object.keys(routes).map(key => {
        if(key == '/'){
            tmp.push(<Route path={rootPathAlias} component={WrapContainer} />)
        }else {
            tmp.push(<Route path={key} component={WrapContainer} />)
        }
    });
    return tmp;
}

