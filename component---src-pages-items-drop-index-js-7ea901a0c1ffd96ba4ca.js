(self.webpackChunktkfmtools=self.webpackChunktkfmtools||[]).push([[886],{87908:function(e,t,n){"use strict";n.d(t,{Q:function(){return s},qg:function(){return g},cP:function(){return p}});var r=n(67294),a=n(50009),i=n(8169),o=n(32545),c=n(93670),l=(0,a.ZP)(o.Z).withConfig({displayName:"MyCard__StyledImg",componentId:"sc-1txoees-0"})(["display:flex;justify-content:center;align-items:center;width:100%;background-repeat:no-repeat;"]),d=a.ZP.div.withConfig({displayName:"MyCard__ImgWrapper",componentId:"sc-1txoees-1"})(["display:flex;align-items:center;justify-content:center;"]),s=function(e){var t=e.children,n=e.className,a=e.imgType,i=e.imgId,o=e.alt;return e.isBackground?r.createElement(l,{className:n,name:a+"_"+i,isBackground:!0,alt:o},t):r.createElement(d,{className:n},r.createElement(l,{name:a+"_"+i,alt:o}),t)},u=(0,a.ZP)(s).withConfig({displayName:"MyCard__ItemImg",componentId:"sc-1txoees-2"})(["> div:first-child{width:2.5rem;height:2.5rem;margin-right:.4rem;user-select:none;}"]),m=a.ZP.div.withConfig({displayName:"MyCard__TextWrapper",componentId:"sc-1txoees-3"})(["white-space:nowrap;font-size:medium;font-weight:normal;"]),g=function(e){var t=e.className,n=e.id,a=(0,c.ZK)().itemString;return r.createElement(u,{className:t,imgType:"item",imgId:n,alt:""},r.createElement(m,null,a.name[n]))},y=(0,a.ZP)(i.Z).withConfig({displayName:"MyCard__StyledTable",componentId:"sc-1txoees-4"})(["font-size:.9rem;color:",";margin:0;> tbody > tr >{td:first-child{padding-left:.75rem;}}"],(function(e){return e.theme.colors.onSurface})),p=function(e){var t=e.className,n=e.children,a=e.striped;return r.createElement(y,{className:t,striped:a,borderless:!0,size:"sm"},n)}},49498:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return z}});var r,a=n(85061),i=n(19756),o=n(67294),c=n(50009),l=n(12623),d=n(47378),s=n(58683),u=n(1020),m=n(99870),g=n(87908),y=n(42474),p=n(17182),f=n(55317),h=n(93670),k=n(28437),w=n(32241),v=JSON.parse('{"101":{"rank":1,"category":0},"102":{"rank":1,"category":0},"103":{"rank":1,"category":0},"104":{"rank":1,"category":0},"105":{"rank":1,"category":0},"201":{"rank":2,"category":0},"202":{"rank":2,"category":0},"203":{"rank":2,"category":0},"204":{"rank":2,"category":0},"205":{"rank":2,"category":0},"301":{"rank":3,"category":0},"302":{"rank":3,"category":0},"303":{"rank":3,"category":0},"304":{"rank":3,"category":0},"305":{"rank":3,"category":0},"401":{"rank":4,"category":0},"402":{"rank":4,"category":0},"403":{"rank":4,"category":0},"404":{"rank":4,"category":0},"405":{"rank":4,"category":0},"406":{"rank":4,"category":0},"407":{"rank":4,"category":0},"408":{"rank":4,"category":0},"409":{"rank":4,"category":0},"410":{"rank":4,"category":0},"501":{"rank":5,"category":0},"502":{"rank":5,"category":0},"503":{"rank":5,"category":0},"504":{"rank":5,"category":0},"505":{"rank":5,"category":0},"506":{"rank":5,"category":0},"507":{"rank":5,"category":0},"508":{"rank":5,"category":0},"509":{"rank":5,"category":0},"510":{"rank":5,"category":0},"601":{"rank":1,"category":1},"602":{"rank":1,"category":1},"603":{"rank":1,"category":1},"604":{"rank":1,"category":1},"605":{"rank":1,"category":1},"701":{"rank":2,"category":1},"702":{"rank":2,"category":1},"703":{"rank":2,"category":1},"704":{"rank":2,"category":1},"705":{"rank":2,"category":1},"801":{"rank":1,"category":2},"802":{"rank":2,"category":2},"803":{"rank":3,"category":2},"901":{"rank":1,"category":3},"902":{"rank":2,"category":3}}'),E=(0,c.ZP)(m.Re).withConfig({displayName:"drop__StyledTh",componentId:"sc-115hswd-0"})(["background-color:",";color:",";white-space:nowrap;",""],(function(e){return e.theme.colors.secondary}),(function(e){return e.theme.colors.onSecondary}),(function(e){return e.$sortable?null:"cursor: default;"})),b=function(e){var t=e.column,n=e.columnHasMounted,r=e.requestSort,a=e.getSortDirection,i=(0,h.ZK)().pageString;return o.createElement("thead",null,o.createElement("tr",null,Object.entries(i.items.drop.index.tableHead).map((function(e,i){var c="stage"===e[0]||"energy"===e[0];return(0===i||n[i-1])&&o.createElement(E,{onClick:c?function(){return r(e[0])}:void 0,direction:c?a(e[0]):void 0,key:i,$sortable:c,hidden:0!==i&&!t.includes(i-1)},e[1])}))))},C=c.ZP.div.withConfig({displayName:"drop__ItemsContainer",componentId:"sc-115hswd-1"})(["display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;> div:last-child{margin:0;}"]),Z=c.ZP.div.withConfig({displayName:"drop__ItemWrapper",componentId:"sc-115hswd-2"})(["display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap;margin-right:.8rem;div{flex-wrap:nowrap;font-size:1rem;}img{width:2rem;height:2rem;}"]),_=(0,c.ZP)(l.Z).withConfig({displayName:"drop__StyledBadge",componentId:"sc-115hswd-3"})(["background-color:",";color:black;margin-left:.4rem;"],(function(e){return 0===e.$rarity?"lightgray":1===e.$rarity?"#90CAF9":2===e.$rarity?"#A5D6A7":"#FFAB91"})),x=function(e){var t=e.items,n=e.rarity,r=e.rank,a=e.hidden,i=(0,h.ZK)().itemString;return o.createElement("td",{hidden:a},o.createElement(C,null,0!==t.length&&t.map((function(e,t){return o.createElement(Z,{key:t,hidden:!n.includes(e.rarity)||0===v[e.id].category&&!r.includes(v[e.id].rank)},o.createElement(g.qg,{id:e.id}),o.createElement(_,{pill:!0,$rarity:e.rarity},i.rarity[e.rarity]))}))))},I=function(e){var t=e.column,n=e.rarity,r=e.rank,a=e.columnHasMounted,c=e.sortedResult;return o.createElement("tbody",null,c.map((function(e,c){var l=e.chapter,d=e.stage,s=e.energy,u=(0,i.Z)(e,["chapter","stage","energy"]);return o.createElement("tr",{key:c,hidden:Object.values(u).filter((function(e,n){return t.includes(n)})).every((function(e){return!e.some((function(e){return n.includes(e.rarity)&&(0!==v[e.id].category||r.includes(v[e.id].rank))}))}))},o.createElement("td",null,l+"-"+d),Object.values(u).map((function(e,i){return a[i]&&o.createElement(x,{items:e,rarity:n,rank:r,hidden:!t.includes(i),key:i})})),o.createElement("td",{hidden:!t.includes(3)},a[3]&&s))})))},M={en:{0:2,990:4},"zh-TW":{0:4}},N=c.ZP.div.withConfig({displayName:"drop__StyledContainer",componentId:"sc-115hswd-4"})(["padding:.2rem;"]),S=(0,c.ZP)(p.Z).withConfig({displayName:"drop__StyledHeader",componentId:"sc-115hswd-5"})(["margin-top:1rem;"]),O=(0,c.ZP)(f.K).withConfig({displayName:"drop__StyledToggleButton",componentId:"sc-115hswd-6"})(["&&&&{padding:.25rem .15rem;}"]),P=function(e){var t=e.filterBtnValue,n=e.filterBy,r=e.groupValues,a=e.strings,i=(0,h.ZK)().userLanguage;return o.createElement(N,null,o.createElement(S,{title:a.title}),o.createElement(f.Z,{type:"checkbox",value:t,onChange:n,layoutConfig:M[i]},r.map((function(e,t){return o.createElement(O,{value:e,key:t},a.button[t])}))))},B=(0,c.ZP)(y.WQ).withConfig({displayName:"drop__StyledModal",componentId:"sc-115hswd-7"})(["> div:nth-child(3){top:20%;width:30%;@media screen and (max-width:1300px){width:40%;}@media screen and (max-width:992px){width:60%;}@media screen and (max-width:768px){width:90%;}> div:last-child > div:first-child > div{margin-top:0;}}"]),H=function(e){var t=e.isModalOpen,n=e.onClose,r=e.filterBy,a=(0,i.Z)(e,["isModalOpen","onClose","filterBy"]),c=(0,h.ZK)().pageString;return o.createElement(B,{title:c.items.drop.index.settingModal.title,open:t,onClose:n,ariaLabelledby:"setting-modal-title",ariaDescribedby:"setting-modal-description"},Object.entries(K).map((function(e,t){return o.createElement(P,{groupValues:e[1],filterBtnValue:a[e[0]],filterBy:r(e[0]),strings:c.items.drop.index.settingModal.content[t],key:t})})))},j=function(e){return 1e3*parseInt(e.chapter)+10*parseInt(e.stage.split(" ")[0])+(e.stage.includes("free")?1:0)+(e.stage.includes("-")?parseInt(e.stage.split("-")[1]):0)},W=function(e,t){e.sort((function(e,n){var r,a;return"stage"===t.key?(r=j(e),a=j(n)):(r=e[t.key],a=n[t.key]),r<a?"asc"===t.direction?-1:1:r>a?"asc"===t.direction?1:-1:0}))},K={column:[0,1,2,3],rank:[1,2,3,4],rarity:[0,1,2,3]},T=(r=[]).concat.apply(r,(0,a.Z)(w.map((function(e){return e.stages.map((function(t){return Object.assign({chapter:e.chapter},t)}))})))),A=(0,c.ZP)(u.Z).withConfig({displayName:"drop__TableWrapper",componentId:"sc-115hswd-8"})(["overflow-x:auto;height:calc(100vh - 10.4rem);padding-right:0;margin-right:0;table{text-align:center;}"]),$=c.ZP.div.withConfig({displayName:"drop__SettingButtonWrapper",componentId:"sc-115hswd-9"})(["position absolute;right:0;top:-4rem;"]),z=function(){var e=(0,h.ZK)().pageString,t=(0,o.useState)(Object.assign({},K,{column:"undefined"!=typeof window&&window.innerWidth<600?[0]:K.column,isModalOpen:!1,columnHasMounted:"undefined"!=typeof window&&window.innerWidth<600?(0,a.Z)(Array(4).keys()).map((function(e,t){return 0===t})):Array(4).fill(!0)})),n=t[0],r=t[1],i=function(e){return function(){return r((function(t){return Object.assign({},t,{isModalOpen:e})}))}};return o.createElement(o.Fragment,null,o.createElement(d.Z,{title:e.items.drop.index.helmet.title,description:e.items.drop.index.helmet.description,path:"/items/drop/"}),o.createElement($,null,o.createElement(s.Z,{onClick:i(!0)},k.qY)),o.createElement(A,null,o.createElement(m.dJ,{data:T,head:o.createElement(b,{column:n.column,columnHasMounted:n.columnHasMounted}),body:o.createElement(I,{column:n.column,rarity:n.rarity,rank:n.rank,columnHasMounted:n.columnHasMounted}),sortFunc:W,defaultSortKey:"stage",border:!0})),o.createElement(H,Object.assign({},n,{isModalOpen:n.isModalOpen,onClose:i(!1),filterBy:function(e){return function(t){return r((function(n){var r;return Object.assign({},n,((r={})[e]=t,r.columnHasMounted="column"===e?n.columnHasMounted.map((function(e,n){return e||t.includes(n)})):n.columnHasMounted,r))}))}}})))}}}]);
//# sourceMappingURL=component---src-pages-items-drop-index-js-7ea901a0c1ffd96ba4ca.js.map