(self.webpackChunktkfmtools=self.webpackChunktkfmtools||[]).push([[34],{13827:function(e,r,t){"use strict";t.d(r,{Z:function(){return S}});var n=t(29439),a=t(63366),i=t(87462),o=t(67294),c=t(85505),l=t(49408),u=t(10184),s=t(87568),d=t(19),m=t(49240),p=t(63128),f=t(26759),g=t(90240);function b(e){return(0,g.Z)("MuiFormControl",e)}(0,t(62194).Z)("MuiFormControl",["root","marginNone","marginNormal","marginDense","fullWidth","disabled"]);var h=t(85893),v=["children","className","color","component","disabled","error","focused","fullWidth","hiddenLabel","margin","required","size","variant"],y=(0,s.ZP)("div",{name:"MuiFormControl",slot:"Root",overridesResolver:function(e,r){var t=e.ownerState;return(0,i.Z)({},r.root,r["margin".concat((0,m.Z)(t.margin))],t.fullWidth&&r.fullWidth)}})((function(e){var r=e.ownerState;return(0,i.Z)({display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},"normal"===r.margin&&{marginTop:16,marginBottom:8},"dense"===r.margin&&{marginTop:8,marginBottom:4},r.fullWidth&&{width:"100%"})})),S=o.forwardRef((function(e,r){var t=(0,u.Z)({props:e,name:"MuiFormControl"}),s=t.children,g=t.className,S=t.color,k=void 0===S?"primary":S,w=t.component,Z=void 0===w?"div":w,x=t.disabled,C=void 0!==x&&x,E=t.error,M=void 0!==E&&E,P=t.focused,H=t.fullWidth,A=void 0!==H&&H,N=t.hiddenLabel,B=void 0!==N&&N,T=t.margin,J=void 0===T?"none":T,_=t.required,I=void 0!==_&&_,W=t.size,j=void 0===W?"medium":W,O=t.variant,K=void 0===O?"outlined":O,z=(0,a.Z)(t,v),F=(0,i.Z)({},t,{color:k,component:Z,disabled:C,error:M,fullWidth:A,hiddenLabel:B,margin:J,required:I,size:j,variant:K}),L=function(e){var r=e.classes,t=e.margin,n=e.fullWidth,a={root:["root","none"!==t&&"margin".concat((0,m.Z)(t)),n&&"fullWidth"]};return(0,l.Z)(a,b,r)}(F),D=o.useState((function(){var e=!1;return s&&o.Children.forEach(s,(function(r){if((0,p.Z)(r,["Input","Select"])){var t=(0,p.Z)(r,["Select"])?r.props.input:r;t&&(0,d.B7)(t.props)&&(e=!0)}})),e})),$=(0,n.Z)(D,2),G=$[0],q=$[1],R=o.useState((function(){var e=!1;return s&&o.Children.forEach(s,(function(r){(0,p.Z)(r,["Input","Select"])&&(0,d.vd)(r.props,!0)&&(e=!0)})),e})),V=(0,n.Z)(R,2),Q=V[0],U=V[1],X=o.useState(!1),Y=(0,n.Z)(X,2),ee=Y[0],re=Y[1];C&&ee&&re(!1);var te=void 0===P||C?ee:P,ne=o.useCallback((function(){U(!0)}),[]),ae={adornedStart:G,setAdornedStart:q,color:k,disabled:C,error:M,filled:Q,focused:te,fullWidth:A,hiddenLabel:B,size:j,onBlur:function(){re(!1)},onEmpty:o.useCallback((function(){U(!1)}),[]),onFilled:ne,onFocus:function(){re(!0)},registerEffect:undefined,required:I,variant:K};return(0,h.jsx)(f.Z.Provider,{value:ae,children:(0,h.jsx)(y,(0,i.Z)({as:Z,ownerState:F,className:(0,c.Z)(L.root,g),ref:r},z,{children:s}))})}))},26759:function(e,r,t){"use strict";var n=t(67294).createContext();r.Z=n},11825:function(e,r,t){"use strict";function n(e){var r=e.props,t=e.states,n=e.muiFormControl;return t.reduce((function(e,t){return e[t]=r[t],n&&void 0===r[t]&&(e[t]=n[t]),e}),{})}t.d(r,{Z:function(){return n}})},8230:function(e,r,t){"use strict";t.d(r,{Z:function(){return i}});var n=t(67294),a=t(26759);function i(){return n.useContext(a.Z)}},11780:function(e,r,t){"use strict";var n=t(4942),a=t(63366),i=t(87462),o=t(67294),c=t(85505),l=t(49408),u=t(11825),s=t(8230),d=t(49240),m=t(10184),p=t(87568),f=t(55654),g=t(85893),b=["children","className","color","component","disabled","error","filled","focused","required"],h=(0,p.ZP)("label",{name:"MuiFormLabel",slot:"Root",overridesResolver:function(e,r){var t=e.ownerState;return(0,i.Z)({},r.root,"secondary"===t.color&&r.colorSecondary,t.filled&&r.filled)}})((function(e){var r,t=e.theme,a=e.ownerState;return(0,i.Z)({color:t.palette.text.secondary},t.typography.body1,(r={lineHeight:"1.4375em",padding:0,position:"relative"},(0,n.Z)(r,"&.".concat(f.Z.focused),{color:t.palette[a.color].main}),(0,n.Z)(r,"&.".concat(f.Z.disabled),{color:t.palette.text.disabled}),(0,n.Z)(r,"&.".concat(f.Z.error),{color:t.palette.error.main}),r))})),v=(0,p.ZP)("span",{name:"MuiFormLabel",slot:"Asterisk",overridesResolver:function(e,r){return r.asterisk}})((function(e){var r=e.theme;return(0,n.Z)({},"&.".concat(f.Z.error),{color:r.palette.error.main})})),y=o.forwardRef((function(e,r){var t=(0,m.Z)({props:e,name:"MuiFormLabel"}),n=t.children,o=t.className,p=t.component,y=void 0===p?"label":p,S=(0,a.Z)(t,b),k=(0,s.Z)(),w=(0,u.Z)({props:t,muiFormControl:k,states:["color","required","focused","disabled","error","filled"]}),Z=(0,i.Z)({},t,{color:w.color||"primary",component:y,disabled:w.disabled,error:w.error,filled:w.filled,focused:w.focused,required:w.required}),x=function(e){var r=e.classes,t=e.color,n=e.focused,a=e.disabled,i=e.error,o=e.filled,c=e.required,u={root:["root","color".concat((0,d.Z)(t)),a&&"disabled",i&&"error",o&&"filled",n&&"focused",c&&"required"],asterisk:["asterisk",i&&"error"]};return(0,l.Z)(u,f.M,r)}(Z);return(0,g.jsxs)(h,(0,i.Z)({as:y,ownerState:Z,className:(0,c.Z)(x.root,o),ref:r},S,{children:[n,w.required&&(0,g.jsxs)(v,{ownerState:Z,"aria-hidden":!0,className:x.asterisk,children:[" ","*"]})]}))}));r.Z=y},55654:function(e,r,t){"use strict";t.d(r,{M:function(){return a}});var n=t(90240);function a(e){return(0,n.Z)("MuiFormLabel",e)}var i=(0,t(62194).Z)("MuiFormLabel",["root","colorSecondary","focused","disabled","error","filled","required","asterisk"]);r.Z=i},4320:function(e,r,t){"use strict";t.d(r,{ZP:function(){return Z}});var n=t(4942),a=t(63366),i=t(87462),o=t(67294),c=t(85505),l=t(22692),u=t(18297),s=t(49408),d=t(87568),m=t(10184);var p=o.createContext(),f=t(93433),g=t(90240);function b(e){return(0,g.Z)("MuiGrid",e)}var h=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],v=(0,t(62194).Z)("MuiGrid",["root","container","item","zeroMinWidth"].concat((0,f.Z)([0,1,2,3,4,5,6,7,8,9,10].map((function(e){return"spacing-xs-".concat(e)}))),(0,f.Z)(["column-reverse","column","row-reverse","row"].map((function(e){return"direction-xs-".concat(e)}))),(0,f.Z)(["nowrap","wrap-reverse","wrap"].map((function(e){return"wrap-xs-".concat(e)}))),(0,f.Z)(h.map((function(e){return"grid-xs-".concat(e)}))),(0,f.Z)(h.map((function(e){return"grid-sm-".concat(e)}))),(0,f.Z)(h.map((function(e){return"grid-md-".concat(e)}))),(0,f.Z)(h.map((function(e){return"grid-lg-".concat(e)}))),(0,f.Z)(h.map((function(e){return"grid-xl-".concat(e)}))))),y=t(85893),S=["className","columns","columnSpacing","component","container","direction","item","lg","md","rowSpacing","sm","spacing","wrap","xl","xs","zeroMinWidth"];function k(e){var r=parseFloat(e);return"".concat(r).concat(String(e).replace(String(r),"")||"px")}var w=(0,d.ZP)("div",{name:"MuiGrid",slot:"Root",overridesResolver:function(e,r){var t=e.ownerState,n=t.container,a=t.direction,i=t.item,o=t.lg,c=t.md,l=t.sm,u=t.spacing,s=t.wrap,d=t.xl,m=t.xs,p=t.zeroMinWidth;return[r.root,n&&r.container,i&&r.item,p&&r.zeroMinWidth,n&&0!==u&&r["spacing-xs-".concat(String(u))],"row"!==a&&r["direction-xs-".concat(String(a))],"wrap"!==s&&r["wrap-xs-".concat(String(s))],!1!==m&&r["grid-xs-".concat(String(m))],!1!==l&&r["grid-sm-".concat(String(l))],!1!==c&&r["grid-md-".concat(String(c))],!1!==o&&r["grid-lg-".concat(String(o))],!1!==d&&r["grid-xl-".concat(String(d))]]}})((function(e){var r=e.ownerState;return(0,i.Z)({boxSizing:"border-box"},r.container&&{display:"flex",flexWrap:"wrap",width:"100%"},r.item&&{margin:0},r.zeroMinWidth&&{minWidth:0},"nowrap"===r.wrap&&{flexWrap:"nowrap"},"reverse"===r.wrap&&{flexWrap:"wrap-reverse"})}),(function(e){var r=e.theme,t=e.ownerState,n=(0,l.P$)({values:t.direction,breakpoints:r.breakpoints.values});return(0,l.k9)({theme:r},n,(function(e){var r={flexDirection:e};return 0===e.indexOf("column")&&(r["& > .".concat(v.item)]={maxWidth:"none"}),r}))}),(function(e){var r=e.theme,t=e.ownerState,a=t.container,i=t.rowSpacing,o={};if(a&&0!==i){var c=(0,l.P$)({values:i,breakpoints:r.breakpoints.values});o=(0,l.k9)({theme:r},c,(function(e){var t=r.spacing(e);return"0px"!==t?(0,n.Z)({marginTop:"-".concat(k(t))},"& > .".concat(v.item),{paddingTop:k(t)}):{}}))}return o}),(function(e){var r=e.theme,t=e.ownerState,a=t.container,i=t.columnSpacing,o={};if(a&&0!==i){var c=(0,l.P$)({values:i,breakpoints:r.breakpoints.values});o=(0,l.k9)({theme:r},c,(function(e){var t=r.spacing(e);return"0px"!==t?(0,n.Z)({width:"calc(100% + ".concat(k(t),")"),marginLeft:"-".concat(k(t))},"& > .".concat(v.item),{paddingLeft:k(t)}):{}}))}return o}),(function(e){var r=e.theme,t=e.ownerState;return r.breakpoints.keys.reduce((function(e,n){return function(e,r,t,n){var a=n[t];if(a){var o={};if(!0===a)o={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===a)o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{var c=(0,l.P$)({values:n.columns,breakpoints:r.breakpoints.values}),u="object"==typeof c?c[t]:c,s="".concat(Math.round(a/u*1e8)/1e6,"%"),d={};if(n.container&&n.item&&0!==n.columnSpacing){var m=r.spacing(n.columnSpacing);if("0px"!==m){var p="calc(".concat(s," + ").concat(k(m),")");d={flexBasis:p,maxWidth:p}}}o=(0,i.Z)({flexBasis:s,flexGrow:0,maxWidth:s},d)}0===r.breakpoints.values[t]?Object.assign(e,o):e[r.breakpoints.up(t)]=o}}(e,r,n,t),e}),{})})),Z=o.forwardRef((function(e,r){var t,n=(0,m.Z)({props:e,name:"MuiGrid"}),l=(0,u.Z)(n),d=l.className,f=l.columns,g=l.columnSpacing,h=l.component,v=void 0===h?"div":h,k=l.container,Z=void 0!==k&&k,x=l.direction,C=void 0===x?"row":x,E=l.item,M=void 0!==E&&E,P=l.lg,H=void 0!==P&&P,A=l.md,N=void 0!==A&&A,B=l.rowSpacing,T=l.sm,J=void 0!==T&&T,_=l.spacing,I=void 0===_?0:_,W=l.wrap,j=void 0===W?"wrap":W,O=l.xl,K=void 0!==O&&O,z=l.xs,F=void 0!==z&&z,L=l.zeroMinWidth,D=void 0!==L&&L,$=(0,a.Z)(l,S),G=B||I,q=g||I,R=o.useContext(p),V=f||R||12,Q=(0,i.Z)({},l,{columns:V,container:Z,direction:C,item:M,lg:H,md:N,sm:J,rowSpacing:G,columnSpacing:q,wrap:j,xl:K,xs:F,zeroMinWidth:D}),U=function(e){var r=e.classes,t=e.container,n=e.direction,a=e.item,i=e.lg,o=e.md,c=e.sm,l=e.spacing,u=e.wrap,d=e.xl,m=e.xs,p={root:["root",t&&"container",a&&"item",e.zeroMinWidth&&"zeroMinWidth",t&&0!==l&&"spacing-xs-".concat(String(l)),"row"!==n&&"direction-xs-".concat(String(n)),"wrap"!==u&&"wrap-xs-".concat(String(u)),!1!==m&&"grid-xs-".concat(String(m)),!1!==c&&"grid-sm-".concat(String(c)),!1!==o&&"grid-md-".concat(String(o)),!1!==i&&"grid-lg-".concat(String(i)),!1!==d&&"grid-xl-".concat(String(d))]};return(0,s.Z)(p,b,r)}(Q);return t=(0,y.jsx)(w,(0,i.Z)({ownerState:Q,className:(0,c.Z)(U.root,d),as:v,ref:r},$)),12!==V?(0,y.jsx)(p.Provider,{value:V,children:t}):t}))},19:function(e,r,t){"use strict";function n(e){return null!=e&&!(Array.isArray(e)&&0===e.length)}function a(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e&&(n(e.value)&&""!==e.value||r&&n(e.defaultValue)&&""!==e.defaultValue)}function i(e){return e.startAdornment}t.d(r,{vd:function(){return a},B7:function(){return i}})},90694:function(e,r,t){"use strict";var n=t(67294).createContext();r.Z=n},18297:function(e,r,t){"use strict";t.d(r,{Z:function(){return u}});var n=t(93433),a=t(87462),i=t(63366),o=t(26486),c=t(49665),l=["sx"];function u(e){var r,t=e.sx,u=function(e){var r={systemProps:{},otherProps:{}};return Object.keys(e).forEach((function(t){c.G[t]?r.systemProps[t]=e[t]:r.otherProps[t]=e[t]})),r}((0,i.Z)(e,l)),s=u.systemProps,d=u.otherProps;return r=Array.isArray(t)?[s].concat((0,n.Z)(t)):"function"==typeof t?function(){var e=t.apply(void 0,arguments);return(0,o.P)(e)?(0,a.Z)({},s,e):s}:(0,a.Z)({},s,t),(0,a.Z)({},d,{sx:r})}},74772:function(e,r,t){"use strict";t.d(r,{Q:function(){return l},qg:function(){return d},cP:function(){return f}});var n=t(67294),a=t(53583),i=t(42857),o=t(93175),c=t(95167),l=e=>{var{children:r,className:t,imgType:a,imgId:i,alt:o,isBackground:c}=e;return c?n.createElement(u,{className:t,name:a+"_"+i,isBackground:!0,alt:o},r):n.createElement(s,{className:t},n.createElement(u,{name:a+"_"+i,alt:o}),r)},u=(0,a.default)(o.Z).withConfig({displayName:"Card__StyledImg",componentId:"sc-1duszqx-0"})(["display:flex;justify-content:center;align-items:center;width:100%;background-repeat:no-repeat;"]),s=a.default.div.withConfig({displayName:"Card__ImgWrapper",componentId:"sc-1duszqx-1"})(["display:flex;align-items:center;justify-content:center;"]),d=e=>{var{className:r,id:t}=e,{itemString:a}=(0,i.f)();return n.createElement(m,{className:r,imgType:"item",imgId:t,alt:""},n.createElement(p,null,a.name[t]))},m=(0,a.default)(l).withConfig({displayName:"Card__ItemImg",componentId:"sc-1duszqx-2"})(["> div:first-child{width:2.5rem;height:2.5rem;margin-right:0.4rem;user-select:none;}"]),p=a.default.div.withConfig({displayName:"Card__TextWrapper",componentId:"sc-1duszqx-3"})(["white-space:nowrap;font-size:medium;font-weight:normal;"]),f=e=>{var{className:r,children:t,striped:a}=e;return n.createElement(g,{className:r,$striped:a},t)},g=(0,a.default)(c.Z).withConfig({displayName:"Card__StyledTable",componentId:"sc-1duszqx-4"})([".MuiTableCell-root{font-size:0.9rem;padding:0.3rem;padding-left:0.75rem;}"])},25072:function(e,r,t){"use strict";var n=t(67294),a=t(53583),i=t(24069),o=t(28437),c=a.default.div.withConfig({displayName:"Header__StyledHeader",componentId:"sc-iju225-0"})(["display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;height:2.2rem;"," color:",";font-size:large;font-weight:normal;"],(e=>{var{theme:r,$border:t}=e;return t?"border-bottom: solid 1px "+r.colors.border+";":""}),(e=>{var{theme:r}=e;return r.colors.onSurface})),l=a.default.div.withConfig({displayName:"Header__TitleWrapper",componentId:"sc-iju225-1"})(["display:flex;flex-direction:row;align-items:center;"]),u=a.default.span.withConfig({displayName:"Header__TitleIcon",componentId:"sc-iju225-2"})(["margin-right:0.4rem;svg{width:1.2rem;height:1.2rem;fill:",";}"],(e=>{var{theme:r}=e;return r.colors.onSurface}));r.Z=e=>{var{className:r,title:t,titleIcon:a,withHelp:s,onClickHelp:d,end:m,id:p,border:f}=e;return n.createElement(c,{className:r,$border:f},n.createElement(l,null,a&&n.createElement(u,{id:p},a),t,s&&d&&n.createElement(i.Io,{onClick:d,tooltipText:"Help"},o.by)),m&&n.createElement("div",null,m))}},22776:function(e,r,t){"use strict";t.d(r,{WQ:function(){return f},p2:function(){return v}});var n=t(67294),a=t(53583),i=t(33300),o=t(93818),c=t(8290),l=t(50033),u=t(25072),s=e=>{var{children:r,className:t,title:a,open:l,onClose:u,keepMounted:s,ariaLabelledby:f,ariaDescribedby:g}=e;return n.createElement(i.Z,{className:t,open:l,onClose:u,closeAfterTransition:!0,BackdropComponent:o.Z,BackdropProps:{timeout:500},disableEnforceFocus:!0,keepMounted:s,"aria-labelledby":f,"aria-describedby":g},n.createElement(c.Z,{in:l},n.createElement(d,null,n.createElement(m,{title:a,id:f,end:n.createElement(p,{onClick:u},"×")}),r)))},d=a.default.div.withConfig({displayName:"Modal__ModalContentWrapper",componentId:"sc-o6bkb-0"})(["position:absolute;top:10%;bottom:auto;left:0;right:0;width:70%;@media screen and (max-width:1000px){width:80%;}@media screen and (max-width:768px){width:90%;}height:auto;margin:auto;padding:1rem;background-color:",";color:",";border-radius:0.25rem;border:1px solid ",";"],(e=>{var{theme:r}=e;return r.colors.surface}),(e=>{var{theme:r}=e;return r.colors.onSurface}),(e=>{var{theme:r}=e;return r.colors.border})),m=(0,a.default)(u.Z).withConfig({displayName:"Modal__ModalHeader",componentId:"sc-o6bkb-1"})(["margin:-1rem;margin-bottom:1rem;padding:0.2rem 0.5rem;color:",";background-color:",";"],(e=>{var{theme:r}=e;return r.colors.onSecondary}),(e=>{var{theme:r}=e;return r.colors.secondary})),p=a.default.span.withConfig({displayName:"Modal__CloseWrapper",componentId:"sc-o6bkb-2"})(["cursor:pointer;font-size:x-large;"]),f=e=>{var{children:r,className:t,title:a,open:i,onClose:o,keepMounted:c,ariaLabelledby:u,ariaDescribedby:s}=e;return n.createElement(g,{className:t,title:a,open:i,onClose:o,keepMounted:c,ariaLabelledby:u,ariaDescribedby:s},n.createElement(l.Z,null,r))},g=(0,a.default)(s).withConfig({displayName:"Modal__StyledScrollableModal",componentId:"sc-o6bkb-3"})(["> div:nth-child(3) > div{max-height:calc(80vh - 2rem);}"]),b=e=>{var{content:r,ariaDescribedby:t}=e;return r.map(((e,r)=>n.createElement(n.Fragment,{key:r},n.createElement(u.Z,{title:e.title,border:!0}),n.createElement(h,null,e.content.map(((e,r)=>n.createElement("p",{key:r,id:t+"_"+r},e)))))))},h=a.default.div.withConfig({displayName:"Modal__ModalBody",componentId:"sc-o6bkb-4"})(["margin:1rem 0;"]),v=e=>{var{title:r,content:t,open:a,onClose:i,ariaLabelledby:o,ariaDescribedby:c}=e;return n.createElement(f,{title:r,open:a,onClose:i,ariaLabelledby:o,ariaDescribedby:[...Array(t.length).keys()].map((e=>c+"_"+e)).join(" ")},n.createElement(b,{content:t,ariaDescribedby:c}))};r.ZP=s},95167:function(e,r,t){"use strict";t.d(r,{Z:function(){return y}});var n=t(53583),a=t(63366),i=t(87462),o=t(67294),c=t(85505),l=t(49408),u=t(90694),s=t(10184),d=t(87568),m=t(90240);function p(e){return(0,m.Z)("MuiTable",e)}(0,t(62194).Z)("MuiTable",["root","stickyHeader"]);var f=t(85893),g=["className","component","padding","size","stickyHeader"],b=(0,d.ZP)("table",{name:"MuiTable",slot:"Root",overridesResolver:function(e,r){var t=e.ownerState;return[r.root,t.stickyHeader&&r.stickyHeader]}})((function(e){var r=e.theme,t=e.ownerState;return(0,i.Z)({display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":(0,i.Z)({},r.typography.body2,{padding:r.spacing(2),color:r.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},t.stickyHeader&&{borderCollapse:"separate"})})),h="table",v=o.forwardRef((function(e,r){var t=(0,s.Z)({props:e,name:"MuiTable"}),n=t.className,d=t.component,m=void 0===d?h:d,v=t.padding,y=void 0===v?"normal":v,S=t.size,k=void 0===S?"medium":S,w=t.stickyHeader,Z=void 0!==w&&w,x=(0,a.Z)(t,g),C=(0,i.Z)({},t,{component:m,padding:y,size:k,stickyHeader:Z}),E=function(e){var r=e.classes,t={root:["root",e.stickyHeader&&"stickyHeader"]};return(0,l.Z)(t,p,r)}(C),M=o.useMemo((function(){return{padding:y,size:k,stickyHeader:Z}}),[y,k,Z]);return(0,f.jsx)(u.Z.Provider,{value:M,children:(0,f.jsx)(b,(0,i.Z)({as:m,role:m===h?null:"table",ref:r,className:(0,c.Z)(E.root,n),ownerState:C},x))})})),y=(0,n.default)(v).withConfig({displayName:"Table",componentId:"sc-vr3gqy-0"})(["width:100%;.MuiTableCell-head{padding:0.75rem 0.25rem;font-weight:bold;}.MuiTableCell-head:first-child{padding-left:0.75rem;}.MuiTableCell-root{border-bottom:",";font-size:medium;}.MuiTableCell-body{color:",";}&& .MuiTableRow-root:hover{background-color:rgba(0,0,0,0.075);}",""],(e=>{var{theme:r,$border:t}=e;return t?"1px solid "+r.colors.secondary:"none"}),(e=>{var{theme:r}=e;return r.colors.onSurface}),(e=>{var{$striped:r}=e;return r?".MuiTableRow-root:nth-of-type(2n+1) {\n            background-color: rgba(0, 0, 0, 0.05);\n        }":""}))},50033:function(e,r,t){"use strict";var n=t(53583).default.div.withConfig({displayName:"Scrollable",componentId:"sc-1ueymsi-0"})(["overflow:auto;height:100%;scrollbar-width:thin;padding-right:0.5rem;margin-right:-0.5rem;&::-webkit-scrollbar{width:0.4rem;height:0.4rem;background:",";}&::-webkit-scrollbar-thumb{background:",";border-radius:0.25rem;}&::-webkit-scrollbar-track{background:",";}&::-webkit-scrollbar-corner{background:",";}"],(e=>{var{theme:r}=e;return r.colors.surface}),(e=>{var{theme:r}=e;return r.colors.border}),(e=>{var{theme:r}=e;return r.colors.surface}),(e=>{var{theme:r}=e;return r.colors.surface}));r.Z=n},20904:function(e,r,t){"use strict";t.r(r);var n=t(4942),a=t(67294),i=t(53583),o=t(4320),c=t(54480),l=t(42857),u=t(25072),s=t(74772),d=t(93175),m=t(14080),p=t(22776),f=t(28437),g=t(59969);function b(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}var h=e=>{var{selected:r,handleSelect:t}=e,{pageString:n,charString:i}=(0,l.f)(),c=Object.keys(i.name).filter((e=>"nr"===e||parseInt(e[0])<3)),s=(e=>({character:"",currStage:[...Array("nr"===e.character?7:13).keys()].slice(1),currSub:[...Array(7).keys()].slice(1),targetStage:[...Array("nr"===e.character?7:13).keys()].slice(e.currStage),targetSub:[...Array(7).keys()].slice(e.currStage===e.targetStage?e.currSub:1)}))(r),d={character:n.characters.potential.characterSelectTitle,currStage:n.characters.potential.currentSelectTitle,currSub:"",targetStage:n.characters.potential.targetSelectTitle,targetSub:""};return a.createElement(a.Fragment,null,a.createElement(u.Z,{title:n.characters.potential.characterPanelTitle,titleIcon:f.i6,border:!0}),a.createElement(o.ZP,{container:!0,spacing:1,justifyContent:"space-around"},a.createElement(o.ZP,{item:!0,xs:4,component:y,name:"char_"+r.character,alt:""}),a.createElement(o.ZP,{item:!0,xs:8,container:!0,spacing:1,alignContent:"space-around"},Object.entries(s).map((e=>{var[n,l]=e;return a.createElement(o.ZP,{item:!0,xs:"character"===n?12:6,component:v,label:d[n],values:"character"===n?c:l,renderValues:"character"===n?c.map((e=>i.name[e])):l,value:r[n],onChange:t(n),key:n})})))))},v=(0,i.default)(m.P).withConfig({displayName:"potential__StyledSelect",componentId:"sc-2is47v-0"})([".MuiInputLabel-shrink{transform:translate(14px,-1px) scale(0.75);}"]),y=(0,i.default)(d.Z).withConfig({displayName:"potential__CharImgWrapper",componentId:"sc-2is47v-1"})(["max-width:5.2rem;border:2px solid ",";border-radius:0.25rem;"],(e=>{var{theme:r}=e;return r.colors.secondary})),S=e=>{var{children:r,name:t,alt:n,$lang:i}=e;return a.createElement(w,{$lang:i},a.createElement("div",null,a.createElement(Z,{name:t,alt:n}),r))},k={en:{1360:5,1200:4,768:3,0:2},"zh-TW":{1360:6,1200:5,768:4,624:3,0:2},ja:{1460:5,1305:4,768:3,624:2,0:2},ko:{1460:5,1305:4,768:3,624:2,0:2}},w=i.default.span.attrs((e=>{var{$lang:r}=e;return{$layoutConfig:k[r]}})).withConfig({displayName:"potential__MaterialWrapper",componentId:"sc-2is47v-2"})(["display:inline-flex;align-items:center;justify-content:space-between;padding:0 0.4rem;margin:0.2rem 0;"," > div{display:flex;align-items:center;}"],(e=>{var{$layoutConfig:r}=e;return Object.entries(r).map((e=>{var[r,t]=e;return"@media screen and (min-width: "+r+"px) {\n            width: calc(100% / "+t+");\n        }\n        "}))})),Z=(0,i.default)(d.Z).withConfig({displayName:"potential__UiImg",componentId:"sc-2is47v-3"})(["width:1.6rem;height:1.6rem;margin-right:0.4rem;"]),x=e=>{var{result:r,$lang:t}=e;return a.createElement(a.Fragment,null,r.items&&Object.entries(r.items).map((e=>a.createElement(w,{key:e[0],$lang:t},a.createElement("div",null,a.createElement(C,{id:e[0],alt:""})),e[1]))),r.items&&r.money&&a.createElement(S,{name:"money",alt:"money",$lang:t},r.money))},C=(0,i.default)(s.qg).withConfig({displayName:"potential__MaterialCard",componentId:"sc-2is47v-4"})(["> div:first-child{width:2rem;height:2rem;margin-right:0.4rem;}> div:last-child{white-space:break-spaces;}"]),E=e=>{var{result:r}=e,{userLanguage:t,pageString:n}=(0,l.f)(),{0:i,1:o}=(0,a.useState)(!1),c=e=>()=>{o(e)};return a.createElement(a.Fragment,null,a.createElement(u.Z,{title:n.characters.potential.resultDemandTitle,titleIcon:f.S5,withHelp:!0,onClickHelp:c(!0),border:!0}),a.createElement(M,null,a.createElement(x,{result:r,$lang:t})),a.createElement(u.Z,{title:n.characters.potential.resultBuffTitle,titleIcon:f.G$,border:!0}),a.createElement(S,{name:"ui_small_atk",alt:"ATK",$lang:t},r.buff.ATK+" %"),a.createElement(S,{name:"ui_small_hp",alt:"HP",$lang:t},r.buff.HP+" %"),a.createElement(S,{name:"ui_small_potentialPassive",alt:"Passive",$lang:t},0===r.buff.PASSIVE?"-":1===r.buff.PASSIVE?"1":2===r.buff.PASSIVE?"2":"1 & 2"),a.createElement(p.p2,{title:n.characters.potential.helpModal.title,open:i,onClose:c(!1),content:n.characters.potential.helpModal.content,ariaLabelledby:"help-modal-title",ariaDescribedby:"help-modal-description"}))},M=i.default.div.withConfig({displayName:"potential__MaterialContainer",componentId:"sc-2is47v-5"})(["display:flex;flex-direction:row;flex-wrap:wrap;margin-bottom:1rem;min-height:6rem;"]);r.default=()=>{var{0:e,1:r}=(0,a.useState)({character:"101",currStage:1,currSub:1,targetStage:1,targetSub:1,result:{items:null,money:0,buff:{ATK:0,HP:0,PASSIVE:0}}});return a.createElement(c.Z,{panelsWidth:["30%","70%"]},a.createElement(h,{selected:{character:e.character,currStage:e.currStage,currSub:e.currSub,targetStage:e.targetStage,targetSub:e.targetSub},handleSelect:t=>a=>{var i=function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?b(Object(t),!0).forEach((function(r){(0,n.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):b(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}({},e),o=a.target.value;i[t]="character"===t?o:parseInt(o),"nr"===o&&(i.currStage=e.currStage>6?1:e.currStage,i.targetStage=e.targetStage>6?1:e.targetStage),i.targetStage=Math.max(i.targetStage,i.currStage),i.targetStage===i.currStage&&(i.targetSub=Math.max(i.targetSub,i.currSub));var c=(0,g.calcCharPotential)(i.character,[i.currStage,i.currSub],[i.targetStage,i.targetSub]);c.buff.ATK=Math.round(100*c.buff.ATK)/100,c.buff.HP=Math.round(100*c.buff.HP)/100,i.result=c,r(i)}}),a.createElement(E,{result:e.result}))}},59969:function(e,r,t){var n=t(5102),a=t(8223),i=(e,r,t,i)=>{var o={items:{},money:0,buff:{ATK:0,HP:0,PASSIVE:0}};if(r[0]>t[0])return o;for(var c="nr"===e||"4"===e[0]||"3"===e[0]?3:void 0!==i?i:n.find((r=>r.id===e)).potentialType,l=a.type[c],u=r[0]-1;u<t[0]-1+1;u++)for(var s=l[u],d=u===r[0]-1?r[1]-1:0;d<(u===t[0]-1?t[1]:6);d++)if(!(d<0)){var m=s.pattern[d]+s.rank[d];o.items[m]?o.items[m]+=s.num[d]:o.items[m]=s.num[d],o.money+=8e3*(u+1);var p=a.itemMap[s.pattern[d]].type;o.buff[p]+=s.buff[d]}var f={},g=function(e,r){var t=a.itemMap[e[0]].id.map((r=>"9"===e[1]?"902":"8"===e[1]?"901":(100*parseInt(e[1])+r).toString()));for(var n of t)f[n]?f[n]+=r:f[n]=r};for(var[b,h]of Object.entries(o.items))g(b,h);return o.items=f,o};e.exports=e=>{var{id:r,level:t,potential:a,potentialSub:o,discipline:c,star:l}=e,u=n.find((e=>e.id===r));if(!u)throw new Error("invalid character id: "+r);if(("3"===r[0]||"4"===r[0])&&a>6)throw new Error("invalid potential: "+a);if("4"===r[0]&&+c>0)throw new Error("invalid discipline: "+c);var{initATK:s,initHP:d}=u.stats,m=1.1**(t-1),p=o;"object"!=typeof o&&(p=[...Array(6).keys()].map((e=>e<o)));var f=p.reduce(((e,t,n)=>{if(t){var o=i(r,[a,n+1],[a,n+1]).buff;e.ATK+=o.ATK,e.HP+=o.HP}return e}),i(r,[1,0],[a-1,6]).buff),g=1+(isNaN(parseInt(c))?0:+c*(+c+1)*.025),b=(l+5)/(9-r[0]);return{ATK:Math.floor(s*m*(1+f.ATK/100)*g*b),HP:Math.floor(d*m*(1+f.HP/100)*g*b)}},e.exports.calcCharPotential=i},8223:function(e){"use strict";e.exports=JSON.parse('{"type":[[{"pattern":["B","B","J","J","J","J"],"num":[1,2,2,2,2,1],"rank":[1,1,1,1,1,1],"buff":[2,2,3,3,3,3]},{"pattern":["B","B","J","J","J","J"],"num":[2,2,2,3,2,3],"rank":[1,1,1,1,1,1],"buff":[2,2,3.5,3.5,3.5,3.5]},{"pattern":["B","B","B","B","J","J"],"num":[1,1,1,1,2,2],"rank":[2,2,2,2,2,2],"buff":[2,2,2,2,3.5,3.5]},{"pattern":["B","B","B","J","J","J"],"num":[2,1,1,3,3,3],"rank":[2,2,2,2,2,2],"buff":[2,2,2,3.5,3.5,3.5]},{"pattern":["B","B","B","J","J","J"],"num":[1,1,2,4,4,4],"rank":[3,2,2,2,2,2],"buff":[2,2,2,3.5,3.5,3.5]},{"pattern":["P","B","B","B","J","J"],"num":[1,2,1,2,4,4],"rank":[9,3,3,3,3,3],"buff":[1,2,2,2,3.5,3.5]},{"pattern":["B","B","B","B","J","J"],"num":[2,3,2,2,4,4],"rank":[3,3,3,3,3,3],"buff":[2.5,2.5,2.5,2.5,3.5,3.5]},{"pattern":["B","B","B","B","J","J"],"num":[2,2,3,2,4,4],"rank":[3,3,3,3,3,3],"buff":[2.5,2.5,2.5,2.5,3.5,3.5]},{"pattern":["E","E","E","E","M","M"],"num":[2,3,3,2,5,5],"rank":[4,4,4,4,4,4],"buff":[2.5,2.5,2.5,2.5,3.5,3.5]},{"pattern":["G","G","G","G","N","N"],"num":[3,2,2,3,6,6],"rank":[4,4,4,4,4,4],"buff":[3,3,3,3,3.5,3.5]},{"pattern":["E","E","E","E","M","M"],"num":[1,1,1,1,1,1],"rank":[5,5,5,5,5,5],"buff":[3,3,3,3,3.5,3.5]},{"pattern":["P","G","G","G","G","N"],"num":[2,1,1,1,1,1],"rank":[9,5,5,5,5,5],"buff":[2,3,3,3,3,4]}],[{"pattern":["J","J","B","B","B","B"],"num":[1,2,2,2,2,1],"rank":[1,1,1,1,1,1],"buff":[2,2,3,3,3,3]},{"pattern":["J","J","B","B","B","B"],"num":[2,2,2,3,2,3],"rank":[1,1,1,1,1,1],"buff":[2,2,3.5,3.5,3.5,3.5]},{"pattern":["J","J","J","J","B","B"],"num":[1,1,1,1,2,2],"rank":[2,2,2,2,2,2],"buff":[2,2,2,2,3.5,3.5]},{"pattern":["J","J","J","B","B","B"],"num":[2,1,1,3,3,3],"rank":[2,2,2,2,2,2],"buff":[2,2,2,3.5,3.5,3.5]},{"pattern":["J","J","J","B","B","B"],"num":[1,1,2,4,4,4],"rank":[3,2,2,2,2,2],"buff":[2,2,2,3.5,3.5,3.5]},{"pattern":["P","J","J","J","B","B"],"num":[1,2,1,2,4,4],"rank":[9,3,3,3,3,3],"buff":[1,2,2,2,3.5,3.5]},{"pattern":["J","J","J","J","B","B"],"num":[2,3,2,2,4,4],"rank":[3,3,3,3,3,3],"buff":[2.5,2.5,2.5,2.5,3.5,3.5]},{"pattern":["J","J","J","J","B","B"],"num":[2,2,3,2,4,4],"rank":[3,3,3,3,3,3],"buff":[2.5,2.5,2.5,2.5,3.5,3.5]},{"pattern":["M","M","M","M","E","E"],"num":[2,3,3,2,5,5],"rank":[4,4,4,4,4,4],"buff":[2.5,2.5,2.5,2.5,3.5,3.5]},{"pattern":["N","N","N","N","G","G"],"num":[3,2,2,3,6,6],"rank":[4,4,4,4,4,4],"buff":[3,3,3,3,3.5,3.5]},{"pattern":["M","M","M","M","E","E"],"num":[1,1,1,1,1,1],"rank":[5,5,5,5,5,5],"buff":[3,3,3,3,3.5,3.5]},{"pattern":["P","N","N","N","N","G"],"num":[2,1,1,1,1,1],"rank":[9,5,5,5,5,5],"buff":[2,3,3,3,3,4]}],[{"pattern":["A","A","A","A","A","A"],"num":[2,2,2,2,2,2],"rank":[1,1,1,1,1,1],"buff":[2.75,2.75,2.75,2.75,2.75,2.75]},{"pattern":["H","H","H","H","H","H"],"num":[2,2,2,2,2,2],"rank":[1,1,1,1,1,1],"buff":[2.75,2.75,2.75,2.75,2.75,2.75]},{"pattern":["A","H","A","H","A","H"],"num":[3,2,1,1,1,1],"rank":[2,2,2,2,2,2],"buff":[2.75,2.75,2.75,2.75,2.75,2.75]},{"pattern":["H","A","A","A","A","A"],"num":[3,3,3,2,2,2],"rank":[2,2,2,2,2,2],"buff":[2.75,2.75,2.75,2.75,2.75,2.75]},{"pattern":["C","H","H","H","H","H"],"num":[3,3,3,2,2,2],"rank":[3,2,2,2,2,2],"buff":[2.75,2.75,2.75,2.75,2.75,2.75]},{"pattern":["P","K","C","K","C","K"],"num":[1,3,2,2,2,2],"rank":[9,3,3,3,3,3],"buff":[1,2.75,2.75,2.75,2.75,2.75]},{"pattern":["C","K","C","K","C","K"],"num":[2,2,3,3,3,3],"rank":[3,3,3,3,3,3],"buff":[2.75,2.75,2.75,2.75,2.75,3]},{"pattern":["C","K","C","K","C","K"],"num":[3,3,3,3,3,3],"rank":[3,3,3,3,3,3],"buff":[3,3,3,3,3,3]},{"pattern":["D","L","D","L","D","L"],"num":[4,4,3,3,3,3],"rank":[4,4,4,4,4,4],"buff":[3,3,3,3,3,3]},{"pattern":["F","O","F","O","F","O"],"num":[4,4,4,4,3,3],"rank":[4,4,4,4,4,4],"buff":[3,3,3,3,3,3]},{"pattern":["D","L","D","L","D","L"],"num":[1,1,1,1,1,1],"rank":[5,5,5,5,5,5],"buff":[3,3,3,3,3,3]},{"pattern":["P","F","F","O","F","O"],"num":[2,1,1,1,1,1],"rank":[9,5,5,5,5,5],"buff":[2,3,3,3,3,3]}],[{"pattern":["A","A","A","A","A","A"],"num":[2,2,2,2,2,2],"rank":[1,1,1,1,1,1],"buff":[2.75,2.75,2.75,2.75,3,3]},{"pattern":["H","H","H","H","H","H"],"num":[2,2,2,2,2,2],"rank":[1,1,1,1,1,1],"buff":[2.75,2.75,2.75,2.75,3,3]},{"pattern":["P","H","A","H","A","H"],"num":[5,2,1,1,1,1],"rank":[8,2,2,2,2,2],"buff":[1,3,3,3,3,3]},{"pattern":["A","A","A","A","A","A"],"num":[3,3,3,2,2,2],"rank":[2,2,2,2,2,2],"buff":[3,3,3,3,3,3]},{"pattern":["H","H","H","H","H","H"],"num":[3,3,3,2,2,2],"rank":[2,2,2,2,2,2],"buff":[3,3,3,3,3,3]},{"pattern":["P","C","K","C","K","C"],"num":[10,3,3,2,2,2],"rank":[8,3,3,3,3,3],"buff":[2,3,3,3,3,3]}]],"itemMap":{"A":{"id":[1,3],"type":"ATK"},"B":{"id":[1,5],"type":"ATK"},"C":{"id":[3,5],"type":"ATK"},"D":{"id":[1,3],"type":"ATK"},"E":{"id":[1,5],"type":"ATK"},"F":{"id":[8,10],"type":"ATK"},"G":{"id":[6,10],"type":"ATK"},"H":{"id":[2,3],"type":"HP"},"J":{"id":[2,4],"type":"HP"},"K":{"id":[3,4],"type":"HP"},"L":{"id":[2,3],"type":"HP"},"M":{"id":[2,4],"type":"HP"},"N":{"id":[7,9],"type":"HP"},"O":{"id":[8,9],"type":"HP"},"P":{"id":[1],"type":"PASSIVE"}}}')}}]);
//# sourceMappingURL=component---src-pages-characters-potential-js-8f9cf4a18e58ec9e70ae.js.map