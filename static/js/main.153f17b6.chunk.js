(this["webpackJsonpbusy-body"]=this["webpackJsonpbusy-body"]||[]).push([[0],{149:function(e,t,a){e.exports=a(199)},154:function(e,t,a){},155:function(e,t,a){},199:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),i=a.n(o),s=(a(154),a(58)),c=a(59),l=a(39),d=a(137),m=a(136),u=(a(155),a(51)),h=a.n(u),p=new DOMParser;function g(e,t){var a=e[t.nodeName];a?Array.isArray(a)?e[t.nodeName].push({}):e[t.nodeName]=[a,{}]:e[t.nodeName]={}}function f(e){var t={},a=p.parseFromString(e,"application/xml");return a?function e(t,a){if(t)for(var n=0;n<t.length;n++){var r=t[n];if(r)if(r.hasAttributes()){g(a,r);for(var o=r.getAttributeNames(),i={},s=0;s<o.length;s++)i["@"+o[s]]=r.getAttribute(o[s]);i["#text"]=r.textContent,Array.isArray(a[r.nodeName])?a[r.nodeName][a[r.nodeName].length-1]=i:a[r.nodeName]=i,r.children.length>0&&e(r.children,a)}else if(r.children.length>0)g(a,r),e(r.children,Array.isArray(a[r.nodeName])?a[r.nodeName][a[r.nodeName].length-1]:a[r.nodeName]);else{var c=p.parseFromString(r.textContent,"text/html");a[r.nodeName]=c.body.textContent||""}}else console.error("List is not defined")}(a.children,t):console.log("Invalid XML string: "+e),t}var b=a(27),y=a(90),v=a(246),E=a(241),S=a(245),F=a(244),w=a(243),k=a(239),x=a(32),j=a(235),C=a(238),N=a(242),O=a(247),R=a(256),I=a(255);var B=a(237),T=a(240),A=Object(j.a)((function(e){return{icon:{marginRight:e.spacing(2)},heroContent:{backgroundColor:e.palette.background.paper,padding:e.spacing(8,0,6)},heroButtons:{marginTop:e.spacing(4)},cardGrid:{paddingTop:e.spacing(8),paddingBottom:e.spacing(8)},card:{height:"100%",display:"flex",flexDirection:"column"},cardMedia:{paddingTop:"56.25%"},cardContent:{flexGrow:1},footer:{backgroundColor:e.palette.background.paper,padding:e.spacing(6)},loading:{marginTop:"50px"},margin:{marginTop:"100px",marginBottom:"100px"}}}));function P(e){var t="";return e["media:content"]&&e["media:content"]["@url"]?t=e["media:content"]["@url"]:e["media:group"]&&e["media:group"]["media:content"]&&e["media:group"]["media:content"][1]["@url"]?t=e["media:group"]["media:content"][1]["@url"]:e.rssImage&&e.rssImage.url&&(t=e.rssImage.url),t}function D(){return r.a.createElement(x.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(B.a,{color:"inherit",href:"https://material-ui.com/"},"busyBodyFeeder.com")," ",(new Date).getFullYear(),".")}function M(){var e=A();return r.a.createElement("footer",{className:e.footer},r.a.createElement(x.a,{variant:"h6",align:"center",gutterBottom:!0},"Busy Body RSS Feeder"),r.a.createElement(x.a,{variant:"subtitle1",align:"center",color:"textSecondary",component:"p"},"Thanks for checking out the site"),r.a.createElement(D,null))}function W(e){var t,a,o,i,s=A(),c=(t=e.rss.length,Math.ceil(t/30)),l=Object(n.useState)(1),d=Object(b.a)(l,2),m=d[0],u=d[1],h=(a=e.rss,o=30,i=m,a.length<=30?a:a.slice((i-1)*o,i*o));return e.rss.length>0&&!e.error?r.a.createElement("div",null,r.a.createElement(C.a,{className:s.cardGrid,maxWidth:"lg"},r.a.createElement(k.a,{container:!0,spacing:4},h.map((function(e,t,a){return r.a.createElement(T.a,{in:!0},r.a.createElement(k.a,{item:!0,key:t,xs:12,sm:6,md:4},r.a.createElement(E.a,{className:s.card},r.a.createElement(N.a,{title:e&&e.rssTitle?e.rssTitle:"",subheader:e&&e.pubDate?e.pubDate:""}),r.a.createElement(w.a,{className:s.cardMedia,image:P(e),title:"Image title"}),r.a.createElement(F.a,{className:s.cardContent},r.a.createElement(x.a,{gutterBottom:!0,variant:"h5",component:"h2"},e.title),r.a.createElement(x.a,null,e.description)),r.a.createElement(S.a,null,r.a.createElement(v.a,{size:"small",color:"primary",onClick:function(){window.location=e.link}},"View")))))}))),r.a.createElement(k.a,{container:!0,justify:"center"},r.a.createElement("div",{className:s.root,style:{marginBottom:"50px",marginTop:"150px"}},r.a.createElement(R.a,{count:c,color:"secondary",onChange:function(e,t){u(t)}})))),r.a.createElement(M,null)):e.error?r.a.createElement("div",null,r.a.createElement(k.a,{container:!0,justify:"center"},r.a.createElement(I.a,{severity:"error",className:s.margin},"Unable to load rss feeds. Please try again later.")),r.a.createElement(M,null)):r.a.createElement(k.a,{container:!0,justify:"center"},r.a.createElement(O.a,{className:s.loading}))}var L=a(250),z=a(249),G=a(251),J=a(126),U=a.n(J),K=a(12),Y=a(141),q=a(127),V=a.n(q),X=a(258),$=a(101),_=a(122),H=Object(j.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120,color:"#fff"},selectEmpty:{color:"#fff","&:before":{border:"none"},"&:hover:not(.Mui-disabled):before":{border:"none"}},icon:{fill:"#fff"},sortColor:{color:"fff"}}}));function Q(e){var t=H(),a=r.a.useState(""),n=Object(b.a)(a,2),o=n[0],i=n[1];return r.a.createElement($.a,{className:t.formControl},r.a.createElement(_.a,{labelId:"sortBy",id:"sort",value:o,onChange:function(t){var a=t.target.value;i(a),e.sort(a)},displayEmpty:!0,className:t.selectEmpty,inputProps:{classes:{icon:t.icon}}},r.a.createElement(X.a,{value:""},r.a.createElement("em",null,"None")),e.titles&&e.titles.length>0&&e.titles.map((function(e,t){return r.a.createElement(X.a,{key:t,value:e},e)}))))}var Z=a(252),ee=a(129),te=a.n(ee),ae=a(257),ne=a(130),re=a.n(ne),oe=a(131),ie=a.n(oe),se=a(132),ce=a.n(se),le=a(254),de=a(133),me=a.n(de),ue=a(134),he=a.n(ue),pe=a(80),ge=a.n(pe),fe=function(){function e(t,a){Object(s.a)(this,e),this.id=t,this.path=a}return Object(c.a)(e,[{key:"getPath",value:function(){return this.path}},{key:"getId",value:function(){return this.id}}]),e}(),be=new(function(){function e(){Object(s.a)(this,e),this.proxy="https://cors-anywhere.herokuapp.com/",this.feedKey="busyBodyFeeds",this.feeds=[new fe("cnn","http://rss.cnn.com/rss/cnn_topstories.rss"),new fe("bbc","http://feeds.bbci.co.uk/news/rss.xml#"),new fe("fox","http://feeds.foxnews.com/foxnews/latest"),new fe("wsj","https://feeds.a.dj.com/rss/RSSWSJD.xml"),new fe("nyt","https://archive.nytimes.com/www.nytimes.com/services/xml/rss/index.html?mcubz=0"),new fe("yahoo","https://www.yahoo.com/news/rss/world")],this.getFeeds=this.getFeeds.bind(this),this.getProxy=this.getProxy.bind(this),this.getStoredFeeds=this.getStoredFeeds.bind(this),this.setStoredFeeds=this.setStoredFeeds.bind(this),this.addAFeed=this.addAFeed.bind(this),this.initialize()}return Object(c.a)(e,[{key:"initialize",value:function(){var e=this.getStoredFeeds();e&&e.length>0?this.feeds=e:this.setStoredFeeds(this.feeds)}},{key:"getFeeds",value:function(){var e=this;return this.getStoredFeeds().map((function(t){return ge.a.get(e.proxy+encodeURI(t.path))}))}},{key:"getProxy",value:function(){return this.proxy}},{key:"getStoredFeeds",value:function(){try{return JSON.parse(localStorage.getItem(this.feedKey))||[]}catch(e){return[]}}},{key:"setStoredFeeds",value:function(e){localStorage.setItem(this.feedKey,JSON.stringify(e))}},{key:"addAFeed",value:function(e,t){var a=this.getStoredFeeds();a.unshift(new fe(e,t)),this.setStoredFeeds(a)}}]),e}()),ye=a(81),ve=Object(j.a)((function(e){return{icon:{marginRight:e.spacing(2)},heroContent:{backgroundColor:e.palette.background.paper,padding:e.spacing(8,0,6)},heroButtons:{marginTop:e.spacing(4)},cardGrid:{paddingTop:e.spacing(8),paddingBottom:e.spacing(8)},card:{height:"100%",display:"flex",flexDirection:"column"},cardMedia:{paddingTop:"56.25%"},cardContent:{flexGrow:1},search:Object(y.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(K.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(K.b)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(y.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"}),formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)},add:{position:"fixed",bottom:e.spacing(2),right:e.spacing(3)},root:{display:"flex",alignItems:"center"},wrapper:{margin:e.spacing(1),position:"relative"},buttonSuccess:{backgroundColor:ye.a[500],"&:hover":{backgroundColor:ye.a[700]}},buttonProgress:{color:ye.a[500],position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}}));function Ee(e){var t=ve(),a=r.a.useState(!1),n=Object(b.a)(a,2),o=n[0],i=n[1],s=r.a.useState(!1),c=Object(b.a)(s,2),l=c[0],d=c[1],m=r.a.useState(!1),u=Object(b.a)(m,2),h=u[0],p=u[1],g=r.a.useState("An error has occurred. Please try again later"),y=Object(b.a)(g,2),E=y[0],S=y[1],F=function(e){i(!1)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(z.a,null),r.a.createElement(L.a,{position:"sticky"},r.a.createElement(G.a,null,r.a.createElement(U.a,null),r.a.createElement(x.a,{variant:"h6",color:"inherit",noWrap:!0},"RSS"),r.a.createElement("div",{className:t.search},r.a.createElement("div",{className:t.searchIcon},r.a.createElement(V.a,null)),r.a.createElement(Y.a,{placeholder:"Search\u2026",classes:{root:t.inputRoot,input:t.inputInput},inputProps:{"aria-label":"search"},onChange:e.search})),r.a.createElement(Q,{titles:e.titles,sort:e.sort}))),r.a.createElement("main",null,r.a.createElement("div",{className:t.heroContent},r.a.createElement(C.a,{maxWidth:"sm"},r.a.createElement(x.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"Daily Feeds"),r.a.createElement(x.a,{variant:"h5",align:"center",color:"textSecondary",paragraph:!0},"Are you a busy body when it comes to news? Take a gander at all these articles from various RSS feeds. You can search for feeds in the search bar or sort by your favorite feeds."))),h&&E&&r.a.createElement(I.a,{severity:"error",onClose:function(){return p(!1)}},E),r.a.createElement(ae.a,{title:"Add RSS Feed"},r.a.createElement(Z.a,{color:"secondary","aria-label":"add",className:t.add,onClick:function(){i(!0)}},r.a.createElement(te.a,null))),r.a.createElement(W,{rss:e.rss,error:e.error})),r.a.createElement("div",null,r.a.createElement(re.a,{open:o,onClose:F,"aria-labelledby":"form-dialog-title"},r.a.createElement(ie.a,{id:"form-dialog-title"},"Subscribe"),r.a.createElement(ce.a,null,r.a.createElement(le.a,null,"To subscribe to an RSS feed please enter the URL here."),r.a.createElement(me.a,{autoFocus:!0,margin:"dense",id:"name",label:"RSS Feed",type:"email",fullWidth:!0})),r.a.createElement(he.a,null,r.a.createElement(v.a,{onClick:F,color:"primary"},"Cancel"),r.a.createElement("div",{className:t.wrapper},r.a.createElement(v.a,{onClick:function(){var t=document.getElementById("name").value;if(t){var a=ge.a.create();a.defaults.timeout=1e4,a.interceptors.request.use((function(e){return d(!0),e}),(function(e){return d(!1),i(!1),Promise.reject(e)})),a.interceptors.response.use((function(e){return d(!1),i(!1),e}),(function(e){return d(!1),i(!1),Promise.reject(e)})),a.get(be.getProxy()+encodeURI(t)).then((function(a){if(a.data)try{var n=f(a.data);n&&n.channel?e.addFeed(n.channel,t):(p(!0),S("Failed to load RSS Feed: "+t))}catch(h){p(!0),S("Failed to load RSS Feed: "+t)}})).catch((function(e){p(!0),S("Failed to load RSS Feed: "+t)}))}},color:"primary",disabled:l},"Subscribe"),l&&r.a.createElement(O.a,{size:24,className:t.buttonProgress}))))))}var Se=a(135),Fe=a(253),we=[],ke=[],xe=Object(Se.a)({palette:{primary:{main:"#aa0000"},secondary:{main:"#26a69a"}}}),je=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={rss:[],error:!1},n.search=n.search.bind(Object(l.a)(n)),n.sort=n.sort.bind(Object(l.a)(n)),n.transformFeeds=n.transformFeeds.bind(Object(l.a)(n)),n.addFeed=n.addFeed.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"search",value:function(e){var t=e.target.value;if(""!==t){if(t.length>=3){var a=new RegExp(t,"gi"),n=h.a.cloneDeep(this.state.rss).filter((function(e){return e&&e.description&&-1!==e.description.search(a)||e&&e.title&&-1!==e.title.search(a)}));n.length>0&&this.setState({rss:n})}}else this.setState({rss:h.a.cloneDeep(this.transformFeeds(we))})}},{key:"sort",value:function(e){if(""!==e){var t=h.a.cloneDeep(we).find((function(t){return t&&t.title&&t.title===e}));t&&this.setState({rss:this.transformFeeds(t)})}else this.setState({rss:this.transformFeeds(we)})}},{key:"componentDidMount",value:function(){var e=this;Promise.all(be.getFeeds()).then((function(t){var a=t.map((function(e){var t=f(e.data);if(!h.a.isEmpty(t)&&t.channel)return t.channel}));we=a,a.forEach((function(e){e&&ke.push(e.title)})),e.setState({rss:e.transformFeeds(a)})})).catch((function(t){e.setState({error:!0}),console.error(t)}))}},{key:"updateFeed",value:function(e,t){if(e){var a=e.title,n=e.item,r=e.image;if(n)for(var o=0;o<n.length;o++){var i=n[o];i.rssTitle=a,i.rssImage=r,t.push(i)}}}},{key:"transformFeeds",value:function(e){var t=[];if(e&&e.length)for(var a=0;a<e.length;a++){var n=e[a];this.updateFeed(n,t)}else e&&this.updateFeed(e,t);return t}},{key:"addFeed",value:function(e,t){var a=[],n=this.transformFeeds(e),r=h.a.cloneDeep(this.state.rss);a=a.concat(n,r),this.setState({rss:a}),be.addAFeed("",t)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Fe.a,{theme:xe},r.a.createElement(Ee,{rss:this.state.rss,error:this.state.error,titles:ke,search:this.search,sort:this.sort,addFeed:this.addFeed})))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(je,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[149,1,2]]]);
//# sourceMappingURL=main.153f17b6.chunk.js.map