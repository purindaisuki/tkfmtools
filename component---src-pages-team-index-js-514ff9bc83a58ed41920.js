"use strict";(self.webpackChunktkfmtools=self.webpackChunktkfmtools||[]).push([[164],{22702:function(e,t,n){n.d(t,{Z:function(){return x}});var a=n(87462),r=n(45987),o=n(67294),i=n(85505),l=n(49044),c=n(19123),s=(0,c.Z)(o.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),d=(0,c.Z)(o.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),m=n(37595),u=(0,c.Z)(o.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),p=n(81664),f=n(34621),g=o.createElement(d,null),h=o.createElement(s,null),v=o.createElement(u,null),y=o.forwardRef((function(e,t){var n=e.checkedIcon,c=void 0===n?g:n,s=e.classes,d=e.color,m=void 0===d?"secondary":d,u=e.icon,f=void 0===u?h:u,y=e.indeterminate,x=void 0!==y&&y,b=e.indeterminateIcon,S=void 0===b?v:b,E=e.inputProps,w=e.size,C=void 0===w?"medium":w,k=(0,r.Z)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]),Z=x?S:f,I=x?S:c;return o.createElement(l.Z,(0,a.Z)({type:"checkbox",classes:{root:(0,i.Z)(s.root,s["color".concat((0,p.Z)(m))],x&&s.indeterminate),checked:s.checked,disabled:s.disabled},color:m,inputProps:(0,a.Z)({"data-indeterminate":x},E),icon:o.cloneElement(Z,{fontSize:void 0===Z.props.fontSize&&"small"===C?C:Z.props.fontSize}),checkedIcon:o.cloneElement(I,{fontSize:void 0===I.props.fontSize&&"small"===C?C:I.props.fontSize}),ref:t},k))})),x=(0,f.Z)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,m.Fq)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,m.Fq)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(y)},62846:function(e,t,n){var a=n(87462),r=n(45987),o=n(67294),i=n(85505),l=n(34621),c=n(37595),s=o.forwardRef((function(e,t){var n=e.absolute,l=void 0!==n&&n,c=e.classes,s=e.className,d=e.component,m=void 0===d?"hr":d,u=e.flexItem,p=void 0!==u&&u,f=e.light,g=void 0!==f&&f,h=e.orientation,v=void 0===h?"horizontal":h,y=e.role,x=void 0===y?"hr"!==m?"separator":void 0:y,b=e.variant,S=void 0===b?"fullWidth":b,E=(0,r.Z)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return o.createElement(m,(0,a.Z)({className:(0,i.Z)(c.root,s,"fullWidth"!==S&&c[S],l&&c.absolute,p&&c.flexItem,g&&c.light,"vertical"===v&&c.vertical),role:x,ref:t},E))}));t.Z=(0,l.Z)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:(0,c.Fq)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(s)},80838:function(e,t,n){var a=n(45987),r=n(87462),o=n(67294),i=n(85505),l=n(34621),c=[0,1,2,3,4,5,6,7,8,9,10],s=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=parseFloat(e);return"".concat(n/t).concat(String(e).replace(String(n),"")||"px")}var m=o.forwardRef((function(e,t){var n=e.alignContent,l=void 0===n?"stretch":n,c=e.alignItems,s=void 0===c?"stretch":c,d=e.classes,m=e.className,u=e.component,p=void 0===u?"div":u,f=e.container,g=void 0!==f&&f,h=e.direction,v=void 0===h?"row":h,y=e.item,x=void 0!==y&&y,b=e.justify,S=e.justifyContent,E=void 0===S?"flex-start":S,w=e.lg,C=void 0!==w&&w,k=e.md,Z=void 0!==k&&k,I=e.sm,O=void 0!==I&&I,T=e.spacing,_=void 0===T?0:T,j=e.wrap,P=void 0===j?"wrap":j,N=e.xl,L=void 0!==N&&N,F=e.xs,z=void 0!==F&&F,M=e.zeroMinWidth,D=void 0!==M&&M,R=(0,a.Z)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","justifyContent","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),H=(0,i.Z)(d.root,m,g&&[d.container,0!==_&&d["spacing-xs-".concat(String(_))]],x&&d.item,D&&d.zeroMinWidth,"row"!==v&&d["direction-xs-".concat(String(v))],"wrap"!==P&&d["wrap-xs-".concat(String(P))],"stretch"!==s&&d["align-items-xs-".concat(String(s))],"stretch"!==l&&d["align-content-xs-".concat(String(l))],"flex-start"!==(b||E)&&d["justify-content-xs-".concat(String(b||E))],!1!==z&&d["grid-xs-".concat(String(z))],!1!==O&&d["grid-sm-".concat(String(O))],!1!==Z&&d["grid-md-".concat(String(Z))],!1!==C&&d["grid-lg-".concat(String(C))],!1!==L&&d["grid-xl-".concat(String(L))]);return o.createElement(p,(0,r.Z)({className:H,ref:t},R))})),u=(0,l.Z)((function(e){return(0,r.Z)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-content-xs-center":{justifyContent:"center"},"justify-content-xs-flex-end":{justifyContent:"flex-end"},"justify-content-xs-space-between":{justifyContent:"space-between"},"justify-content-xs-space-around":{justifyContent:"space-around"},"justify-content-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var n={};return c.forEach((function(a){var r=e.spacing(a);0!==r&&(n["spacing-".concat(t,"-").concat(a)]={margin:"-".concat(d(r,2)),width:"calc(100% + ".concat(d(r),")"),"& > $item":{padding:d(r,2)}})})),n}(e,"xs"),e.breakpoints.keys.reduce((function(t,n){return function(e,t,n){var a={};s.forEach((function(e){var t="grid-".concat(n,"-").concat(e);if(!0!==e)if("auto"!==e){var r="".concat(Math.round(e/12*1e8)/1e6,"%");a[t]={flexBasis:r,flexGrow:0,maxWidth:r}}else a[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else a[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===n?(0,r.Z)(e,a):e[t.breakpoints.up(n)]=a}(t,e,n),t}),{}))}),{name:"MuiGrid"})(m);t.Z=u},49963:function(e,t,n){n.d(t,{Z:function(){return v}});var a=n(67294),r=n(50190),o=n(50009),i=n(87462),l=n(45987),c=n(85505),s=n(34621),d=n(81664),m=a.forwardRef((function(e,t){var n=e.classes,r=e.className,o=e.color,s=void 0===o?"default":o,m=e.component,u=void 0===m?"li":m,p=e.disableGutters,f=void 0!==p&&p,g=e.disableSticky,h=void 0!==g&&g,v=e.inset,y=void 0!==v&&v,x=(0,l.Z)(e,["classes","className","color","component","disableGutters","disableSticky","inset"]);return a.createElement(u,(0,i.Z)({className:(0,c.Z)(n.root,r,"default"!==s&&n["color".concat((0,d.Z)(s))],y&&n.inset,!h&&n.sticky,!f&&n.gutters),ref:t},x))})),u=(0,s.Z)((function(e){return{root:{boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:e.palette.text.secondary,fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(14)},colorPrimary:{color:e.palette.primary.main},colorInherit:{color:"inherit"},gutters:{paddingLeft:16,paddingRight:16},inset:{paddingLeft:72},sticky:{position:"sticky",top:0,zIndex:1,backgroundColor:"inherit"}}}),{name:"MuiListSubheader"})(m),p=n(65541),f=n(42857),g=(0,o.default)(r.Z).withConfig({displayName:"StageSelect__StyledInput",componentId:"sc-iyjsu9-0"})(["&&{margin:0.4rem 0;width:100%;svg{fill:",";}}"],(e=>e.theme.colors.onSurface)),h=(0,o.default)(u).withConfig({displayName:"StageSelect__StyledListSubheader",componentId:"sc-iyjsu9-1"})(["&&{color:",";font-size:1rem;font-style:italic;line-height:2rem;}"],(e=>e.theme.colors.onSurface)),v=e=>{var{children:t,className:n,value:r,error:i,handleChange:l}=e,{pageString:c,stageString:s}=(0,f.f)(),{colors:d}=(0,o.useTheme)();return a.createElement(g,{className:n,label:c.team.build.stageSelectLabel,id:"select-stage",onChange:l,select:!0,value:r,SelectProps:{MenuProps:{PaperProps:{style:{backgroundColor:d.surface}},MenuListProps:{style:{backgroundColor:d.surface,color:d.onSurface},dense:!0}}},variant:"outlined",size:"small",inputProps:{"aria-label":"select-stage"},error:i,helperText:i&&c.team.build.stageSelectHelpText},t,s.map((e=>{var t;return[a.createElement(h,{key:e.name},e.name),null===(t=e.stages)||void 0===t?void 0:t.map((t=>a.createElement(p.Z,{value:e.chapter+"/"+t.id,key:t.id},t.id+" : "+t.name))),e.stagePrefix&&[...Array(61).keys()].slice(1).map((t=>a.createElement(p.Z,{value:e.chapter+"/"+e.chapter+"-"+t,key:e.chapter+"-"+t},e.chapter+"-"+t+" : "+e.stagePrefix+t+e.stageSuffix)))]})))}},65746:function(e,t,n){var a=n(67294),r=n(77447);t.Z=e=>{var{className:t,layoutSwitcher:n,localStorageKey:o,items:i,initLayoutIndex:l,unmountOnLeave:c}=e,{layout:s,canRender:d,setLayout:m}=(0,r.Z)(o,i.map((e=>e.layout)),l,c);return a.createElement(a.Fragment,null,n&&a.cloneElement(n,{layout:s,setLayout:m}),i.map(((e,n)=>a.createElement("div",{className:t,hidden:s!==e.layout,key:e.layout},d[n]&&e.content))))}},64529:function(e,t,n){n.r(t),n.d(t,{default:function(){return ue}});var a=n(67294),r=n(50009),o=n(83332),i=n(22702),l=n(62846),c=n(28001),s=n(42857),d=n(65746),m=n(25072),u=n(57693),p=n(22727),f=n(45987),g=n(15861),h=n(80791),v=n(87462),y=n(85505),x=n(34621),b=a.forwardRef((function(e,t){var n=e.classes,r=e.className,o=(0,f.Z)(e,["classes","className"]);return a.createElement("div",(0,v.Z)({className:(0,y.Z)(n.root,r),ref:t},o))}));b.muiName="ListItemSecondaryAction";var S=(0,x.Z)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(b),E=n(78032),w=n(4381),C=(0,r.default)(w.Z).withConfig({displayName:"StyledListItem",componentId:"sc-4usy4r-0"})(["&&{margin-bottom:0.6rem;padding-right:6.8rem;color:",";}background:linear-gradient( 90deg,",","," );"],(e=>e.theme.colors.onSurface),(e=>e.theme.colors.shadow+"2A"),(e=>e.theme.colors.shadow+"0D")),k=n(93175),Z=r.default.div.withConfig({displayName:"CharBox__CharContainer",componentId:"sc-1s00yss-0"})(["display:flex;flex-wrap:nowrap;overflow-x:hidden;"]),I=(0,r.default)(k.Z).withConfig({displayName:"CharBox__CharImg",componentId:"sc-1s00yss-1"})(["flex:0 0 auto;width:3rem;height:3rem;overflow:hidden;"]),O=r.default.div.withConfig({displayName:"CharBox__EmptySlot",componentId:"sc-1s00yss-2"})(["flex:0 0 auto;width:3rem;height:3rem;overflow:hidden;"]),T=e=>{var{chars:t}=e,{charString:n}=(0,s.f)();return t.every((e=>void 0===e||void 0===e.id))?a.createElement(Z,null,a.createElement(O,null)):a.createElement(Z,null,t.map(((e,t)=>(null==e?void 0:e.id)&&a.createElement(I,{key:t,name:"char_small_"+e.id,alt:n.name[e.id]}))))},_=n(79520),j=n(28437),P=["key"],N=r.default.div.withConfig({displayName:"LocalTeamList__NewButton",componentId:"sc-1qamej5-0"})(["display:flex;align-items:center;height:3rem;svg{width:2rem;height:2rem;fill:",";}span{margin-left:1rem;font-size:large;line-height:normal;}"],(e=>e.theme.colors.onSurface)),L=r.default.span.withConfig({displayName:"LocalTeamList__TitleText",componentId:"sc-1qamej5-1"})(["width:8rem;color:",";font-size:small;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"],(e=>e.theme.colors.onSurface)),F=(0,r.default)(p.ZP).withConfig({displayName:"LocalTeamList__OperationButton",componentId:"sc-1qamej5-2"})(["svg{width:1.4rem;height:1.4rem;}"]),z=e=>{var t,{isFromPlayer:r,isFromEnemies:o,lineups:i}=e,{pageString:l}=(0,s.f)(),{localTeams:d,actions:m}=(0,c.q)(),{newTeam:u,getTeam:p,selectTeam:v,pushTeam:y,deleteTeam:x}=m,{0:b,1:w}=(0,a.useState)(!1),{0:k,1:Z}=(0,a.useState)(l.team.index.errorSelectSnackbar),I=(e,t)=>function(){var a=(0,g.Z)((function*(a){if(r||o){var c=a.target.href;a.preventDefault();var s=yield n.e(916).then(n.bind(n,72625)).then((e=>e.data));if(e.some((e=>e.id&&(0===e.level.length||!s[e.id]))))return w(!0),void Z(l.team.index.errorUnsupportedCharacter);if(e.every((e=>!e.id)))return w(!0),void Z(l.team.index.errorSelectSnackbar);var d=e.filter((e=>e.id)).map((e=>{var{key:t}=e;return(0,f.Z)(e,P)})),m=r?[d,i[1]]:[i[0],d];console.log(c,m)}else v(t)}));return function(e){return a.apply(this,arguments)}}();return a.createElement(a.Fragment,null,a.createElement(h.Z,null,a.createElement(C,{component:E.Z,to:"/team/build/",button:!0,key:"new",onClick:()=>u()},a.createElement(N,null,j.k8,a.createElement("span",null,l.team.index.newComposition))),null==d?void 0:d.map(((e,t)=>a.createElement(C,{component:E.Z,to:r||o?"/battle/":"/team/build/",button:!0,key:t,onClick:I(e.characters,t)},a.createElement(L,null,e.name),a.createElement(T,{chars:e.characters}),a.createElement(S,null,a.createElement(F,{onClick:()=>y(p(t)),tooltipText:l.team.index.copyTooltip,edge:"end","aria-label":"copy-team"},j.TI),a.createElement(F,{onClick:()=>x(t),tooltipText:l.team.index.deleteTooltip,edge:"end","aria-label":"delete-team"},j.pJ)))))),a.createElement(_.Z,{open:b,onClose:(t=!1,()=>w(t)),message:k,type:"error"}))},M=n(4942),D=n(80838),R=n(65541),H=n(27136);function W(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function B(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?W(Object(n),!0).forEach((function(t){(0,M.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var q={items:[],isFetching:!1,loadMore:!0},A=(e,t)=>{switch(t.type){case"PUSH":return B(B({},e),{},{items:e.items.concat(t.items)});case"UNSHIFT":return B(B({},e),{},{items:t.items.concat(e.items)});case"RESET":return q;case"FETCH":return B(B({},e),{},{isFetching:t.isFetching});case"LOAD_MORE":return B(B({},e),{},{loadMore:t.loadMore});default:throw new Error}},G=(0,r.default)(H.Z).withConfig({displayName:"InfiniteLoader__StyledSpinner",componentId:"sc-10rq99b-0"})(["&&{display:block;margin:auto;color:",";}"],(e=>e.theme.colors.secondary)),U=e=>{var{listenToUpdate:t,fetchItem:n,renderItem:r,shouldReset:o,onReset:i}=e,{0:l,1:c}=(0,a.useReducer)(A,q),s=(0,a.useRef)();return(0,a.useEffect)((()=>{if(s.current){var e=new IntersectionObserver((e=>{e.forEach((e=>{e.intersectionRatio>0&&c({type:"LOAD_MORE",loadMore:!0})}))})).observe(s.current);return e?()=>e.unobeserve(s.current):void 0}}),[s]),(0,a.useEffect)((()=>{if(l.loadMore){var e=!1,t=function(){var t=(0,g.Z)((function*(){c({type:"FETCH",isFetching:!0});try{var t=yield n();if(!t)return;e||(0!==t.length&&c({type:"PUSH",items:t}),c({type:"FETCH",isFetching:!1}),c({type:"LOAD_MORE",loadMore:!1}))}catch(a){e||(console.log(a),c({type:"FETCH",isFetching:!1}),c({type:"LOAD_MORE",loadMore:!1}))}}));return function(){return t.apply(this,arguments)}}();return t(),()=>{e=!0}}}),[n,l.loadMore]),(0,a.useEffect)((()=>{var e=t((e=>{c({type:"UNSHIFT",items:e})}));if(e)return()=>e()}),[t]),(0,a.useEffect)((()=>{o&&(c({type:"RESET"}),i())}),[o,i]),a.createElement(a.Fragment,null,a.createElement(h.Z,null,l.items.map((e=>r(e))),a.createElement("div",{ref:s})),l.isFetching&&a.createElement(G,{size:32,thickness:6,disableShrink:!0}))},$=n(49963),V=n(39770);function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach((function(t){(0,M.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var J=e=>{var{team:t,handleSelectTeam:n}=e,{pageString:r,stageString:o,userLanguage:i}=(0,s.f)(),l=o.find((e=>e.chapter===t.chapter)),c="S"===t.chapter?l.stagePrefix+t.stage.slice(2)+l.stageSuffix:l.stages.find((e=>e.id===t.stage)).name;return a.createElement(Q,{component:E.Z,to:"/team/build/",button:!0,onClick:n(t)},a.createElement(D.Z,{container:!0,spacing:1},a.createElement(X,{item:!0,xs:6},t.stage+" : "+c),a.createElement(X,{item:!0,xs:6},a.createElement(ee,null,r.team.index.author+" : "+t.author),a.createElement(ee,null,t.time.toDate().toLocaleString(V[i].locale,{timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone}))),a.createElement(X,{item:!0,xs:12},a.createElement(T,{chars:t.characters})),0!==t.description.length&&a.createElement(X,{item:!0,xs:12},t.description)))},Q=(0,r.default)(C).withConfig({displayName:"CloudTeamList__StyledCloudTeamItem",componentId:"sc-1y2pxho-0"})(["&&{padding-right:1rem;user-select:text;}> div{> div:nth-child(2){justify-content:flex-end;> span:first-child{margin:0;}}> div:nth-child(4){margin-top:0.4rem;padding:0.4rem;font-size:small;background:linear-gradient( 90deg,",","," );}}"],(e=>e.theme.colors.shadow+"2A"),(e=>e.theme.colors.shadow+"0D")),X=(0,r.default)(D.Z).withConfig({displayName:"CloudTeamList__GridItem",componentId:"sc-1y2pxho-1"})(["display:flex;align-items:center;"]),ee=r.default.span.withConfig({displayName:"CloudTeamList__FootText",componentId:"sc-1y2pxho-2"})(["margin-left:1rem;font-size:0.75rem;"]),te=(0,r.default)($.Z).withConfig({displayName:"CloudTeamList__StyledStageSelect",componentId:"sc-1y2pxho-3"})(["&&{position:absolute;top:-3.2rem;right:3rem;width:30%;height:2rem;.MuiSelect-select{padding:0.5rem 2rem 0.5rem 1rem;font-size:small;}}"]),ne=()=>{var{pageString:e}=(0,s.f)(),{actions:t}=(0,c.q)(),{newTeam:r}=t,{0:o,1:i}=(0,a.useState)(),{0:l,1:d}=(0,a.useState)({chapter:"all",stage:"all"}),{0:m,1:u}=(0,a.useState)(),{0:p,1:f}=(0,a.useState)(),{0:h,1:v}=(0,a.useState)(!1);(0,a.useEffect)((()=>{Promise.all([n.e(259),n.e(378)]).then(n.bind(n,35378)).then((e=>{i(e.teamsRef)}))}),[]),(0,a.useEffect)((()=>{if(o){var e=o.orderBy("time","desc");"all"!==l.chapter&&(e=e.where("chapter","==",l.chapter).where("stage","==",l.stage)),u(e)}}),[l,o]);var y=function(){var e=(0,g.Z)((function*(){if(m){var e=p?m.startAfter(p).limit(10):m.limit(10);try{var t=yield e.get(),n=p?t.docs:t.docs.slice(1),a=n[n.length-1];return a?(f(a),n.map((e=>Y({id:e.id},e.data())))):[]}catch(r){return console.log(r),[]}}}));return function(){return e.apply(this,arguments)}}(),x=(0,a.useCallback)((e=>{if(m)return m.limit(1).onSnapshot((t=>{var n=t.docChanges().filter((e=>"added"===e.type)).map((e=>Y({id:e.doc.id},e.doc.data())));e(n)}),(e=>{console.log(e)}))}),[m]),b=e=>()=>{var{name:t,characters:n}=e;r({name:t,characters:n})};return a.createElement(a.Fragment,null,a.createElement(te,{value:l.chapter+"/"+l.stage,handleChange:e=>{if(e.target.value){var t=e.target.value.split("/");d({chapter:t[0],stage:t[1]}),f(void 0),v(!0)}}},a.createElement(R.Z,{value:"all/all"},e.team.index.allStage)),a.createElement(U,{listenToUpdate:x,fetchItem:y,renderItem:e=>e&&a.createElement(J,{team:e,handleSelectTeam:b,key:e.id}),shouldReset:h,onReset:()=>v(!1)}))},ae=()=>{var e,{pageString:t}=(0,s.f)(),{isImportingLineup:n,actions:r}=(0,c.q)(),{toggleImportLineupData:o}=r,{0:l,1:d}=(0,a.useState)(!1);return a.createElement(a.Fragment,null,a.createElement(u.Z,{button:a.createElement(p.ZP,{tooltipText:t.team.index.settingTooltip},j.qY),items:[{id:"setting-description"}],renderItem:e=>a.createElement(a.Fragment,null,a.createElement(i.Z,{edge:"start",checked:n,disableRipple:!0,inputProps:{"aria-labelledby":e.id}}),a.createElement("span",{id:e.id},t.team.index.settingDescription)),itemOnClick:()=>{o()||d(!0)},ariaId:"setting-menu"}),a.createElement(_.Z,{open:l,onClose:(e=!1,()=>d(e)),message:t.team.index.errorSnackbar,type:"error"}))},re=["local","cloud"],oe=e=>{var{layout:t,setLayout:n}=e,{pageString:r}=(0,s.f)();return a.createElement(ie,null,re.map((e=>a.createElement(le,{$active:t===e,onClick:()=>n(e),key:e},r.team.index.tabs[e]))))},ie=r.default.div.withConfig({displayName:"team__TabsWrapper",componentId:"sc-91g1dd-0"})(["position:absolute;top:0.5rem;"]),le=(0,r.default)(o.Z).withConfig({displayName:"team__StyledTab",componentId:"sc-91g1dd-1"})(["&&{color:",";font-size:large;}"],(e=>e.theme.colors.onSurface+(e.$active?"":"80"))),ce=r.default.div.withConfig({displayName:"team__PageWrapper",componentId:"sc-91g1dd-2"})(["position:relative;max-width:1000px;margin:auto;"]),se=(0,r.default)(m.ZP).withConfig({displayName:"team__StyledHeader",componentId:"sc-91g1dd-3"})(["position:relative;left:-1rem;width:100%;height:auto;margin:0;padding:0 0 0.5rem 1rem;border:none;label{margin-right:0.6rem;font-size:large;}> div:last-child{position:relative;bottom:-0.4rem;right:-1rem;}"]),de=(0,r.default)(l.Z).withConfig({displayName:"team__StyledDivider",componentId:"sc-91g1dd-4"})(["&&{background-color:",";}"],(e=>e.theme.colors.dropdownHover)),me=(0,r.default)(d.Z).withConfig({displayName:"team__TabPanel",componentId:"sc-91g1dd-5"})(["position:relative;"]),ue=e=>{var t,n,r,o,i,l,{location:c}=e,{pageString:d}=(0,s.f)();return a.createElement(ce,null,a.createElement(se,{title:null!==(t=c.state)&&void 0!==t&&t.isFromPlayer||null!==(n=c.state)&&void 0!==n&&n.isFromEnemies?d.team.index.selectTeam:void 0,end:a.createElement(ae,null)}),a.createElement(de,null),a.createElement(me,{localStorageKey:"team-list-tab",layoutSwitcher:!(null!==(r=c.state)&&void 0!==r&&r.isFromPlayer||null!==(o=c.state)&&void 0!==o&&o.isFromEnemies)&&a.createElement(oe,null),items:[{layout:"local",content:a.createElement(z,c.state)},{layout:"cloud",content:null!==(i=c.state)&&void 0!==i&&i.isFromPlayer||null!==(l=c.state)&&void 0!==l&&l.isFromEnemies?a.createElement(z,c.state):a.createElement(ne,null)}],initLayoutIndex:0}))}}}]);
//# sourceMappingURL=component---src-pages-team-index-js-514ff9bc83a58ed41920.js.map