(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[529],{1543:function(n,e,r){"use strict";var t=r(7228),i=r(7486),o=r(5632),u=r(8721),a=r.n(u),c=r(2322);e.Z=function(n){var e=n.items,r=void 0===e?[]:e,u=(0,o.useRouter)();return(0,c.jsxs)("div",{className:"sticky-top",children:[(0,c.jsx)(i.gR,{itemListElements:r.map((function(n,e){return{position:e,name:n.name,item:""}}))}),(0,c.jsx)("div",{className:a().bg,children:(0,c.jsx)("div",{className:"container",children:(0,c.jsxs)("div",{className:a().box,children:[(0,c.jsx)("span",{className:a().back,onClick:function(){history.back()},children:(0,c.jsx)(t.x_l,{style:{maxWidth:24,display:"inline-block"}})}),r.map((function(n,e){return(0,c.jsxs)("span",{onClick:function(){u.push(n.url)},children:[n.name,e!==r.length-1&&" / "]},n.name)}))]})})})]})}},8018:function(n,e,r){"use strict";var t=r(5632),i=(r(466),r(2322));e.Z=function(n){var e=n.UI,r=n.items,o=void 0===r?[]:r,u=(0,t.useRouter)();return(0,i.jsx)(e,{items:o,onClickItem:function(n){u.push(n.href)}})}},3726:function(n,e,r){"use strict";var t=r(7460),i=(r(2784),r(298));r(1857),r(6141),r(4406);function o(n,e){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.push.apply(r,t)}return r}function u(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){(0,t.Z)(n,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}(0,i.v)((function(n,e){var r=e.headers,t=localStorage.getItem("token");return{headers:u(u({},r),{},{authorization:t?"Bearer ".concat(t):""})}}))},8734:function(n,e,r){"use strict";r.r(e);var t,i=r(9566),o=r(59),u=r(5802),a=r(9144),c=r(3559),s=r(5632),l=r(2784),m=r(8018),d=r(1543),p=(r(466),r(1171)),f=r(5474),h=(r(3726),r(2322)),v=(0,u.Ps)(t||(t=(0,o.Z)(["\n  query ($condition: ProductWhereInput) {\n    allProducts(where: $condition) {\n      id\n      categories {\n        url\n        name\n        id\n      }\n      name\n      url\n    }\n  }\n"])));function b(n){var e=n.url,r=(0,a.a)(v,{variables:{condition:{url:e}}}),t=r.data,o=void 0===t?{}:t,u=r.error;if(r.loading)return"";if(u)return u.toString();var c=o.allProducts,s=void 0===c?[]:c,l=(0,i.Z)(s,1)[0],p=void 0===l?{}:l;if(!p)return"";var f,b=p.categories,j=void 0===b?[]:b,x=p.name,g=p.url,O=[{name:"Trang ch\u1ee7",url:"/"},{name:"S\u1ea3n ph\u1ea9m",url:"/san-pham"}];j&&j.length&&(null===j||void 0===j||j.map((function(n){O.push({name:n.name,url:"/san-pham/"+n.url})})),O.push({name:x,url:"/san-pham/"+(null===(f=j[0])||void 0===f?void 0:f.url)+"/"+g}));return(0,h.jsx)(m.Z,{items:O,UI:d.Z})}e.default=function(){var n=(0,s.useRouter)().query.product,e=(0,l.useMemo)((function(){return n&&(0,h.jsx)(c.W,{maxW:"container.xl",pt:{base:7,md:10},children:(0,h.jsx)(p.Z,{UI:f.Z,ProductWhereInput:{url:n}})})}),[n]),r=(0,l.useMemo)((function(){return n&&(0,h.jsx)(b,{url:n})}),[n]);return(0,h.jsxs)(l.Fragment,{children:[r,e]})}},7445:function(n,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/san-pham/[category]/[product]",function(){return r(8734)}])},8721:function(n){n.exports={bg:"One_bg__1xpb3",box:"One_box__3GiSX",back:"One_back__YHmmw"}}},function(n){n.O(0,[969,335,530,425,486,682,774,888,179],(function(){return e=7445,n(n.s=e);var e}));var e=n.O();_N_E=e}]);