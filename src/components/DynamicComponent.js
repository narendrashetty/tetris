"use strict";var __extends=this&&this.__extends||function(){var e=function(n,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])})(n,t)};return function(n,t){function r(){this.constructor=n}e(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),__makeTemplateObject=this&&this.__makeTemplateObject||function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)},__rest=this&&this.__rest||function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)n.indexOf(r[o])<0&&(t[r[o]]=e[r[o]])}return t};function __export(e){for(var n in e)exports.hasOwnProperty(n)||(exports[n]=e[n])}Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react"),emotion_1=require("emotion"),react_emotion_1=require("react-emotion"),Utils_1=require("./Utils");__export(require("./DynamicContentStore"));var log_1=require("./log"),FlexBox_1=require("./components/FlexBox"),emotionTheming=require("emotion-theming"),channel=emotionTheming.channel,contextTypes=emotionTheming.contextTypes,ContentFragment=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return __extends(n,e),n.prototype.render=function(){return this.props.children},n}(React.Component);exports.ContentFragment=ContentFragment;var DynamicComponent=function(e){function n(n){var t=e.call(this,n)||this;if("production"!==process.env.NODE_ENV&&!n.name)throw new Error("name is missing");return t}return __extends(n,e),n.prototype.componentWillMount=function(){var e=this,n=this.context[channel];if(void 0===n)return log_1.default.error("No theme context");this.themeUnsubscribeId=n.subscribe(function(n){e.theme=n,e.forceUpdate()})},n.prototype.componentWillUnmount=function(){-1!==this.themeUnsubscribeId&&this.context[channel].unsubscribe(this.themeUnsubscribeId)},n.prototype.parseFragment=function(e,t,r,o,i){var a=this,l=[],s=void 0,c=!1,p=function(t,r){var o=React.Children.map(t.props.children,function(e,o){return{sortOrder:void 0===t.props.sortOrder?l.length+o:t.props.sortOrder,node:e=r?n.cloneElementWithProps(e,i):e}});t.props.replace?("production"!==process.env.NODE_ENV&&s&&log_1.default.warn("Multiple fragments replace the content for",a.props.name," location ",e),s=o,c=c||void 0===t.props.align):l.push.apply(l,o)},_=React.Children.only(t),u=_.props.children;"start"===e&&(React.Children.toArray(u).find(function(e){return React.isValidElement(e)&&e.type===ContentFragment})||p(_,!1));var m=function(n){var t=n;if(!React.isValidElement(t)||t.type!==ContentFragment)return!1;if(t.props.if&&!t.props.if(i))return!1;var r=t.props.align;return r===e||"start"==e&&void 0===r},d=function(e,n){React.Children.toArray(e).filter(m).forEach(function(e){p(e,n)})};d(u,!1),d(r,!0),d(o,!0);var E=s&&s.length>0?s:l;return{replacedDefault:c,items:Utils_1.Utils.stableSort(E,function(e,n){return e.sortOrder-n.sortOrder}).map(function(e){return e.node})}},n.prototype.render=function(){var e=this.props,n=e.children,t=e.customChildren,r=e.childProps,o=(e.className,e.contentStore),i=e.name,a=(e.theme,e.vertical),l=e.noContainers,s=e.subContainer,c=(__rest(e,["children","customChildren","childProps","className","contentStore","name","theme","vertical","noContainers","subContainer"]),React.Children.only(n)),p=__assign({},r,{theme:this.theme}),_=this.parseFragment("start",n,t,o.fragments,p),u=null,m=null,d=null;if(l&&s)throw new Error("noContainers and subContainer prop cannot be both set!");l||(m=s?React.cloneElement(s,{key:"start",className:emotion_1.cx("Twilio-"+i+"-default",RENDER_DEBUG&&DEBUG_CONTAINER_CLASS_NAME),vertical:a,overflow:"hidden"},_.items):React.createElement(FlexBox_1.FlexBox,{key:"start",className:emotion_1.cx("Twilio-"+i+"-default",RENDER_DEBUG&&DEBUG_CONTAINER_CLASS_NAME),vertical:a,overflow:"hidden"},_.items)),_.replacedDefault||(u=this.parseFragment("end",n,t,o.fragments,p),l||(RENDER_DEBUG&&u.items.push(React.createElement(DebugLabel,null,i,"-end")),d=React.createElement(FlexBox_1.FlexBox,{key:"end",className:emotion_1.cx("Twilio-"+i+"-end",RENDER_DEBUG&&DEBUG_CONTAINER_CLASS_NAME),noGrow:!0,vertical:a,overflow:"hidden"},u.items)));var E=emotion_1.css(templateObject_1||(templateObject_1=__makeTemplateObject(["\n            display: flex;\n            position: relative;\n            overflow-x: hidden;\n        "],["\n            display: flex;\n            position: relative;\n            overflow-x: hidden;\n        "]))),b=l?[_.items,u?u.items:[]]:[m,d];return RENDER_DEBUG&&b.push(React.createElement(DebugLabel,null,i)),React.cloneElement(c,{className:emotion_1.cx("Twilio","Twilio-"+i,E,RENDER_DEBUG&&DEBUG_ROOT_CLASS_NAME)},b)},n.cloneElementWithProps=function(e,n){var t=e;return React.isValidElement(e)&&"string"!=typeof e.type?React.cloneElement(t,__assign({},n,e.props),t.props.children):e},n.displayName="DynamicComponent",n.contextTypes=contextTypes,n}(React.PureComponent);exports.DynamicComponent=DynamicComponent;var RENDER_DEBUG=!1,DEBUG_ROOT_CLASS_NAME="DynamicComponentDebug",DEBUG_CONTAINER_CLASS_NAME="DynamicComponentContainerDebug",DEBUG_CONTAINER_ITEM_CLASS_NAME="DynamicComponentContainerItemDebug";RENDER_DEBUG&&emotion_1.injectGlobal(templateObject_2||(templateObject_2=__makeTemplateObject(["\n        .",", .",", ."," {\n            border-color: transparent;\n        }\n        ."," {\n            position: relative;\n        }\n        .",":hover {\n            border: 3px solid red;\n        }\n        .",":hover {\n            border: 2px solid green;\n        }\n        .",":hover > .DebugLabel, .",":hover > .DebugLabel {\n            display: flex;\n        }\n        ."," > * {\n            border: 1px solid transparent;\n        }\n        .",":hover > *:hover {\n            border: 1px solid blue;\n        }\n        ."," > .DebugLabel {\n            color: red;\n        }\n        ."," > .DebugLabel {\n            color: green;\n        }\n    "],["\n        .",", .",", ."," {\n            border-color: transparent;\n        }\n        ."," {\n            position: relative;\n        }\n        .",":hover {\n            border: 3px solid red;\n        }\n        .",":hover {\n            border: 2px solid green;\n        }\n        .",":hover > .DebugLabel, .",":hover > .DebugLabel {\n            display: flex;\n        }\n        ."," > * {\n            border: 1px solid transparent;\n        }\n        .",":hover > *:hover {\n            border: 1px solid blue;\n        }\n        ."," > .DebugLabel {\n            color: red;\n        }\n        ."," > .DebugLabel {\n            color: green;\n        }\n    "])),DEBUG_ROOT_CLASS_NAME,DEBUG_CONTAINER_CLASS_NAME,DEBUG_CONTAINER_ITEM_CLASS_NAME,DEBUG_CONTAINER_CLASS_NAME,DEBUG_ROOT_CLASS_NAME,DEBUG_CONTAINER_CLASS_NAME,DEBUG_CONTAINER_CLASS_NAME,DEBUG_ROOT_CLASS_NAME,DEBUG_CONTAINER_CLASS_NAME,DEBUG_CONTAINER_CLASS_NAME,DEBUG_ROOT_CLASS_NAME,DEBUG_CONTAINER_CLASS_NAME);var templateObject_1,templateObject_2,templateObject_3,templateObject_4,StyledDebugSpan=react_emotion_1.default("div")(templateObject_3||(templateObject_3=__makeTemplateObject(["\n    margin: auto;\n    background: yellow;\n    z-index: 10000;\n"],["\n    margin: auto;\n    background: yellow;\n    z-index: 10000;\n"]))),StyledDebugDiv=react_emotion_1.default("div")(templateObject_4||(templateObject_4=__makeTemplateObject(["\n    display: none;\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    pointer-events: none;\n"],["\n    display: none;\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    pointer-events: none;\n"]))),DebugLabel=function(e){return React.createElement(StyledDebugDiv,{className:"DebugLabel"},React.createElement(StyledDebugSpan,null,e.children))};