(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{RXBc:function(e,t,n){"use strict";n.r(t);var o=n("q1tI"),i=n.n(o),r=n("vOnD"),a=n("7oih"),c=n("9CnA"),l=n("D7KU"),m=n("ckOl"),d=r.b.div.withConfig({displayName:"SiteAccordionBody__BodyContainer",componentId:"sc-6g2a14-0"})(["width:100%;font-size:.9rem;a{color:",";&:hover{color:",";}}ul{list-style:none;padding:0;margin:0;}> div{margin-top:1rem;}> div:first-child{margin-top:0;}"],(function(e){return e.theme.colors.link}),(function(e){return e.theme.colors.linkHover})),s=r.b.li.withConfig({displayName:"SiteAccordionBody__DescriptionContainer",componentId:"sc-6g2a14-1"})(["margin:1rem 0;&:first-child{margin-top:0;}&:last-child{margin-bottom:0;}"]),u=r.b.div.withConfig({displayName:"SiteAccordionBody__DescriptionHeader",componentId:"sc-6g2a14-2"})(["font-size:large;margin-bottom:.5rem;"]),p=r.b.div.withConfig({displayName:"SiteAccordionBody__DescriptionBody",componentId:"sc-6g2a14-3"})(["margin:0;p{margin:.3rem .5rem;}"]),g=function(){var e=Object(o.useContext)(l.a).pageString;return i.a.createElement(d,null,i.a.createElement("ul",null,e.home.about.content.map((function(e,t){var n;return n="feedback"===e.name?function(){return i.a.createElement("p",null,e.content[0],i.a.createElement("a",{href:"https://peing.net/ja/b5295760aebf4c",target:"_blank",rel:"noreferrer"},e.content[1]),e.content[2])}:"reference"===e.name?function(){return e.content.map((function(e,t){return 3===t?i.a.createElement("p",{key:t},e):i.a.createElement("p",{key:t},i.a.createElement("a",{href:e.link,target:"_blank",rel:"noreferrer"},e.title))}))}:function(){return e.content.map((function(e,t){return i.a.createElement("p",{key:t},e)}))},i.a.createElement(s,{key:t},i.a.createElement(u,null,e.header),i.a.createElement(p,null,i.a.createElement(n,null)))}))))},b=Object(r.b)(c.a).withConfig({displayName:"SiteAccordionBody__MsgAccordion",componentId:"sc-6g2a14-4"})(["&&{border-bottom:1px solid lightgray;> .MuiAccordionSummary-root{padding:0 .5rem;border-bottom:0px solid lightgray;}> .MuiAccordionSummary-root.Mui-expanded{border-bottom:1px solid lightgray;}.MuiAccordionSummary-content{display:inline;margin:.5rem 0;> span{padding:.25rem .4rem;}}&& .MuiAccordionDetails-root{font-size:small;padding:.4rem .5rem;margin:0;}}"]);function h(e){var t=Object(o.useState)(!1),n=t[0],r=t[1],a=e.msg,c=a.type,l=a.title,d=a.description,s="New"===c?m.w:"Fix"===c?m.o:m.f;return i.a.createElement(b,{expanded:n,onChange:function(){return r(!n)},square:!0,title:i.a.createElement(i.a.Fragment,null,i.a.createElement(s,null)," "+l),content:d})}var f=r.b.div.withConfig({displayName:"SiteAccordionBody__MsgBox",componentId:"sc-6g2a14-5"})(["> div:first-child{border-bottom:1px solid lightgray;}> div > div{border-top:none;}"]);function y(){var e=Object(o.useContext)(l.a).pageString;return i.a.createElement(d,null,e.home.updateLog.content.map((function(e,t){return i.a.createElement(f,{key:t},i.a.createElement("div",null,e.version),e.content.map((function(e,t){return i.a.createElement(h,{key:t,msg:e})})))})))}var E=r.b.ul.withConfig({displayName:"SiteAccordionBody__LicenseList",componentId:"sc-6g2a14-6"})(["margin-bottom:-.5rem;"]),k=r.b.div.withConfig({displayName:"SiteAccordionBody__LicenseItemTitle",componentId:"sc-6g2a14-7"})(["font-weight:bold;"]),L=r.b.div.withConfig({displayName:"SiteAccordionBody__LicenseItemContent",componentId:"sc-6g2a14-8"})(["padding-left:.5rem;padding-bottom:.5rem;"]),w=function(){var e=Object(o.useContext)(l.a).pageString;return i.a.createElement(d,null,i.a.createElement(E,null,i.a.createElement("li",{key:"text"},i.a.createElement(k,null,i.a.createElement("span",null,e.home.license.content.title)),i.a.createElement(L,null,i.a.createElement("span",null,e.home.license.content.content))),[{titleLink:"https://github.com/google/material-design-icons",title:"Material icons - Google Design",licenseLink:"https://github.com/google/material-design-icons/blob/master/LICENSE",license:"Apache License 2.0"},{titleLink:"https://github.com/facebook/react",title:"react",licenseLink:"https://github.com/facebook/react/blob/master/LICENSE",license:"MIT License"},{titleLink:"https://github.com/react-bootstrap/react-bootstrap",title:"react-bootstrap",licenseLink:"https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE",license:"MIT License"},{titleLink:"https://github.com/paulcollett/react-masonry-css",title:"react-masonry-css",licenseLink:"https://github.com/paulcollett/react-masonry-css/blob/master/LICENSE",license:"MIT License"},{titleLink:"https://github.com/dirtyredz/react-scroll-up-button",title:"react-scroll-up-button",licenseLink:"https://github.com/dirtyredz/react-scroll-up-button/blob/master/LICENSE",license:"MIT License"},{titleLink:"https://github.com/mui-org/material-ui",title:"material-ui",licenseLink:"https://github.com/mui-org/material-ui/blob/master/LICENSE",license:"MIT License"},{titleLink:"https://github.com/styled-components/styled-components",title:"styled-components",licenseLink:"https://github.com/styled-components/styled-components/blob/master/LICENSE",license:"MIT License"}].map((function(e,t){return i.a.createElement("li",{key:t},i.a.createElement(k,null,i.a.createElement("a",{href:e.titleLink,target:"_blank",rel:"noreferrer"},e.title)),i.a.createElement(L,null,i.a.createElement("a",{href:e.licenseLink,target:"_blank",rel:"noreferrer"},e.license)))}))))},x=r.b.div.withConfig({displayName:"pages__HomeContainer",componentId:"sc-1cl1oet-0"})(["display:flex;justify-content:center;flex-wrap:wrap;&&& > div{margin-bottom:2rem;}"]),v=r.b.div.withConfig({displayName:"pages__Header",componentId:"sc-1cl1oet-1"})(["width:60%;@media screen and (max-width:992px){width:80%;}@media screen and (max-width:624px){width:90%;}margin-top:2rem;margin-bottom:2rem;font-size:x-large;font-weight:bold;color:",";"],(function(e){return e.theme.colors.onSurface})),C=Object(r.b)(c.a).withConfig({displayName:"pages__DescriptionAccordion",componentId:"sc-1cl1oet-2"})(["&&{width:60%;@media screen and (max-width:992px){width:80%;}@media screen and (max-width:624px){width:90%;}border:1px solid ",";border-radius:.25rem;&{box-shadow:0 0 .15em lightgray;}> .MuiAccordionSummary-root{font-size:large;padding:.75rem 1.25rem;border-bottom-right-radius:0;border-bottom-left-radius:0;border-bottom:0px solid ",";}> .MuiAccordionSummary-root.Mui-expanded{border-bottom:1px solid ",";}.MuiAccordionDetails-root{margin:1rem;padding:0;}}"],(function(e){return e.theme.colors.border}),(function(e){return e.theme.colors.border}),(function(e){return e.theme.colors.border}));t.default=function(){var e=Object(o.useContext)(l.a).pageString,t=Object(o.useState)(0),n=t[0],r=t[1];return Object(o.useEffect)((function(){document.title=e.home.documentTitle})),i.a.createElement(a.a,null,i.a.createElement(x,null,i.a.createElement(v,null,e.home.documentTitle+" "+e.home.updateLog.content[0].version),[{header:e.home.about.header,body:i.a.createElement(g,null)},{header:e.home.updateLog.header,body:i.a.createElement(y,null)},{header:e.home.license.header,body:i.a.createElement(w,null)}].map((function(e,t){return i.a.createElement(C,{expanded:n===t,onChange:(o=t,function(e,t){r(!!t&&o)}),square:!1,expandIcon:m.l,title:e.header,content:e.body,key:t});var o}))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-8b296e9b06f78b1af19f.js.map