(function(t){function e(e){for(var o,r,l=e[0],i=e[1],c=e[2],p=0,m=[];p<l.length;p++)r=l[p],s[r]&&m.push(s[r][0]),s[r]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);u&&u(e);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],o=!0,l=1;l<a.length;l++){var i=a[l];0!==s[i]&&(o=!1)}o&&(n.splice(e--,1),t=r(r.s=a[0]))}return t}var o={},s={app:0},n=[];function r(e){if(o[e])return o[e].exports;var a=o[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=o,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(a,o,function(e){return t[e]}.bind(null,o));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=i;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var o=a("64a9"),s=a.n(o);s.a},2807:function(t,e,a){"use strict";var o=a("62e6"),s=a.n(o);s.a},"346a":function(t,e,a){"use strict";var o=a("fc67"),s=a.n(o);s.a},"3b32":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var o,s,n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},l=[],i={name:"App"},c=i,u=(a("034f"),a("2877")),p=Object(u["a"])(c,r,l,!1,null,null,null),m=p.exports,d=a("8c4f"),b=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-row",{attrs:{gutter:"2"}},[o("el-col",{attrs:{span:"4"}},[o("p",[t._v("e-book shop")])]),o("el-col",{attrs:{span:"19"}},[o("uper-nav")],1)],1),o("el-row",[o("el-col",[o("div",{staticClass:"back"},[o("footer-nav"),o("left-nav"),o("img",{attrs:{src:a("a3f6")}})],1)])],1)],1)},h=[],f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"footer fixed"},[a("ul",[a("li",[a("router-link",{attrs:{to:"/cart"}},[t._v("My cart")])],1),a("li",[a("router-link",{attrs:{to:"/MyOrder"}},[t._v("My Order")])],1)])])},v=[],g={name:"footer"},_=g,w=(a("b874"),Object(u["a"])(_,f,v,!1,null,"cca6b4c4",null)),k=w.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"uper"}},[a("el-row",[a("el-col",{attrs:{span:"5"}},[a("p",{staticClass:"Description"},[t._v(t._s(this.message))])]),a("el-col",{attrs:{span:"18"}},[a("nav",{class:t.active,on:{click:function(t){t.preventDefault()}}},[a("router-link",{staticClass:"home",attrs:{to:"/"}},[t._v("index")]),a("router-link",{staticClass:"projects",attrs:{to:"/books"}},[t._v("booklist")]),a("a",{staticClass:"contact",attrs:{href:""},on:{click:t.Logout}},[t._v("log out")]),a("a",{staticClass:"contact",attrs:{href:""},on:{click:t.showLogin}},[t._v("log in")]),a("router-link",{staticClass:"projects",attrs:{to:"/register"}},[t._v("register")])],1)])],1),a("div",{staticClass:"login",attrs:{id:"login"}},[a("form",{attrs:{action:"",method:"post"}},[a("div",{staticClass:"item firstLine",attrs:{id:"firstLine"}},[a("span",{staticClass:"login_title"},[t._v("log in")]),a("span",{staticClass:"login_close",attrs:{id:"close_minilogin"},on:{click:t.closeLogin}},[t._v("X")])]),a("div",{staticClass:"item"},[a("label",[t._v("user name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.uname,expression:"uname"}],attrs:{type:"text"},domProps:{value:t.uname},on:{input:function(e){e.target.composing||(t.uname=e.target.value)}}})]),a("div",{staticClass:"item"},[a("label",[t._v("password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.upwd,expression:"upwd"}],attrs:{type:"password"},domProps:{value:t.upwd},on:{input:function(e){e.target.composing||(t.upwd=e.target.value)}}})]),a("div",{staticClass:"item"},[a("el-button",{attrs:{id:"lolo",type:"primary",loading:!1},on:{click:t.decide}},[t._v("log in")])],1)])])],1)},x=[],C={data:function(){return{uname:"",upwd:"",haveLogin:0,message:""}},name:"uperNav",mounted:function(){this.welcome()},methods:{showLogin:function(){if(0==this.global.getStatus()){var t=document.getElementById("login");t.style.display="block",t.style.left=(document.body.scrollWidth-t.scrollWidth)/2+"px",t.style.top=(document.body.scrollHeight-t.scrollHeight)/2+NaN}else alert("You have logged in!")},closeLogin:function(){var t=document.getElementById("login");t.style.display="none",this.uname="",this.upwd="",this.welcome()},moveLogin:function(t){var e=!0;t=t||window.event;var a=t.clientX,o=t.clientY,s=document.getElementById("login");console.log(s);var n=parseInt(s.style.top),r=parseInt(s.style.left);document.onmousemove=function(t){if(e){t=t||window.event;var l=n+t.clientY-o,i=r+t.clientX-a;i>0&&l>0&&(s.style.top=l+"px",s.style.left=i+"px")}},document.onmouseup=function(){e=!1}},decide:function(){var t=this;this.$axios.post("http://localhost:8080/login",{username:this.uname,password:this.upwd}).then(function(e){console.log(e.data),0==e.data.access?alert("You have been banned from logging in."):e.data.password==t.upwd?(t.global.setUserName(t.uname),t.global.setAccess(e.data.access),t.global.setStatus(1),t.welcome(),alert("Success!"),t.closeLogin()):alert("Wrong password!")}).catch(function(t){alert(t)})},welcome:function(){this.global.getStatus()?this.message="Welcome,"+this.global.username+"!":this.message="Login in to enter the e-book"},Logout:function(){this.global.Exit(),this.welcome()}}},N=C,S=(a("5ed0"),Object(u["a"])(N,y,x,!1,null,null,null)),O=S.exports,$={},D=Object(u["a"])($,o,s,!1,null,null,null),j=D.exports,E={components:{FooterNav:k,uperNav:O,leftNav:j}},M=E,L=(a("a21c"),Object(u["a"])(M,b,h,!1,null,"e6f4aa0c",null)),P=L.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"manage tc"},[a("uper"),a("h1",{staticClass:"Title"},[t._v("Order Manage")]),a("button",[t._v("Add")]),a("input",{attrs:{type:"text",placeholder:"Please input order_id"}}),a("button",[t._v("Confirm")]),a("footer-nav"),a("el-row",[a("el-col",[a("p",[t._v("e-book shop")])]),a("el-col",[a("p",[t._v("hellow")])])],1)],1)},I=[],T={components:{FooterNav:k,uper:O}},A=T,F=Object(u["a"])(A,B,I,!1,null,"68cb8ffa",null),U=F.exports,W=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("uper"),a("footer-nav"),a("div",{staticClass:"block"},[a("span",{staticClass:"demonstration"},[t._v("data range")]),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd","unlink-panels":"true",type:"daterange","range-separator":"to","start-placeholder":"start date","end-placeholder":"end date"},model:{value:t.dateSelect,callback:function(e){t.dateSelect=e},expression:"dateSelect"}})],1),a("div",[a("h1",{staticClass:"Title"},[t._v("My Order")]),a("input",{attrs:{type:"button",value:"click to load my order"},on:{click:function(e){return t.review()}}})]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.OrderData.filter(function(e){return!t.dateSelect||e.time>=t.dateSelect[0]&&e.time<=t.dateSelect[1]}),stripe:""}},[a("el-table-column",[a("el-table-column",{attrs:{prop:"bookID",label:"book_id",sortable:""}}),a("el-table-column",{attrs:{prop:"bookname",label:"bookname",sortable:""}}),a("el-table-column",{attrs:{prop:"userName",label:"userName",sortable:""}}),a("el-table-column",{attrs:{prop:"count",label:"count",sortable:""}}),a("el-table-column",{attrs:{prop:"orderID",label:"order_id",sortable:""}}),a("el-table-column",{attrs:{prop:"price",label:"price",sortable:""}}),a("el-table-column",{attrs:{prop:"time",label:"time",sortable:""}})],1)],1)],1)},X=[],Y={data:function(){return{search:"",OrderData:[],dateSelect:[]}},methods:{review:function(){var t=this;""!=this.dateSelect?this.$axios.post("http://localhost:8080/getOrder",{username:this.global.username}).then(function(e){console.log(e.data),t.OrderData=e.data}).catch(function(t){alert(t)}):this.$message({message:"Warning，please select time!",type:"warning"})}},name:"MyOrder",components:{uper:O,FooterNav:k}},q=Y,z=(a("bf98"),Object(u["a"])(q,W,X,!1,null,"083818b4",null)),R=z.exports,H=a("578a"),J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{staticClass:"Title"},[t._v("e-book shop")]),a("uper"),a("footer-nav"),a("el-button",{attrs:{type:"info"},nativeOn:{click:function(e){return e.preventDefault(),t.review(e)}}},[t._v("click to view the booklist")]),a("el-input",{staticStyle:{width:"100%","margin-bottom":"25px"},attrs:{border:"",placeholder:"Please input book name","prefix-icon":"el-icon-search"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData.filter(function(e){return!t.search||e.bookName.includes(t.search)})},on:{"row-click":t.details}},[a("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"120px",height:"150px"},attrs:{src:t.row.href,alt:""}})]}}])},[a("el-table-column",{attrs:{type:"index"}})],1),a("el-table-column",{attrs:{prop:"bookName",label:"bookName",sortable:""}}),a("el-table-column",{attrs:{prop:"author",label:"author",sortable:""}}),a("el-table-column",{attrs:{prop:"iSBN",label:"ISBN",sortable:""}}),a("el-table-column",{attrs:{prop:"price",label:"price",sortable:""}}),a("el-table-column",{attrs:{prop:"stock",label:"stock",sortable:""}})],1)],1)},Z=[],G={name:"Table",components:{uper:O,FooterNav:k},data:function(){return{search:"",color:"black",tableData:[]}},methods:{details:function(t){this.$router.push({path:"/Details",query:{bookName:t.bookName}})},review:function(){var t=this;this.$axios.get("http://localhost:8080/book/table").then(function(e){console.log(e.data),t.tableData=e.data,console.log(t.tableData)}).catch(function(t){alert(t)})}}},K=G,Q=(a("346a"),Object(u["a"])(K,J,Z,!1,null,"4fc91070",null)),V=Q.exports,tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("uper-nav"),a("el-row",[a("el-col",[a("div",{staticClass:"Title"},[a("h1",{staticClass:"Title"},[t._v(t._s(this.bookName)+"-"+t._s(this.author))])])]),a("el-col",{attrs:{span:"6"}},[a("p",{staticClass:"Description",staticStyle:{"margin-left":"10%"}},[t._v("bookName:"+t._s(this.bookName)),a("br"),t._v("author:"+t._s(this.author)),a("br"),t._v("price:"+t._s(this.price)+"yuan"),a("br"),t._v("stock: "+t._s(this.stock)),a("br"),t._v("ISBN: "+t._s(this.iSBN)),a("br"),a("br")])]),a("el-col",{attrs:{span:"17"}},[a("p",{staticClass:"Description"},[t._v(t._s(this.details))])]),a("el-row",[a("el-col",{attrs:{span:"4"}},[a("p",{staticClass:"Description"},[t._v("count:")])]),a("el-col",{attrs:{span:"12"}},[a("el-input",{attrs:{placeholder:"Please input the number of the books you want to buy.",clearable:""},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1),a("input",{attrs:{type:"file",name:"files",multiple:""}})],1),a("el-row",[a("el-col",{attrs:{span:"18"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.cartbook}},[t._v("Put into my cart")])],1)],1),a("el-footer",[a("footer-nav")],1)],1),a("el-row"),t._m(0)],1)},et=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",[a("img",{attrs:{src:"https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"}})])}],at={name:"Details",components:{footerNav:k,uperNav:O},mounted:function(){var t=this,e=[];this.$axios.post("http://localhost:8080/book/certain",{bookName:this.bookName}).then(function(a){e=a.data,t.author=e.author,t.price=e.price,t.stock=e.stock,t.iSBN=e.iSBN}).catch(function(t){alert(t)})},methods:{cartbook:function(){this.$axios.post("http://localhost:8080/cart/cartbook",{username:this.global.username,bookName:this.bookName,number:this.number}).then(function(){alert("success")}).catch(function(t){alert(t)})}},data:function(){return{bookName:this.$route.query.bookName,author:"",stock:"",price:"",iSBN:"",number:""}}},ot=at,st=Object(u["a"])(ot,tt,et,!1,null,"54bfb72a",null),nt=st.exports,rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("uper"),a("footer-nav"),a("div",[a("h1",{staticClass:"Title"},[t._v("My cart")]),a("input",{attrs:{type:"button",value:"click to enter the cart"},on:{click:t.review}})]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.cartData,stripe:"","max-height":""}},[a("el-table-column",[a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{prop:"bookName",label:"bookName",sortable:""}}),a("el-table-column",{attrs:{prop:"price",label:"price",sortable:""}}),a("el-table-column",{attrs:{prop:"number",label:"number",sortable:""}}),a("el-table-column",{attrs:{fixed:"right",label:"Delete",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.deleteRow(e.$index,t.cartData)}}},[t._v("\n          delete\n        ")])]}}])})],1)],1),a("p",[a("button",{attrs:{type:"primary"},on:{click:t.submitCart}},[t._v("buy")])])],1)},lt=[],it={data:function(){return{search:"",cartData:[]}},methods:{review:function(){var t=this;this.$axios.post("http://localhost:8080/cart/cartlist",{username:this.global.username}).then(function(e){console.log(t.global.username),console.log(e.data),t.cartData=e.data}).catch(function(t){alert(t)})},deleteRow:function(t,e){var a=this;this.$axios.post("http://localhost:8080/cart/deleteCart",{bookName:e[t].bookName,username:this.global.username,number:e[t].number}).then(function(o){alert(e[t].bookName+" is removed!"),a.review()}).catch(function(t){alert(t)})},submitCart:function(){var t=this;this.$axios.post("http://localhost:8080/cart/submitCart",{username:this.global.username}).then(function(e){alert("Sucess!"),t.review()}).catch(function(t){alert(t)})}},name:"cart",components:{uper:O,FooterNav:k}},ct=it,ut=(a("2807"),Object(u["a"])(ct,rt,lt,!1,null,"5ccbf3c8",null)),pt=ut.exports,mt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("uper")],1),a("el-container",[a("el-aside",{attrs:{width:"50%"}}),a("el-main",[a("el-row",[a("el-col",{attrs:{span:"4"}},[a("p",{staticClass:"Description"},[t._v("user name:")])]),a("el-col",{attrs:{span:"12"}},[a("el-input",{attrs:{placeholder:"Please input your name.",clearable:""},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1)],1),a("br"),a("el-row",[a("el-col",{attrs:{span:"4"}},[a("p",{staticClass:"Description"},[t._v("password:")])]),a("el-col",{attrs:{span:"12"}},[a("el-input",{attrs:{placeholder:"Please input your password.","show-password":""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),a("br"),a("el-row",[a("el-col",{attrs:{span:"4"}},[a("p",{staticClass:"Description"},[t._v("Confirm your password:")])]),a("el-col",{attrs:{span:"12"}},[a("el-input",{attrs:{placeholder:"Confirm your password","show-password":""},model:{value:t.check,callback:function(e){t.check=e},expression:"check"}})],1)],1),a("br"),a("el-row",[a("el-col",{attrs:{span:"4"}},[a("p",{staticClass:"Description"},[t._v("e-mail")])]),a("el-col",{attrs:{span:"12"}},[a("el-input",{attrs:{placeholder:"Please input your e-mail",clearable:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)],1),a("br"),a("el-row",[a("el-col",{attrs:{span:"18"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.upload}},[t._v("submit")])],1)],1)],1)],1)],1)},dt=[],bt={data:function(){return{username:"",password:"",check:"",rights:"",email:""}},name:"cart",components:{uper:O},methods:{upload:function(){var t=this;this.password==this.check?this.checkEmail()?this.$axios.post("http://localhost:8080/register",{username:this.username,password:this.password,rights:this.rights,email:this.email}).then(function(e){"exist"==e.data.username?alert("User name exists."):e.data.rights?(console.log(e.data),console.log("Access:"+e.data.rights),console.log("UserName:"+e.data.username),alert("Succeed!"),t.global.setUserName(t.username),t.global.setAccess(e.data.rights),t.global.setStatus(1),t.$router.push({path:"/",query:{username:t.username}})):(console.log(e.data),alert("Error!"))}).catch(function(t){alert(t)}):alert("Something wrong with your e-mail address."):alert("Fail to confirm your password.")},checkEmail:function(){var t=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;return!!t.test(this.email)}}},ht=bt,ft=Object(u["a"])(ht,mt,dt,!1,null,"7e213f10",null),vt=ft.exports;n["default"].use(d["a"]);var gt=new d["a"]({routes:[{path:"/",name:"Index",component:P},{path:"/manage",name:"Manage",component:U},{path:"/login",name:"Login",component:H["default"]},{path:"/books",name:"Books",component:V},{path:"/Details",name:"Details",component:nt},{path:"/cart",name:"Cart",component:pt},{path:"/register",name:"Register",component:vt},{path:"/MyOrder",name:"MyOrder",component:R}]}),_t=a("5c96"),wt=a.n(_t),kt={username:"",8080:"",status:0,setUserName:function(t){this.username=t},setAccess:function(t){this.access=t},setStatus:function(t){this.status=t},getUserName:function(){return this.username},getStatus:function(){return this.status},Exit:function(){this.username="",this.access=!0,this.status=0}},yt=a("bc3a");n["default"].prototype.global=kt,n["default"].prototype.$axios=yt,n["default"].config.productionTip=!1,n["default"].use(wt.a),new n["default"]({router:gt,render:function(t){return t(m)}}).$mount("#app")},"578a":function(t,e,a){"use strict";var o=a("baa5"),s=a("b8b3"),n=a("2877"),r=Object(n["a"])(s["default"],o["a"],o["b"],!1,null,"e6612bb0",null);e["default"]=r.exports},"5ed0":function(t,e,a){"use strict";var o=a("3b32"),s=a.n(o);s.a},"62e6":function(t,e,a){},"64a9":function(t,e,a){},7777:function(t,e,a){},9092:function(t,e,a){},9119:function(t,e){},a21c:function(t,e,a){"use strict";var o=a("d4fa"),s=a.n(o);s.a},a3f6:function(t,e,a){t.exports=a.p+"img/book.186abf4a.jpg"},b874:function(t,e,a){"use strict";var o=a("9092"),s=a.n(o);s.a},b8b3:function(t,e,a){"use strict";var o=a("9119"),s=a.n(o);e["default"]=s.a},baa5:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"login",attrs:{id:"login"}},[a("form",{attrs:{action:"",method:"post"}},[a("div",{staticClass:"item firstLine",attrs:{id:"firstLine"}},[a("span",{staticClass:"login_title"},[t._v("login")]),a("span",{staticClass:"login_close",attrs:{id:"close_minilogin"}},[t._v("X")])]),a("div",{staticClass:"item"},[a("label",[t._v("username")]),a("input",{attrs:{type:"text",name:"uname"}})]),a("div",{staticClass:"item"},[a("label",[t._v("password")]),a("input",{attrs:{type:"password",name:"upwd"}})]),a("div",{staticClass:"item"},[a("a",{staticClass:"btn_login",attrs:{href:"javascript:void(0)",onclick:""}},[t._v("register")])])])]),a("div",{staticClass:"cover"})])}];a.d(e,"a",function(){return o}),a.d(e,"b",function(){return s})},bf98:function(t,e,a){"use strict";var o=a("7777"),s=a.n(o);s.a},d4fa:function(t,e,a){},fc67:function(t,e,a){}});
//# sourceMappingURL=app.a11fcc82.js.map