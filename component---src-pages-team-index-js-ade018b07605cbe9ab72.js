"use strict";(self.webpackChunktkfmtools=self.webpackChunktkfmtools||[]).push([[164],{67417:function(e,t,r){var a=r(63366),n=r(87462),i=r(67294),o=r(85505),l=r(49408),c=r(67663),s=r(87568),d=r(10184),m=r(92103),u=r(85893),p=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],h=(0,s.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,"vertical"===r.orientation&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&"vertical"===r.orientation&&t.withChildrenVertical,"right"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignRight,"left"===r.textAlign&&"vertical"!==r.orientation&&t.textAlignLeft]}})((function(e){var t=e.theme,r=e.ownerState;return(0,n.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:t.palette.divider,borderBottomWidth:"thin"},r.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},r.light&&{borderColor:(0,c.Fq)(t.palette.divider,.08)},"inset"===r.variant&&{marginLeft:72},"middle"===r.variant&&"horizontal"===r.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===r.variant&&"vertical"===r.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===r.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},r.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(e){var t=e.theme,r=e.ownerState;return(0,n.Z)({},r.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat(t.palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(e){var t=e.theme,r=e.ownerState;return(0,n.Z)({},r.children&&"vertical"===r.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat(t.palette.divider),transform:"translateX(0%)"}})}),(function(e){var t=e.ownerState;return(0,n.Z)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),f=(0,s.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(e,t){var r=e.ownerState;return[t.wrapper,"vertical"===r.orientation&&t.wrapperVertical]}})((function(e){var t=e.theme,r=e.ownerState;return(0,n.Z)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===r.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),g=i.forwardRef((function(e,t){var r=(0,d.Z)({props:e,name:"MuiDivider"}),i=r.absolute,c=void 0!==i&&i,s=r.children,g=r.className,v=r.component,y=void 0===v?s?"div":"hr":v,b=r.flexItem,S=void 0!==b&&b,w=r.light,E=void 0!==w&&w,x=r.orientation,Z=void 0===x?"horizontal":x,C=r.role,k=void 0===C?"hr"!==y?"separator":void 0:C,I=r.textAlign,T=void 0===I?"center":I,L=r.variant,_=void 0===L?"fullWidth":L,P=(0,a.Z)(r,p),O=(0,n.Z)({},r,{absolute:c,component:y,flexItem:S,light:E,orientation:Z,role:k,textAlign:T,variant:_}),N=function(e){var t=e.absolute,r=e.children,a=e.classes,n=e.flexItem,i=e.light,o=e.orientation,c=e.textAlign,s={root:["root",t&&"absolute",e.variant,i&&"light","vertical"===o&&"vertical",n&&"flexItem",r&&"withChildren",r&&"vertical"===o&&"withChildrenVertical","right"===c&&"vertical"!==o&&"textAlignRight","left"===c&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]};return(0,l.Z)(s,m.V,a)}(O);return(0,u.jsx)(h,(0,n.Z)({as:y,className:(0,o.Z)(N.root,g),role:k,ref:t,ownerState:O},P,{children:s?(0,u.jsx)(f,{className:N.wrapper,ownerState:O,children:s}):null}))}));t.Z=g},99122:function(e,t,r){var a=r(15861),n=function(){var e=(0,a.Z)((function*(e){try{return[yield e,null]}catch(t){return[null,t]}}));return function(t){return e.apply(this,arguments)}}();t.Z=n},72910:function(e,t,r){r.d(t,{Z:function(){return x}});var a=r(67294),n=r(53583),i=r(63366),o=r(87462),l=r(85505),c=r(49408),s=r(87568),d=r(10184),m=r(49240),u=r(90240);function p(e){return(0,u.Z)("MuiListSubheader",e)}(0,r(62194).Z)("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);var h=r(85893),f=["className","color","component","disableGutters","disableSticky","inset"],g=(0,s.ZP)("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,"default"!==r.color&&t["color".concat((0,m.Z)(r.color))],!r.disableGutters&&t.gutters,r.inset&&t.inset,!r.disableSticky&&t.sticky]}})((function(e){var t=e.theme,r=e.ownerState;return(0,o.Z)({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:t.palette.text.secondary,fontFamily:t.typography.fontFamily,fontWeight:t.typography.fontWeightMedium,fontSize:t.typography.pxToRem(14)},"primary"===r.color&&{color:t.palette.primary.main},"inherit"===r.color&&{color:"inherit"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.inset&&{paddingLeft:72},!r.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:t.palette.background.paper})})),v=a.forwardRef((function(e,t){var r=(0,d.Z)({props:e,name:"MuiListSubheader"}),a=r.className,n=r.color,s=void 0===n?"default":n,u=r.component,v=void 0===u?"li":u,y=r.disableGutters,b=void 0!==y&&y,S=r.disableSticky,w=void 0!==S&&S,E=r.inset,x=void 0!==E&&E,Z=(0,i.Z)(r,f),C=(0,o.Z)({},r,{color:s,component:v,disableGutters:b,disableSticky:w,inset:x}),k=function(e){var t=e.classes,r=e.color,a=e.disableGutters,n=e.inset,i=e.disableSticky,o={root:["root","default"!==r&&"color".concat((0,m.Z)(r)),!a&&"gutters",n&&"inset",!i&&"sticky"]};return(0,c.Z)(o,p,t)}(C);return(0,h.jsx)(g,(0,o.Z)({as:v,className:(0,l.Z)(k.root,a),ref:t,ownerState:C},Z))})),y=r(59699),b=r(42857),S=r(14080),w=(0,n.default)(S.Z).withConfig({displayName:"StageSelect__StyledInput",componentId:"sc-iyjsu9-0"})(["margin:0.4rem 0;width:100%;svg{fill:",";}"],(e=>{var{theme:t}=e;return t.colors.onSurface})),E=(0,n.default)(v).withConfig({displayName:"StageSelect__StyledListSubheader",componentId:"sc-iyjsu9-1"})(["color:",";background-color:",";font-size:1rem;font-style:italic;line-height:2rem;"],(e=>{var{theme:t}=e;return t.colors.onSurface}),(e=>{var{theme:t}=e;return t.colors.surface})),x=e=>{var{children:t,className:r,value:i,error:o,handleChange:l}=e,{pageString:c,stageString:s}=(0,b.f)(),{colors:d}=(0,n.useTheme)();return a.createElement(w,{className:r,label:c.team.build.stageSelectLabel,id:"select-stage",onChange:l,select:!0,value:i,SelectProps:{MenuProps:{PaperProps:{style:{backgroundColor:d.surface}},MenuListProps:{style:{backgroundColor:d.surface,color:d.onSurface},dense:!0}}},variant:"outlined",size:"small",inputProps:{"aria-label":"select-stage"},error:o,helperText:o&&c.team.build.stageSelectHelpText},t,s.map((e=>{var t;return[a.createElement(E,{key:e.name},e.name),null===(t=e.stages)||void 0===t?void 0:t.map((t=>a.createElement(y.Z,{value:e.chapter+"/"+t.id,key:t.id},t.id+" : "+t.name))),e.stagePrefix&&[...Array(61).keys()].slice(1).map((t=>a.createElement(y.Z,{value:e.chapter+"/"+e.chapter+"-"+t,key:e.chapter+"-"+t},e.chapter+"-"+t+" : "+e.stagePrefix+t+e.stageSuffix)))]})))}},65746:function(e,t,r){var a=r(67294),n=r(77447);t.Z=e=>{var{className:t,layoutSwitcher:r,localStorageKey:i,items:o,initLayoutIndex:l,unmountOnLeave:c}=e,{layout:s,canRender:d,setLayout:m}=(0,n.Z)(i,o.map((e=>e.layout)),l,c);return a.createElement(a.Fragment,null,r&&a.cloneElement(r,{layout:s,setLayout:m}),o.map(((e,r)=>a.createElement("div",{className:t,hidden:s!==e.layout,key:e.layout},d[r]&&e.content))))}},14504:function(e,t,r){r.r(t),r.d(t,{default:function(){return me}});var a=r(67294),n=r(53583),i=r(76968),o=r(67417),l=r(42857),c=r(65746),s=r(25072),d=r(45987),m=r(15861),u=r(25444),p=r(87987),h=r(59644),f=r(47589),g=r(28001),v=r(78032),y=r(57693),b=r(24069),S=r(3945),w=(0,n.default)(S.ZP).withConfig({displayName:"StyledListItem",componentId:"sc-4usy4r-0"})(["margin-bottom:0.6rem;padding-right:6.8rem;color:",";background:linear-gradient( 90deg,",","," );"],(e=>{var{theme:t}=e;return t.colors.onSurface}),(e=>{var{theme:t}=e;return t.colors.shadow+"2A"}),(e=>{var{theme:t}=e;return t.colors.shadow+"0D"})),E=r(93175),x=n.default.div.withConfig({displayName:"CharBox__CharContainer",componentId:"sc-1s00yss-0"})(["display:flex;flex-wrap:nowrap;overflow-x:hidden;"]),Z=(0,n.default)(E.Z).withConfig({displayName:"CharBox__CharImg",componentId:"sc-1s00yss-1"})(["flex:0 0 auto;width:3rem;height:3rem;overflow:hidden;"]),C=n.default.div.withConfig({displayName:"CharBox__EmptySlot",componentId:"sc-1s00yss-2"})(["flex:0 0 auto;width:3rem;height:3rem;overflow:hidden;"]),k=e=>{var{chars:t}=e,{charString:r}=(0,l.f)(),n=!t.some((e=>null==e?void 0:e.id));return a.createElement(x,null,n?a.createElement(C,null):t.map(((e,t)=>(null==e?void 0:e.id)&&a.createElement(Z,{key:t,name:"char_small_"+e.id,alt:r.name[e.id]}))))},I=r(62583),T=r(28437),L=["key"],_=()=>{var e,{pageString:t}=(0,l.f)(),{isImportingLineup:r,actions:n}=(0,g.q)(),{toggleImportLineupData:i}=n,{0:o,1:c}=(0,a.useState)(!1);return a.createElement(a.Fragment,null,a.createElement(y.Z,{button:a.createElement(P,{tooltipText:t.team.index.settingTooltip},T.qY),items:[{id:"setting-description"}],renderItem:e=>a.createElement(a.Fragment,null,a.createElement(p.Z,{edge:"start",checked:r,disableRipple:!0,inputProps:{"aria-labelledby":e.id}}),a.createElement("span",{id:e.id},t.team.index.settingDescription)),itemOnClick:()=>{i()||c(!0)},ariaId:"setting-menu"}),a.createElement(I.Z,{open:o,onClose:(e=!1,()=>c(e)),message:t.team.index.errorSnackbar,type:"error"}))},P=(0,n.default)(b.ZP).withConfig({displayName:"LocalTeamList__StyledButton",componentId:"sc-1qamej5-0"})(["position:absolute;top:-3.3rem;right:0;"]),O=n.default.div.withConfig({displayName:"LocalTeamList__NewButton",componentId:"sc-1qamej5-1"})(["display:flex;align-items:center;height:3rem;svg{width:2rem;height:2rem;fill:",";}span{margin-left:1rem;font-size:large;line-height:normal;}"],(e=>{var{theme:t}=e;return t.colors.onSurface})),N=n.default.span.withConfig({displayName:"LocalTeamList__TitleText",componentId:"sc-1qamej5-2"})(["width:8rem;color:",";font-size:small;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"],(e=>{var{theme:t}=e;return t.colors.onSurface})),F=(0,n.default)(b.ZP).withConfig({displayName:"LocalTeamList__OperationButton",componentId:"sc-1qamej5-3"})(["svg{width:1.4rem;height:1.4rem;}"]),j=e=>{var t,{isFromPlayer:n,isFromEnemies:i,lineups:o}=e,{pageString:c,isDefault:s,userLanguage:p}=(0,l.f)(),{localTeams:y,actions:b}=(0,g.q)(),{newTeam:S,getTeam:E,selectTeam:x,pushTeam:Z,deleteTeam:C}=b,{0:P,1:j}=(0,a.useState)(!1),{0:R,1:D}=(0,a.useState)(c.team.index.errorSelectSnackbar),A=(e,t)=>function(){var a=(0,m.Z)((function*(a){if(n||i){a.preventDefault();var l=yield r.e(916).then(r.bind(r,72625)).then((e=>e.data));if(e.some((e=>e.id&&(0===e.level.length||!l[e.id]))))return j(!0),void D(c.team.index.errorUnsupportedCharacter);if(e.every((e=>!e.id)))return j(!0),void D(c.team.index.errorSelectSnackbar);var m=e.filter((e=>e.id)).map((e=>{var{key:t}=e;return(0,d.Z)(e,L)})),h=n?[m,o[1]]:[o[0],m];(0,u.navigate)((s?"":"/"+p)+"/battle/",{state:{lineups:h,isFromPlayer:n,isFromEnemies:i},replace:!0})}else x(t)}));return function(e){return a.apply(this,arguments)}}();return a.createElement(a.Fragment,null,a.createElement(_,null),a.createElement(h.Z,null,a.createElement(w,{component:v.Z,to:"/team/build/",button:!0,key:"new",onClick:()=>S()},a.createElement(O,null,T.k8,a.createElement("span",null,c.team.index.newComposition))),null==y?void 0:y.map(((e,t)=>a.createElement(w,{component:v.Z,to:n||i?"/battle/":"/team/build/",button:!0,key:t,onClick:A(e.characters,t)},a.createElement(N,null,e.name),a.createElement(k,{chars:e.characters}),a.createElement(f.Z,null,a.createElement(F,{onClick:()=>Z(E(t)),tooltipText:c.team.index.copyTooltip,edge:"end","aria-label":"copy-team"},T.TI),a.createElement(F,{onClick:()=>C(t),tooltipText:c.team.index.deleteTooltip,edge:"end","aria-label":"delete-team"},T.pJ)))))),a.createElement(I.Z,{open:P,onClose:(t=!1,()=>j(t)),message:R,type:"error"}))},R=r(4942),D=r(4320),A=r(59699),z=r(82374),H=r(99122);function G(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function B(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?G(Object(r),!0).forEach((function(t){(0,R.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):G(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var M={items:[],isFetching:!1,shouldLoad:!0},U=(e,t)=>{switch(t.type){case"PUSH":return B(B({},e),{},{items:e.items.concat(t.items)});case"UNSHIFT":return B(B({},e),{},{items:t.items.concat(e.items)});case"START_FETCHING":return B(B({},e),{},{isFetching:!0});case"END_FETCHING":return B(B({},e),{},{isFetching:!1,shouldLoad:!1});case"FLAG_SHOULD_LOAD":return B(B({},e),{},{shouldLoad:!0});case"RESET":return M;default:throw new Error("Unexpected action type")}},W=(0,n.default)(z.Z).withConfig({displayName:"InfiniteLoader__StyledSpinner",componentId:"sc-7n3n2i-0"})(["display:block;margin:auto;color:",";"],(e=>{var{theme:t}=e;return t.colors.secondary})),q=e=>{var{listenToUpdate:t,fetchItem:r,renderItem:n,shouldReset:i,onReset:o}=e,{0:l,1:c}=(0,a.useReducer)(U,M),s=(0,a.useRef)(null);return(0,a.useEffect)((()=>{if(null==s||!s.current)throw Error("bottomBoundaryRef is not assigned");var e=new IntersectionObserver((e=>{e.forEach((e=>{e.intersectionRatio>0&&c({type:"FLAG_SHOULD_LOAD"})}))})),t=s.current;return e.observe(t),()=>{e.unobserve(t)}}),[s]),(0,a.useEffect)((()=>{if(l.shouldLoad){var e=!1,t=function(){var t=(0,m.Z)((function*(){if(!e){c({type:"START_FETCHING"});var[t,a]=yield(0,H.Z)(r());null!==t&&(a?console.log(a):0!==t.length&&c({type:"PUSH",items:t}),c({type:"END_FETCHING"}))}}));return function(){return t.apply(this,arguments)}}();return t(),()=>{e=!0}}}),[r,l.shouldLoad]),(0,a.useEffect)((()=>{var e=t((e=>{c({type:"UNSHIFT",items:e})}));if(e)return()=>e()}),[t]),(0,a.useEffect)((()=>{i&&(c({type:"RESET"}),o())}),[i,o]),a.createElement(a.Fragment,null,a.createElement(h.Z,null,l.items.map((e=>n(e))),a.createElement("div",{ref:s})),l.isFetching&&a.createElement(W,{size:32,thickness:6,disableShrink:!0}))},V=r(72910),K=r(39770);function Y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function $(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(r),!0).forEach((function(t){(0,R.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var J=e=>{var{team:t,handleSelectTeam:r}=e,{pageString:n,stageString:i,userLanguage:o}=(0,l.f)(),c=i.find((e=>e.chapter===t.chapter)),s="S"===t.chapter?c.stagePrefix+t.stage.slice(2)+c.stageSuffix:c.stages.find((e=>e.id===t.stage)).name;return a.createElement(X,{component:v.Z,to:"/team/build/",button:!0,onClick:r(t)},a.createElement(D.ZP,{container:!0,spacing:1},a.createElement(Q,{item:!0,xs:6},t.stage+" : "+s),a.createElement(Q,{item:!0,xs:6},a.createElement(ee,null,n.team.index.author+" : "+t.author),a.createElement(ee,null,t.time.toDate().toLocaleString(K[o].locale,{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone}))),a.createElement(Q,{item:!0,xs:12},a.createElement(k,{chars:t.characters})),0!==t.description.length&&a.createElement(Q,{item:!0,xs:12},t.description)))},X=(0,n.default)(w).withConfig({displayName:"CloudTeamList__StyledCloudTeamItem",componentId:"sc-1y2pxho-0"})(["padding-right:1rem;user-select:text;> div{> div:nth-child(2){justify-content:flex-end;> span:first-child{margin:0;}}> div:nth-child(4){margin-top:0.4rem;padding:0.4rem;font-size:small;background:linear-gradient( 90deg,",","," );}}"],(e=>{var{theme:t}=e;return t.colors.shadow+"2A"}),(e=>{var{theme:t}=e;return t.colors.shadow+"0D"})),Q=(0,n.default)(D.ZP).withConfig({displayName:"CloudTeamList__GridItem",componentId:"sc-1y2pxho-1"})(["display:flex;align-items:center;"]),ee=n.default.span.withConfig({displayName:"CloudTeamList__FootText",componentId:"sc-1y2pxho-2"})(["margin-left:1rem;font-size:0.75rem;"]),te=(0,n.default)(V.Z).withConfig({displayName:"CloudTeamList__StyledStageSelect",componentId:"sc-1y2pxho-3"})(["&&{position:absolute;top:-3.3rem;right:0;width:30%;height:2rem;.MuiSelect-select{padding:0.5rem 2rem 0.5rem 1rem;font-size:small;}}"]),re=()=>{var{pageString:e}=(0,l.f)(),{actions:t}=(0,g.q)(),{newTeam:n}=t,{0:i,1:o}=(0,a.useState)(null),{0:c,1:s}=(0,a.useState)({chapter:"all",stage:"all"}),{0:d,1:u}=(0,a.useState)(null),{0:p,1:h}=(0,a.useState)(null),{0:f,1:v}=(0,a.useState)(!1),y=function(){var e=(0,m.Z)((function*(){if(!d)return null;var e=p?d.startAfter(p).limit(10):d.limit(10),[t,r]=yield(0,H.Z)(e.get());if(r)throw r;var a=p?t.docs:t.docs.slice(1),n=a[a.length-1];return n?(h(n),a.map((e=>$({id:e.id},e.data())))):[]}));return function(){return e.apply(this,arguments)}}(),b=(0,a.useCallback)((e=>{if(d)return d.limit(1).onSnapshot((t=>{var r=t.docChanges().filter((e=>"added"===e.type)).map((e=>$({id:e.doc.id},e.doc.data())));e(r)}),(e=>{console.log(e)}))}),[d]),S=e=>()=>{var{name:t,characters:r}=e;n({name:t,characters:r})};return(0,a.useEffect)((()=>{var e=function(){var e=(0,m.Z)((function*(){o((yield Promise.all([r.e(972),r.e(846)]).then(r.bind(r,58846))).teamCollection)}));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,a.useEffect)((()=>{if(i){var e=i.orderBy("time","desc");"all"!==c.chapter&&(e=e.where("chapter","==",c.chapter).where("stage","==",c.stage)),u(e)}}),[c,i]),a.createElement(a.Fragment,null,a.createElement(te,{value:c.chapter+"/"+c.stage,handleChange:e=>{var{target:t}=e;if(t.value){var r=t.value.split("/");s({chapter:r[0],stage:r[1]}),h(null),v(!0)}}},a.createElement(A.Z,{value:"all/all"},e.team.index.allStage)),a.createElement(q,{listenToUpdate:b,fetchItem:y,renderItem:e=>e&&a.createElement(J,{team:e,handleSelectTeam:S,key:e.id}),shouldReset:f,onReset:()=>v(!1)}))},ae=["local","cloud"],ne=e=>{var{layout:t,setLayout:r}=e,{pageString:n}=(0,l.f)();return a.createElement(ie,null,ae.map((e=>a.createElement(oe,{$active:t===e,onClick:()=>r(e),key:e},n.team.index.tabs[e]))))},ie=n.default.div.withConfig({displayName:"team__TabsWrapper",componentId:"sc-91g1dd-0"})(["position:absolute;top:0.5rem;"]),oe=(0,n.default)(i.Z).withConfig({displayName:"team__StyledTab",componentId:"sc-91g1dd-1"})(["color:",";font-size:large;"],(e=>e.theme.colors.onSurface+(e.$active?"":"80"))),le=n.default.div.withConfig({displayName:"team__PageWrapper",componentId:"sc-91g1dd-2"})(["position:relative;max-width:1000px;margin:auto;"]),ce=(0,n.default)(s.Z).withConfig({displayName:"team__StyledHeader",componentId:"sc-91g1dd-3"})(["height:3.6rem;margin:0;"]),se=(0,n.default)(o.Z).withConfig({displayName:"team__StyledDivider",componentId:"sc-91g1dd-4"})(["background-color:",";"],(e=>{var{theme:t}=e;return t.colors.dropdownHover})),de=(0,n.default)(c.Z).withConfig({displayName:"team__TabPanel",componentId:"sc-91g1dd-5"})(["position:relative;"]),me=e=>{var t,r,n,i,o,c,{location:s}=e,{pageString:d}=(0,l.f)();return a.createElement(le,null,a.createElement(ce,{title:null!==(t=s.state)&&void 0!==t&&t.isFromPlayer||null!==(r=s.state)&&void 0!==r&&r.isFromEnemies?d.team.index.selectTeam:null}),a.createElement(se,null),a.createElement(de,{localStorageKey:"team-list-tab",layoutSwitcher:!(null!==(n=s.state)&&void 0!==n&&n.isFromPlayer||null!==(i=s.state)&&void 0!==i&&i.isFromEnemies)&&a.createElement(ne,null),items:[{layout:"local",content:a.createElement(j,s.state)},{layout:"cloud",content:null!==(o=s.state)&&void 0!==o&&o.isFromPlayer||null!==(c=s.state)&&void 0!==c&&c.isFromEnemies?a.createElement(j,s.state):a.createElement(re,null)}],initLayoutIndex:0}))}}}]);
//# sourceMappingURL=component---src-pages-team-index-js-ade018b07605cbe9ab72.js.map