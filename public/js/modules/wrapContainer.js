/**
 * Created by zhouxin on 2018/1/12.
 */
import React, { Component } from 'react';
import { Flex, Button} from 'antd-mobile';

import ModuleRoutesSync from './moduleRoutesAsync';


export default class AntTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component:null,
            error:false
        }
    }

    componentDidMount(){
        let that = this;
        let routes = this.props.routes;
        console.log("routes===>",routes)
        let length = routes.length;
        if(length>0){
            let currentRoute = routes[length -1];
            ModuleRoutesSync[currentRoute.path]().then(function (component) {
                that.setState({
                    component:component.default
                })
            },function () {
                that.setState({
                    error:true
                })
            });
        }

    }




    render() {
        if(this.state.component){
           // console.log(this.props);
            var Component = this.state.component;
            return (
                    <Component {...this.props}/>
            );
        }else {
            if(this.state.error){
                return (
                    <Flex direction="column" align="center" className="wx-error-content">
                        <Flex.Item>
                            <p className="title">Sorry～页面加载错误</p>
                            <Button type="ghost" onClick={this._goMain}>返回首页</Button>
                        </Flex.Item>
                    </Flex>
                )
            }else {
                return null;
            }
        }

    }

    _goMain(){
        window.location.href =window.location.origin + window.location.pathname;
    }
}