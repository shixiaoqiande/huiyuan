(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-196a1adc"],{"100a":function(t,e,r){},"5d6b":function(t,e,r){var s=r("e53d").parseInt,n=r("a1ce").trim,i=r("e692"),a=/^[-+]?0[xX]/;t.exports=8!==s(i+"08")||22!==s(i+"0x16")?function(t,e){var r=n(String(t),3);return s(r,e>>>0||(a.test(r)?16:10))}:s},"5e2b":function(t,e,r){"use strict";var s=r("100a"),n=r.n(s);n.a},7445:function(t,e,r){var s=r("63b6"),n=r("5d6b");s(s.G+s.F*(parseInt!=n),{parseInt:n})},a1ce:function(t,e,r){var s=r("63b6"),n=r("25eb"),i=r("294c"),a=r("e692"),o="["+a+"]",c="​",u=RegExp("^"+o+o+"*"),l=RegExp(o+o+"*$"),p=function(t,e,r){var n={},o=i(function(){return!!a[t]()||c[t]()!=c}),u=n[t]=o?e(f):a[t];r&&(n[r]=u),s(s.P+s.F*o,"String",n)},f=p.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(l,"")),t};t.exports=p},b9e9:function(t,e,r){r("7445"),t.exports=r("584a").parseInt},cf05:function(t,e,r){t.exports=r.p+"img/logo.c1548184.png"},d2f8:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"a_inner"},[r("div",{staticClass:"bg"}),t._m(0),r("div",{staticClass:"a_banner"},[r("div",{staticClass:"a_user"},[r("p",[t._v("昵称："+t._s(t.name))]),r("p",[t._v("积分："+t._s(t.score))])]),r("div",{staticClass:"a_lo_img"})]),r("div",{staticClass:"a_line"},[t._v("超值兑换")]),r("div",{staticClass:"a_goods"},t._l(t.goods,function(e,s){return r("div",{key:s,staticClass:"a_goods-item"},[r("img",{attrs:{src:e.img,alt:""}}),r("div",{staticClass:"a_goods-text"},[r("p",{ref:"score",refInFor:!0,staticClass:"a_item-jifen"},[t.score>=e.Price?r("span",{staticClass:"a_jifen"},[t._v(t._s(e.Price))]):r("span",{staticClass:"a_no_jifen"},[t._v(t._s(e.Price))]),r("span",{staticClass:"a_jifen-text"},[t._v("积分")]),t.score<e.Price?r("span",{staticClass:"a_tips"},[t._v("不可兑换")]):t._e()]),r("p",{staticClass:"a_item-title"},[t._v(t._s(e.title))]),r("input",{ref:"inpNum",refInFor:!0,staticClass:"a_number",attrs:{type:"number",value:"1",min:"1",max:t.score/e.Price},on:{change:function(e){return t.getnum(s,e)}}}),t.score<e.Price?r("button",{staticClass:"a_btn a_no_btn"},[t._v("立即兑换")]):r("button",{staticClass:"a_btn",on:{click:function(r){return t.click(e.Price,s)}}},[t._v(" 立即兑换")])])])}),0)])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"a_headBox"},[s("div",{staticClass:"a_headBox_box"},[s("img",{attrs:{src:r("cf05"),alt:""}})])])}],i=(r("7f7f"),r("96cf"),r("3b8d")),a=(r("7514"),r("e814")),o=r.n(a),c=r("365c"),u={components:{},data:function(){return{name:null,score:0,userId:"",objectId:"",show:!1,goods:[],allShopArr:[],userShopArr:[],arr:[],period:0}},created:function(){this.getGoodInfo(),this.getMemberInfo(),this.getUserShop()},methods:{getnum:function(t,e){var r=o()(e.target.value);console.log(r,"NaN"=="".concat(r)),r<=0||"NaN"=="".concat(r)?this.$refs.inpNum[t].value=1:r>=Math.floor(this.score/this.goods[t].Price)&&(this.$refs.inpNum[t].value=Math.floor(this.score/this.goods[t].Price))},getUserShop:function(){var t=this;Bmob.Query("usershop").find().then(function(e){for(var r in t.allShopArr=e,t.allShopArr.map(function(e,r){e.userId==t.userId&&t.userShopArr.push(t.allShopArr[r])}),0==t.userShopArr.length&&t.getUserShop(),t.userShopArr)t.arr.push(t.userShopArr[r])})},getGoodInfo:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["d"])();case 2:e=t.sent,this.goods=e;case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getMemberInfo:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["e"])();case 2:e=t.sent,r=e.filter(function(t){return t.name==JSON.parse(localStorage.getItem("user"))})[0],this.objectId=r.objectId,this.name=r.name,this.score=r.score,this.userId=r.userId;case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),click:function(t,e){var r=this,s=!0;if(this.score>=t){alert("兑换成功"),this.score-=t*this.$refs.inpNum[e].value,Object(c["f"])(this.objectId,"score",this.score);var n=Bmob.Query("usershop");this.userShopArr.map(function(t,i){if(r.userShopArr[i].title==r.goods[e].title)return s=!1,r.userShopArr[i].num+=o()(r.$refs.inpNum[e].value),n.get(r.userShopArr[i].objectId).then(function(t){t.set("num",r.userShopArr[i].num),t.save()}),!1}),s&&(n.set("title",this.goods[e].title),n.set("img",this.goods[e].img),n.set("Price",o()(this.goods[e].Price)),n.set("num",1),n.set("userId",o()(this.userId)),n.save().then(function(t){console.log(t),r.arr.push({objectId:t.objectId,title:r.goods[e].title,num:1,Price:o()(r.goods[e].Price)}),r.userShopArr=r.arr}))}}}},l=u,p=(r("5e2b"),r("2877")),f=Object(p["a"])(l,s,n,!1,null,"03b69165",null);e["default"]=f.exports},e692:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},e814:function(t,e,r){t.exports=r("b9e9")}}]);
//# sourceMappingURL=chunk-196a1adc.5ea8ec89.js.map