// lets you have a sticky horizontal scrollbar
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

function getScrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

class StickyScrollbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollElem: null,
            contentElem: null,
            scrollParent: null
        };
        this.scrollElem = (elem) => {
            this.state.scrollElem = elem;
        };
        this.contentElem = (elem) => {
            this.state.contentElem = elem;
        };
        this.scrollParent = (elem) => {
            this.state.scrollParent = elem;
        };
        this.handleScroll = (ev) => {
            this.state.scrollParent.scrollLeft = this.state.contentElem.scrollLeft = ev.target.scrollLeft;
        };
        this.handleWindowScroll = () => {
            const showScroll = this.state.contentElem && (this.state.contentElem.getBoundingClientRect().bottom > window.innerHeight);
            this.state.scrollParent.style.visibility = showScroll ? 'visible' : 'hidden';
        };
    }
    
    componentWillUnmount() {
        this.state.scrollParent.removeEventListener('scroll', this.handleScroll);
        this.state.contentElem.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('scroll', this.handleWindowScroll);
    }

    componentDidMount() {
        this.state.scrollElem.style.width = this.state.contentElem.scrollWidth + 'px';
        this.state.scrollParent.style.width = this.state.contentElem.clientWidth + 'px';
        this.state.scrollParent.style.height = getScrollbarWidth() + 'px';
        this.state.scrollParent.addEventListener('scroll', this.handleScroll);
        this.state.contentElem.addEventListener('scroll', this.handleScroll);
        window.addEventListener('scroll', this.handleWindowScroll);
        this.handleWindowScroll();
    }

    render() { 
        return <div>
            <div style={{ overflowX: 'auto' }} ref={this.contentElem}>
                {this.props.children}
            </div>
            <div ref={this.scrollParent} style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                position: 'fixed',
                bottom: '0',
            }}>
                <div ref={this.scrollElem} style={{ height: '1px'}}/>
            </div>
        </div>;
    }
}
 
export default hot(StickyScrollbar);