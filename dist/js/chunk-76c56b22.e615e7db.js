(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76c56b22"],{"0a49":function(t,n,e){var i=e("9b43"),s=e("626a"),c=e("4bf8"),r=e("9def"),o=e("cd1c");t.exports=function(t,n){var e=1==t,a=2==t,u=3==t,d=4==t,f=6==t,l=5==t||f,h=n||o;return function(n,o,v){for(var g,m,p=c(n),b=s(p),y=i(o,v,3),x=r(b.length),_=0,C=e?h(n,x):a?h(n,0):void 0;x>_;_++)if((l||_ in b)&&(g=b[_],m=y(g,_,p),t))if(e)C[_]=m;else if(m)switch(t){case 3:return!0;case 5:return g;case 6:return _;case 2:C.push(g)}else if(d)return!1;return f?-1:u||d?d:C}}},1169:function(t,n,e){var i=e("2d95");t.exports=Array.isArray||function(t){return"Array"==i(t)}},"2e6d":function(t,n,e){"use strict";var i=e("58b8"),s=e.n(i);s.a},"365c":function(t,n,e){"use strict";e.d(n,"e",function(){return c}),e.d(n,"f",function(){return r}),e.d(n,"c",function(){return o}),e.d(n,"g",function(){return a}),e.d(n,"d",function(){return u}),e.d(n,"h",function(){return d}),e.d(n,"b",function(){return f}),e.d(n,"a",function(){return l});e("7514");var i=Bmob.Query("vipuser"),s=Bmob.Query("vipshop"),c=(Bmob.Query("usershop"),function(){return i.find()}),r=function(t,n,e){i.get(t).then(function(t){t.set(n,e),t.save()}).catch(function(t){})},o=function(t){i.destroy(t).then(function(t){}).catch(function(t){})},a=function(t,n,e){i.get(t).then(function(t){t.set(n,e),t.save()}).catch(function(t){})},u=function(){return s.find()},d=function(t,n,e){s.get(t).then(function(t){t.set(n,e),t.save()}).catch(function(t){})},f=function(t){s.destroy(t).then(function(t){}).catch(function(t){})},l=function(t,n,e){s.set("title",t),s.set("Price",n),s.set("img",e),s.save().then(function(t){}).catch(function(t){})}},"58b8":function(t,n,e){},7514:function(t,n,e){"use strict";var i=e("5ca1"),s=e("0a49")(5),c="find",r=!0;c in[]&&Array(1)[c](function(){r=!1}),i(i.P+i.F*r,"Array",{find:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),e("9c6c")(c)},"98d2":function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"masterGoods"},[e("div",{staticClass:"bg"}),t._m(0),e("div",{staticClass:"content"},[e("button",{staticClass:"addBtn",on:{click:t.addShowBtn}},[t._v("添加")]),e("ul",{staticClass:"content-ul"},[e("li",{ref:"addBox",staticClass:"content-list addOne"},[e("div",{staticClass:"addBox"},[e("p",{on:{click:t.addboxHidden}},[t._v("×")]),e("input",{ref:"thingName",attrs:{type:"text",placeholder:"物品名称 不得超过50个字符",maxlength:"50"}}),e("input",{ref:"thingPrice",attrs:{type:"text",placeholder:"物品价格"}}),e("input",{ref:"thingImg",attrs:{type:"text",placeholder:"网络图片地址"}}),e("button",{on:{click:t.addOne}},[t._v("确定添加")])])]),t._l(t.goodsList,function(n,i){return e("li",{key:i,staticClass:"content-list"},[e("img",{staticClass:"itemImg",attrs:{src:n.img,alt:""}}),e("div",{staticClass:"rightBox"},[e("label",{staticClass:"changeBox",on:{dblclick:function(n){return t.changeData(i,n)}}},[e("span",{staticClass:"itemTitle"},[t._v(t._s(n.title))]),e("span",{staticClass:"itemPrice"},[t._v(t._s(n.Price))]),t._v(" 积分币\n                        "),e("br"),e("span",{staticClass:"itemImg"},[t._v(t._s(n.img))])]),e("br"),e("button",{on:{click:function(n){return t.delGood(i)}}},[t._v("删 除")])])])})],2)])])},s=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"nav"},[e("h1",[t._v("商 品 操 作")])])}],c=e("365c"),r={data:function(){return{rightBox:"",goodsList:[]}},created:function(){var t=this;Object(c["d"])().then(function(n){t.goodsList=n.reverse()})},methods:{changeData:function(t,n){var e=this,i=(n=n||event,n.target);if("SPAN"==i.nodeName){var s=document.createElement("input");s.type="text";var r=i.innerHTML;i.innerHTML="",i.appendChild(s),s.style.width="100px",s.focus()}s.onblur=function(){var n=s.value;s.remove(),""!=s.value&&("itemPrice"==i.className&&Object(c["h"])(e.goodsList[t].objectId,"Price",n),"itemTitle"==i.className&&Object(c["h"])(e.goodsList[t].objectId,"title",n),"itemImg"==i.className&&(Object(c["h"])(e.goodsList[t].objectId,"img",n),e.goodsList[t].img=n)),i.innerHTML=""==n?r:n}},delGood:function(t){Object(c["b"])(this.goodsList[t].objectId),this.goodsList.splice(t,1)},addShowBtn:function(){this.$refs.addBox.style.display="block"},addOne:function(){if(""!=(this.$refs.thingName.value&&this.$refs.thingPrice.value&&this.$refs.thingImg.value)){var t={};t.title=this.$refs.thingName.value,t.Price=this.$refs.thingPrice.value,t.img=this.$refs.thingImg.value,this.goodsList.unshift(t),Object(c["a"])(this.$refs.thingName.value,this.$refs.thingPrice.value,this.$refs.thingImg.value)}else alert("请输入要添加的内容")},addboxHidden:function(){this.$refs.addBox.style.display="none"}}},o=r,a=(e("2e6d"),e("2877")),u=Object(a["a"])(o,i,s,!1,null,"8c983f82",null);n["default"]=u.exports},cd1c:function(t,n,e){var i=e("e853");t.exports=function(t,n){return new(i(t))(n)}},e853:function(t,n,e){var i=e("d3f4"),s=e("1169"),c=e("2b4c")("species");t.exports=function(t){var n;return s(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!s(n.prototype)||(n=void 0),i(n)&&(n=n[c],null===n&&(n=void 0))),void 0===n?Array:n}}}]);
//# sourceMappingURL=chunk-76c56b22.e615e7db.js.map