(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"344d":function(t,a,s){"use strict";s("4f05")},"4f05":function(t,a,s){},bb51:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"mb-9"},[s("div",{staticClass:"mb-7"},[s("div",{staticClass:"bgImg d-flex jc-center",attrs:{id:"header"}},[t._m(0),s("div",{staticClass:"arrow-down"},[s("i",{staticClass:"iconfont icon-down",on:{click:t.downPage}})])])]),s("div",{staticClass:"post-container d-flex flex-wrap jc-center ai-center"},t._l(t.articles,(function(a,i){return s("div",{key:i},[s("div",{staticClass:"show home-art"},[s("router-link",{staticClass:"top mt-10 mx-8 mb-0 hand",style:{"background-image":"url("+a.icon+")"},attrs:{tag:"div",to:"/article/list/"+a._id}}),s("div",{staticClass:"bg-postcolor pt-8 mx-8 title"},[s("router-link",{staticClass:"fs-xxl jc-center d-flex flex-wrap hand text-grey-1",attrs:{tag:"span",to:"/article/list/"+a._id}},[t._v(" "+t._s(a.title)+" ")]),s("div",{staticClass:"d-flex mt-4 p-7 text-grey-1"},[s("i",{staticClass:"iconfont icon-riqi2 pr-2"}),s("span",{staticClass:"fs-sm"},[t._v(" "+t._s(t._f("date")(a.createdAt,"YYYY-MM-DD"))+" ")]),s("i",{staticClass:"iconfont icon-sort pl-9"}),s("router-link",{staticClass:"fs-sm pl-2 mr-6 hand",attrs:{tag:"span",to:"/tags"}},[t._v(" article.categories[0].name ")]),s("i",{staticClass:"iconfont icon-love text-red hand"})],1)],1)],1)])})),0),t.articles.length>0?s("div",{staticClass:"my-10"},[s("div",{staticClass:"page-navigator d-flex jc-center"},[s("div",{staticClass:"mx-4 hand fs-md",class:{current:1==t.pagination.currentPage}},[s("a",{attrs:{"data-hover":"首页"},on:{click:function(a){return t.goToPage(1)}}},[s("span",{staticClass:"text-grey-1"},[t._v("首页")])])]),s("div",{staticClass:"mx-4 hand fs-md"},[s("a",{on:{click:function(a){return t.prev()}}},[s("span",{staticClass:"text-grey-1"},[t._v("«")])])]),t._l(t.pagination.totalPage,(function(a){return s("div",{key:a,staticClass:"mx-4 hand fs-md",class:{current:a==t.pagination.currentPage}},[s("a",{staticClass:"text-grey-1",attrs:{"data-hover":a},on:{click:function(s){return t.goToPage(a)}}},[t._v(" "+t._s(a)+" ")])])})),s("div",{staticClass:"mx-4 hand fs-md"},[s("a",{on:{click:function(a){return t.next()}}},[s("span",{staticClass:"text-grey-1"},[t._v("»")])])]),s("div",{staticClass:"mx-4 hand fs-md",class:{current:t.pagination.totalPage==t.pagination.currentPage}},[s("a",{attrs:{"data-hover":"末页"},on:{click:function(a){return t.goToPage(t.pagination.totalPage)}}},[s("span",{staticClass:"text-grey-1"},[t._v("末页")])])]),s("div",{staticClass:"current mx-4 fs-md"},[s("span",{staticClass:"text-grey-1"},[t._v(" 第"+t._s(t.pagination.currentPage)+"页 / 共"+t._s(t.pagination.totalPage)+"页 ")])])],2)]):t._e()])},e=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"text-white d-flex jc-center ai-center"},[s("span",{staticClass:"shouye-text"},[t._v("欢迎来到硬件趣玩")]),s("span",{staticClass:"line-down pl-3"},[t._v("_")])])}],n=s("a59b"),c=s.n(n),r={data(){return{articles:[],pagination:{totalPage:1,currentPage:1}}},methods:{async fetchData(){const t=await this.$http.get("/articles/"+this.pagination.currentPage);this.articles=t.data.list,this.pagination.totalPage=t.data.totalPage,this.pagination.currentPage=t.data.currentPage},async goToPage(t){this.pagination.currentPage=t,this.fetchData()},prev(){1!=this.pagination.currentPage&&(this.pagination.currentPage--,this.fetchData())},next(){this.pagination.currentPage!=this.pagination.totalPage&&(this.pagination.currentPage++,this.fetchData())},downPage(){c()("html,body").animate({scrollTop:c()("#header").outerHeight()-56},500)}},mounted(){this.fetchData()}},o=r,l=(s("344d"),s("d34b")),d=Object(l["a"])(o,i,e,!1,null,"7a2dfefd",null);a["default"]=d.exports}}]);