import React, { Component } from 'react'
import 'core-js/fn/map'
import 'core-js/fn/object/assign'
import 'core-js/fn/array/from'

export default class App extends Component {

    constructor(props) {
        super(props);
        document.getElementById("root").style.height = window.innerHeight+"px";
        this.childrenMap = new Map()
        this.childrenMap.set(props.location.pathname, props.children)
        this.currentPath = props.location.pathname

        this.lastScrollTop = 0
        this.titles = []
        this.rootDom = document.getElementById('root')
        console.log("111111")
    }

    componentWillReceiveProps(nextProps) {
        console.log("2222233333")
        if (nextProps.location.pathname == this.props.location.pathname) {
            return
        }
        this.childrenMap.set(nextProps.location.pathname, nextProps.children)
        this.currentPath = nextProps.location.pathname

        if (nextProps.location.action == 'POP'||nextProps.location.action == 'REPLACE') {
            this.childrenMap.delete(this.props.location.pathname)
            this.rootDom.scrollTop = this.lastScrollTop
        } else {
            this.titles.push(document.title)
            this.lastScrollTop = this.rootDom.scrollTop
            this.rootDom.scrollTop = 0
        }

    }

    render() {
        return (
            <div style={{height: '100%' }} className={!!navigator.userAgent.match(/\biPhone\b|\biPod\b|\biPad\b/i) ? 'platform-ios' : 'platform-other'}>
                {[...this.childrenMap].map((item) => {
                    return <div key={item[0]} style={{ display: this.currentPath == item[0] ? 'block' : 'none', width: '100%', height: '100%' }}>
                        {React.cloneElement(item[1], this.props)}
                    </div>
                })}
            </div>
        )
    }
}