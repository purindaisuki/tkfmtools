(self.webpackChunktkfmtools=self.webpackChunktkfmtools||[]).push([[319],{77608:function(e,t,n){"use strict";function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.d(t,{Z:function(){return r}})},10379:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(14665);function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&(0,r.Z)(e,t)}},46070:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(50008),o=n(63349);function a(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?(0,o.Z)(e):t}},50008:function(e){function t(n){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=t=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=t=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),t(n)}e.exports=t,e.exports.default=e.exports,e.exports.__esModule=!0},86300:function(e,t,n){"use strict";var r=n(22122),o=n(81253),a=n(67294),i=n(85505),c=n(34621),l=n(78847),s={variant:"body"},u="tbody",d=a.forwardRef((function(e,t){var n=e.classes,c=e.className,d=e.component,m=void 0===d?u:d,p=(0,o.Z)(e,["classes","className","component"]);return a.createElement(l.Z.Provider,{value:s},a.createElement(m,(0,r.Z)({className:(0,i.Z)(n.root,c),ref:t,role:m===u?null:"rowgroup"},p)))}));t.Z=(0,c.Z)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(d)},49400:function(e,t,n){"use strict";var r=n(81253),o=n(22122),a=n(67294),i=n(85505),c=n(34621),l=n(81664),s=n(37595),u=n(83604),d=n(78847),m=a.forwardRef((function(e,t){var n,c,s=e.align,m=void 0===s?"inherit":s,p=e.classes,f=e.className,g=e.component,h=e.padding,y=e.scope,b=e.size,v=e.sortDirection,C=e.variant,w=(0,r.Z)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),x=a.useContext(u.Z),Z=a.useContext(d.Z),k=Z&&"head"===Z.variant;g?(c=g,n=k?"columnheader":"cell"):c=k?"th":"td";var E=y;!E&&k&&(E="col");var S=h||(x&&x.padding?x.padding:"default"),N=b||(x&&x.size?x.size:"medium"),_=C||Z&&Z.variant,T=null;return v&&(T="asc"===v?"ascending":"descending"),a.createElement(c,(0,o.Z)({ref:t,className:(0,i.Z)(p.root,p[_],f,"inherit"!==m&&p["align".concat((0,l.Z)(m))],"default"!==S&&p["padding".concat((0,l.Z)(S))],"medium"!==N&&p["size".concat((0,l.Z)(N))],"head"===_&&x&&x.stickyHeader&&p.stickyHeader),"aria-sort":T,role:n,scope:E},w))}));t.Z=(0,c.Z)((function(e){return{root:(0,o.Z)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?(0,s.$n)((0,s.U1)(e.palette.divider,1),.88):(0,s._j)((0,s.U1)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(m)},4093:function(e,t,n){"use strict";var r=n(22122),o=n(81253),a=n(67294),i=n(85505),c=n(34621),l=n(78847),s={variant:"head"},u="thead",d=a.forwardRef((function(e,t){var n=e.classes,c=e.className,d=e.component,m=void 0===d?u:d,p=(0,o.Z)(e,["classes","className","component"]);return a.createElement(l.Z.Provider,{value:s},a.createElement(m,(0,r.Z)({className:(0,i.Z)(n.root,c),ref:t,role:m===u?null:"rowgroup"},p)))}));t.Z=(0,c.Z)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(d)},99395:function(e,t,n){"use strict";var r=n(22122),o=n(81253),a=n(67294),i=n(85505),c=n(34621),l=n(78847),s=n(37595),u=a.forwardRef((function(e,t){var n=e.classes,c=e.className,s=e.component,u=void 0===s?"tr":s,d=e.hover,m=void 0!==d&&d,p=e.selected,f=void 0!==p&&p,g=(0,o.Z)(e,["classes","className","component","hover","selected"]),h=a.useContext(l.Z);return a.createElement(u,(0,r.Z)({ref:t,className:(0,i.Z)(n.root,c,h&&{head:n.head,footer:n.footer}[h.variant],m&&n.hover,f&&n.selected),role:"tr"===u?null:"row"},g))}));t.Z=(0,c.Z)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:(0,s.U1)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(u)},83604:function(e,t,n){"use strict";var r=n(67294).createContext();t.Z=r},78847:function(e,t,n){"use strict";var r=n(67294).createContext();t.Z=r},74772:function(e,t,n){"use strict";n.d(t,{Q:function(){return u},qg:function(){return p},cP:function(){return g}});var r=n(67294),o=n(50009),a=n(84283),i=n(93175),c=n(16855),l=(0,o.ZP)(i.Z).withConfig({displayName:"Card__StyledImg",componentId:"sc-1duszqx-0"})(["display:flex;justify-content:center;align-items:center;width:100%;background-repeat:no-repeat;"]),s=o.ZP.div.withConfig({displayName:"Card__ImgWrapper",componentId:"sc-1duszqx-1"})(["display:flex;align-items:center;justify-content:center;"]),u=function(e){var t=e.children,n=e.className,o=e.imgType,a=e.imgId,i=e.alt;return e.isBackground?r.createElement(l,{className:n,name:o+"_"+a,isBackground:!0,alt:i},t):r.createElement(s,{className:n},r.createElement(l,{name:o+"_"+a,alt:i}),t)},d=(0,o.ZP)(u).withConfig({displayName:"Card__ItemImg",componentId:"sc-1duszqx-2"})(["> div:first-child{width:2.5rem;height:2.5rem;margin-right:.4rem;user-select:none;}"]),m=o.ZP.div.withConfig({displayName:"Card__TextWrapper",componentId:"sc-1duszqx-3"})(["white-space:nowrap;font-size:medium;font-weight:normal;"]),p=function(e){var t=e.className,n=e.id,o=(0,a.f)().itemString;return r.createElement(d,{className:t,imgType:"item",imgId:n,alt:""},r.createElement(m,null,o.name[n]))},f=(0,o.ZP)(c.Z).withConfig({displayName:"Card__StyledTable",componentId:"sc-1duszqx-4"})(["&& .MuiTableCell-root{font-size:.9rem;padding:.3rem;padding-left:.75rem;}"]),g=function(e){var t=e.className,n=e.children,o=e.striped;return r.createElement(f,{className:t,$striped:o},n)}},47233:function(e,t,n){"use strict";n.d(t,{Ps:function(){return b},ac:function(){return x}});var r=n(19756),o=n(67294),a=n(50009),i=n(86300),c=n(99395),l=n(49400),s=n(84283),u=n(74772),d=n(28437),m=n(68912),p=["available"],f=(0,a.ZP)(u.Q).withConfig({displayName:"CharCard__StyledCard",componentId:"sc-1p8ym1z-0"})(["flex-direction:column;align-items:flex-end;justify-content:space-around;width:100%;min-width:10rem;height:3.6rem;background-repeat:no-repeat;background-size:6rem 6rem;background-position:0 -1.6rem;"]),g=a.ZP.div.withConfig({displayName:"CharCard__TextWrapper",componentId:"sc-1p8ym1z-1"})(["margin-left:0;margin-right:1rem;transition:all 0.3s ease;text-transform:none;text-shadow:0 0 1px ",",-2px 0 1px  ",",2px 0 1px  ",",0 -2px 1px ",",0 2px 1px  ",",2px 2px 1px ",",2px -2px 1px ",",-2px 2px 1px ",",-2px -2px 1px ",";"],(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface})),h=(0,a.ZP)(g).withConfig({displayName:"CharCard__TitleText",componentId:"sc-1p8ym1z-2"})(["font-size:small;"]),y=function(e){var t=e.className,n=e.id,r=(0,s.f)().charString;return o.createElement(f,{className:t,imgType:"char_small",imgId:n,alt:"",isBackground:!0},o.createElement(h,null,r.name[n].split(" ").slice(0,-1).join(" ")),o.createElement(g,null,r.name[n].split(" ").slice(-1)[0]))},b=(0,a.ZP)(y).withConfig({displayName:"CharCard__ResponsiveCharCard",componentId:"sc-1p8ym1z-3"})(["@media screen and (min-width:","px){flex-direction:row;align-items:center;justify-content:flex-start;> div{margin-left:7rem}> div:last-child{margin-left:-.6rem;}}"],(function(e){return e.$textWrapConfig})),v=a.ZP.div.withConfig({displayName:"CharCard__TagWrapper",componentId:"sc-1p8ym1z-4"})(["display:flex;flex-direction:row;"]),C=a.ZP.div.withConfig({displayName:"CharCard__IconWrapper",componentId:"sc-1p8ym1z-5"})(["margin-bottom:.1rem;margin-left:.25rem;margin-right:.4rem;> svg{width:1.2rem;fill:",";color:",";}"],(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.secondary})),w=function(e){var t=e.type,n=e.tag,r=(0,s.f)().charString,a={attribute:d.XV,position:d.$g,race:d.i6,body:d.cp,oppai:d.JU,rank:d.U2,else:d.fP};return o.createElement(c.Z,null,o.createElement(l.Z,null,o.createElement(v,null,o.createElement(C,null,a[t]),r.tags[n])))},x=function(e){var t=e.id,n=(0,s.f)().charString,a=m.find((function(e){return e.id===t})).tags,d=a.available,f=(0,r.Z)(a,p);return d?o.createElement(u.cP,{striped:!0},o.createElement(i.Z,null,Object.entries(f).map((function(e,t){return"else"===e[0]?e[1].map((function(e){return o.createElement(w,{key:e,type:"else",tag:e})})):e[1]>=0?o.createElement(w,{key:e[1],type:e[0],tag:e[1]}):null})))):o.createElement(u.cP,{striped:!0},o.createElement(i.Z,null,o.createElement(c.Z,null,o.createElement(l.Z,null,n.tagWarnMsg))))};t.ZP=y},47378:function(e,t,n){"use strict";var r=n(67294),o=n(35414),a=n(84283);t.Z=function(e){var t=e.title,n=e.description,i=e.path,c=(0,a.f)(),l=c.isDefault,s=c.userLanguage,u="/"===i?"":i.split("/").slice(0,-1).join("_");return r.createElement(o.q,null,r.createElement("meta",{name:"title",content:t}),r.createElement("meta",{name:"description",content:n}),r.createElement("meta",{property:"og:title",content:t}),r.createElement("meta",{property:"og:description",content:n}),r.createElement("meta",{property:"twitter:title",content:t}),r.createElement("meta",{property:"twitter:description",content:n}),r.createElement("meta",{property:"og:url",content:"https://purindaisuki.github.io/tkfmtools"+(l?"":"/"+s)+i}),r.createElement("meta",{property:"og:image",content:"https://purindaisuki.github.io/tkfmtools/website_preview"+u+(l?"":"_en")+".png"}),r.createElement("meta",{property:"twitter:url",content:"https://purindaisuki.github.io/tkfmtools"+(l?"":"/"+s)+i}),r.createElement("meta",{property:"twitter:image",content:"https://purindaisuki.github.io/tkfmtools/website_preview"+u+(l?"":"_en")+".png"}),r.createElement("title",{lang:s},t))}},87001:function(e,t,n){"use strict";n.d(t,{Re:function(){return l},ZP:function(){return s}});var r=n(67294),o=n(50009),a=n(49400),i=function(e,t,n){var o=(0,r.useState)(n),a=o[0],i=o[1];return{sortedData:(0,r.useMemo)((function(){var n=Array.from(e);return a.key&&t(n,a),n}),[e,a]),sortConfig:a,requestSort:function(e){var t=a.key===e&&"desc"===a.direction?"asc":"desc";i({key:e,direction:t})},getSortDirection:function(t){return 0!==(null==e?void 0:e.length)&&a.key===t?a.direction:void 0}}},c=n(16855),l=(0,o.ZP)(a.Z).withConfig({displayName:"SortableTable__SortableTh",componentId:"sc-95ym4-0"})(["&&{background-color:",";color:",";cursor:pointer;user-select:none;&:after{content:'","';}}"],(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.onSurface}),(function(e){return e.direction?"asc"===e.direction?" \\25B2":" \\25BC":void 0})),s=function(e){var t=e.className,n=e.data,o=e.head,a=e.body,l=e.sortFunc,s=e.defaultSortKey,u=e.striped,d=e.border,m=i(n,l,{key:s,direction:"desc"}),p=m.sortedData,f=m.sortConfig,g=m.requestSort,h=m.getSortDirection;return(0,r.useEffect)((function(){f.key!==s&&g(s)}),[s]),r.createElement(c.Z,{className:t,stickyHeader:!0,$striped:u,$border:d,size:"small"},r.cloneElement(o,{sortedData:p,requestSort:g,getSortDirection:h}),r.cloneElement(a,{sortedData:p}))}},16855:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r=n(50009),o=n(81253),a=n(22122),i=n(67294),c=n(85505),l=n(34621),s=n(83604),u="table",d=i.forwardRef((function(e,t){var n=e.classes,r=e.className,l=e.component,d=void 0===l?u:l,m=e.padding,p=void 0===m?"default":m,f=e.size,g=void 0===f?"medium":f,h=e.stickyHeader,y=void 0!==h&&h,b=(0,o.Z)(e,["classes","className","component","padding","size","stickyHeader"]),v=i.useMemo((function(){return{padding:p,size:g,stickyHeader:y}}),[p,g,y]);return i.createElement(s.Z.Provider,{value:v},i.createElement(d,(0,a.Z)({role:d===u?null:"table",ref:t,className:(0,c.Z)(n.root,r,y&&n.stickyHeader)},b)))})),m=(0,l.Z)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":(0,a.Z)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(d),p=(0,r.ZP)(m).withConfig({displayName:"Table",componentId:"vr3gqy-0"})(["&&{width:100%;.MuiTableCell-head{padding:.75rem .25rem;font-weight:bold;}.MuiTableCell-head:first-child{padding-left:.75rem;}.MuiTableCell-root{border-bottom:",";font-size:medium;}.MuiTableCell-body{color:",";}&& .MuiTableRow-root:hover{background-color:rgba(0,0,0,0.075);}","}"],(function(e){return e.$border?"1px solid "+e.theme.colors.secondary:"none"}),(function(e){return e.theme.colors.onSurface}),(function(e){return e.$striped?".MuiTableRow-root:nth-of-type(2n+1) {\n            background-color: rgba(0, 0, 0, 0.05);\n        }":""}))},50033:function(e,t,n){"use strict";var r=n(50009).ZP.div.withConfig({displayName:"Scrollable",componentId:"sc-1ueymsi-0"})(["overflow:auto;height:100%;scrollbar-width:thin;padding-right:.5rem;margin-right:-.5rem;&::-webkit-scrollbar{width:.4rem;height:.4rem;background:",";}&::-webkit-scrollbar-thumb{background:",";border-radius:.25rem;}&::-webkit-scrollbar-track{background:",";}&::-webkit-scrollbar-corner{background:",";}"],(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.border}),(function(e){return e.theme.colors.surface}),(function(e){return e.theme.colors.surface}));t.Z=r},65746:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(67294),o=n(86015);function a(e){var t=e.className,n=e.layoutSwitcher,a=e.localStorageKey,i=e.items,c=e.initLayoutIndex,l=e.unmountOnLeave,s=(0,o.Z)(a,i.map((function(e){return e.layout})),c,l),u=s.layout,d=s.canRender,m=s.setLayout;return r.createElement(r.Fragment,null,n&&r.cloneElement(n,{layout:u,setLayout:m}),i.map((function(e,n){return r.createElement("div",{className:t,hidden:u!==e.layout,key:e.layout},d[n]&&e.content)})))}},87486:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return V}});var r=n(67294),o=n(50009),a=n(65746),i=n(84283),c=n(47378),l=n(22727),s=n(6610),u=n(5991),d=n(63349),m=n(10379),p=n(46070),f=n(77608);function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,f.Z)(e);if(t){var o=(0,f.Z)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,p.Z)(this,n)}}function h(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0},x=function(e){(0,m.Z)(n,e);var t=g(n);function n(e){var r,o;return(0,s.Z)(this,n),(r=t.call(this,e)).reCalculateColumnCount=r.reCalculateColumnCount.bind((0,d.Z)(r)),r.reCalculateColumnCountDebounce=r.reCalculateColumnCountDebounce.bind((0,d.Z)(r)),o=r.props.breakpointCols&&r.props.breakpointCols.default?r.props.breakpointCols.default:parseInt(r.props.breakpointCols)||2,r.state={columnCount:o},r}return(0,u.Z)(n,[{key:"componentDidMount",value:function(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}},{key:"componentDidUpdate",value:function(){this.reCalculateColumnCount()}},{key:"componentWillUnmount",value:function(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}},{key:"reCalculateColumnCountDebounce",value:function(){var e=this;window&&window.requestAnimationFrame?(window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame((function(){e.reCalculateColumnCount()}))):this.reCalculateColumnCount()}},{key:"reCalculateColumnCount",value:function(){var e=window&&window.innerWidth||1/0,t=this.props.breakpointCols;"object"!=typeof t&&(t={default:parseInt(t)||2});var n=1/0,r=t.default||2;for(var o in t){var a=parseInt(o);a>0&&e<=a&&a<n&&(n=a,r=t[o])}r=Math.max(1,parseInt(r)||1),this.state.columnCount!==r&&this.setState({columnCount:r})}},{key:"itemsInColumns",value:function(){for(var e=this.state.columnCount,t=new Array(e),n=r.Children.toArray(this.props.children),o=0;o<n.length;o++){var a=o%e;t[a]||(t[a]=[]),t[a].push(n[o])}return t}},{key:"renderColumns",value:function(){var e=this.props,t=e.column,n=e.columnAttrs,o=void 0===n?{}:n,a=e.columnClassName,i=this.itemsInColumns(),c="".concat(100/i.length,"%"),l=a;l&&"string"!=typeof l&&(this.logDeprecated('The property "columnClassName" requires a string'),void 0===l&&(l="my-masonry-grid_column"));var s=v(v(v({},t),o),{},{style:v(v({},o.style),{},{width:c}),className:l});return i.map((function(e,t){return r.createElement("div",y({},s,{key:t}),e)}))}},{key:"logDeprecated",value:function(e){console.error("[Masonry]",e)}},{key:"render",value:function(){var e=this.props,t=(e.children,e.breakpointCols,e.columnClassName,e.columnAttrs,e.column,e.className),n=h(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]),o=t;return"string"!=typeof t&&(this.logDeprecated('The property "className" requires a string'),void 0===t&&(o="my-masonry-grid")),r.createElement("div",y({},n,{className:o}),this.renderColumns())}}]),n}(r.Component);x.defaultProps=w;var Z=x,k=(0,o.ZP)(Z).withConfig({displayName:"Masonry__StyledMasonry",componentId:"jvd8a3-0"})(["display:flex;width:auto;margin-left:-1rem;> div{padding-left:1rem;}"]);function E(e){var t=e.children,n=e.breakpointCols;return r.createElement(k,{breakpointCols:n,columnClassName:""},t)}var S=n(91918),N=n(47233),_=(0,o.ZP)(S.Z).withConfig({displayName:"CharTagMasonry__StyledAccordion",componentId:"xlcyi3-0"})(["&&{&&{margin-bottom:1rem;}border:1px solid ",";border-radius:.25rem;box-shadow:0 0 .15em lightgray;> .MuiAccordionSummary-root{padding:0;border-bottom-right-radius:0;border-bottom-left-radius:0;border-bottom:0px solid ",";}> .MuiAccordionSummary-root.Mui-expanded{border-bottom:1px solid ",";}.MuiAccordionSummary-content{display:flex;align-items:center;justify-content:space-between;padding:0;margin:0;}.MuiAccordionDetails-root{margin:0;padding:0;}}"],(function(e){return e.theme.colors.border}),(function(e){return e.theme.colors.border}),(function(e){return e.theme.colors.border})),T=function(e){var t=e.title,n=e.content,o=(0,r.useState)(!1),a=o[0],i=o[1];return r.createElement(_,{expanded:a,onChange:function(){return i(!a)},title:t,content:n})},P={default:6,1360:5,1200:4,992:3,600:2},O=function(){var e=(0,i.f)().charString;return r.createElement(E,{breakpointCols:P},Object.keys(e.name).map((function(e){return"nr"!==e&&r.createElement(T,{title:r.createElement(N.ZP,{id:e}),content:r.createElement(N.ac,{id:e}),key:e})})))},j=n(4093),I=n(86300),M=n(99395),R=n(49400),z=n(50033),D=n(87001),A=o.ZP.div.withConfig({displayName:"WindowTable__Sizer",componentId:"sc-1fg3mlg-0"})(["height:","px;th,td{white-space:nowrap;}"],(function(e){return e.$height}));var $=n(68912),q=(0,o.ZP)(D.Re).withConfig({displayName:"CharTagTable__StyledTh",componentId:"sc-1n6agm0-0"})(["&&{background-color:",";color:",";text-align:start;white-space:nowrap;}"],(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.onSecondary})),W=r.forwardRef((function(e,t){var n=(0,i.f)().charString;return r.createElement(j.Z,{ref:t},r.createElement(M.Z,{hover:!0},Object.entries(n.tagAttributes).map((function(t,n){return r.createElement(q,{onClick:function(){return e.requestSort(t[0])},direction:e.getSortDirection(t[0]),key:t[0]},t[1])}))))})),H={"zh-TW":900,en:1300,ja:1300,ko:1300},L=function(e){return 0===e?"N":1===e?"R":2===e?"SR":"SSR"},B=r.forwardRef((function(e,t){var n=e.sortedData,o=e.renderTo,a=(0,i.f)(),c=a.userLanguage,l=a.charString;return r.createElement(I.Z,null,n.map((function(e,n){return n>o?null:e.available?r.createElement(M.Z,{hover:!0,key:e.id,ref:0===n?t:void 0},Object.entries(e).map((function(t){return"available"===t[0]?null:"id"===t[0]?r.createElement(R.Z,{key:t[0]},r.createElement(N.Ps,{id:e.id,$textWrapConfig:H[c]})):"rarity"===t[0]?r.createElement(R.Z,{key:t[0]},L(t[1])):"else"===t[0]?r.createElement(R.Z,{key:t[0]},t[1].map((function(e){return l.tags[e]})).join(", ")):r.createElement(R.Z,{key:t[0]},t[1]<0?"-":l.tags[t[1]])}))):r.createElement(M.Z,{hover:!0,key:e.id},r.createElement(R.Z,null,r.createElement(N.Ps,{id:e.id,$textWrapConfig:H[c]})),r.createElement(R.Z,null,L(e.rarity)),r.createElement(R.Z,null,l.tags[e.attribute]),r.createElement(R.Z,null,l.tags[e.position]),r.createElement(R.Z,{colSpan:"5"},l.tagWarnMsg))})))})),F=(0,o.ZP)((function(e){var t=e.className,n=e.head,o=e.body,a=e.data,i=e.sortFunc,c=e.defaultSortKey,l=e.border,s=(0,r.useRef)(),u=(0,r.useRef)(),d=(0,r.useRef)(),m=(0,r.useState)({scrollTop:0,renderTo:0,sizerHeight:0}),p=m[0],f=m[1];return(0,r.useEffect)((function(){var e=s&&s.current?s.current.getBoundingClientRect().height:0,t=u&&u.current?u.current.getBoundingClientRect().height:0,n=p.scrollTop+e,r=d&&d.current?d.current.getBoundingClientRect().height:0,o=Math.min(Math.floor(n/r),a.length-1),i=t+a.length*r;f((function(e){return Object.assign({},e,{renderTo:Math.max(e.renderTo,o),sizerHeight:i})}))}),[s,d,u,p.scrollTop]),r.createElement(z.Z,{className:t,onScroll:function(e){f((function(t){return Object.assign({},t,{scrollTop:e.target.scrollTop})}))},ref:s},r.createElement(A,{$height:p.sizerHeight},r.createElement(D.ZP,{data:a,head:r.cloneElement(n,{ref:u}),body:r.cloneElement(o,{renderTo:p.renderTo,ref:d}),sortFunc:i,defaultSortKey:c,border:l})))})).withConfig({displayName:"CharTagTable__CharTable",componentId:"sc-1n6agm0-1"})(["overflow-x:auto;height:calc(100vh - 11rem);padding-right:0;margin-right:0;"]),U=function(){var e=(0,i.f)().charString,t=$.map((function(e){var t=e.id,n=e.rarity,r=e.tags;return Object.assign({id:t,rarity:n},r)}));return r.createElement(F,{data:t,head:r.createElement(W,null),body:r.createElement(B,null),sortFunc:function(t,n){t.sort((function(t,r){var o,a;return"else"===n.key?(o=t[n.key].join(""),a=r[n.key].join("")):"name"===n.key?(o=e.name[t.id],a=e.name[r.id]):(o=t[n.key],a=r[n.key]),o<a?"asc"===n.direction?-1:1:o>a?"asc"===n.direction?1:-1:0}))},defaultSortKey:"rarity",border:!0})},K=n(28437),J=o.ZP.div.withConfig({displayName:"enlist__LayoutBtnContainer",componentId:"sc-199adb2-0"})(["position:absolute;right:0;top:-4rem;@media screen and (max-width:410px){font-size:0;}"]),Q=function(e){var t=e.layout,n=e.setLayout,o=(0,i.f)().pageString;return r.createElement(J,null,o.enlist.index.layout,r.createElement(l.ZP,{$active:"Masonry"===t,onClick:function(){return n("Masonry")},tooltipText:o.enlist.index.masonryTooltip},K.xf),r.createElement(l.ZP,{$active:"Table"===t,onClick:function(){return n("Table")},tooltipText:o.enlist.index.tableTooltip},K.y2))},V=function(){var e=(0,i.f)().pageString;return r.createElement(r.Fragment,null,r.createElement(c.Z,{title:e.enlist.index.helmet.title,description:e.enlist.index.helmet.description,path:"/enlist/"}),r.createElement(a.Z,{localStorageKey:"enlist-character-layout",layoutSwitcher:r.createElement(Q,null),items:[{layout:"Masonry",content:r.createElement(O,null)},{layout:"Table",content:r.createElement(U,null)}],initLayoutIndex:0}))}}}]);
//# sourceMappingURL=component---src-pages-enlist-index-js-d036d734e77e010f0d46.js.map