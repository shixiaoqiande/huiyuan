<template>
    <div class="masterGoods">
        <div class="nav">
            <h1>商品操作页</h1>
            <button @click="addShowBtn">添加</button>
        </div>
        <div class="content">
            <ul class="content-ul">
                <li class="content-list addOne" ref="addBox">
                    <!-- 添加新物品 -->
                    <div class="addBox">
                        <input type="text" placeholder="物品名称 不得超过50个字符" ref="thingName" maxlength="50">
                        <input type="text" placeholder="物品价格" ref="thingPrice">
                        <input type="text" placeholder="网络图片地址"  ref="thingImg">
                        <button @click="addOne">确定添加</button>
                    </div>
                </li>
                <li v-for="(item,index) in goodsList" :key="index" class="content-list">
                    <img :src="item.img" alt="" class="itemImg">
                    <div class="rightBox">
                        <label class="changeBox" @dblclick="changeData(index,$event)">
                            <span class="itemTitle">{{item.title}}</span>
                            <br>
                            <span class="itemPrice">{{item.Price}}</span> 积分币
                            <br>
                            <p>图片地址：</p>
                            <span class="itemImg">{{item.img}}</span>
                        </label>
                        <br>
                        <button @click="delGood(index)">删 除</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getMemberInfo,updateMemberInfo,deleteMemberInfo,addMemberInfo } from './../api'
export default {
    data() {
        return {
            rightBox:'',
            goodsList:[
                {
                    "id":1,
                    "title":"111",
                    "img":"http://img3.imgtn.bdimg.com/it/u=2181998829,1234134066&fm=26&gp=0.jpg",
                    "Price":30
                },{
                    "id":2,
                    "title":"222",
                    "img":"http://img3.imgtn.bdimg.com/it/u=2181998829,1234134066&fm=26&gp=0.jpg",
                    "Price":30
                },{
                    "id":3,
                    "title":"333",
                    "img":"http://img3.imgtn.bdimg.com/it/u=2181998829,1234134066&fm=26&gp=0.jpg",
                    "Price":30
                },{
                    "id":3,
                    "title":"444",
                    "img":"http://img3.imgtn.bdimg.com/it/u=2181998829,1234134066&fm=26&gp=0.jpg",
                    "Price":30
                },{
                    "id":3,
                    "title":"555",
                    "img":"http://img3.imgtn.bdimg.com/it/u=2181998829,1234134066&fm=26&gp=0.jpg",
                    "Price":30
                },{
                    "id":3,
                    "title":"666",
                    "img":"http://img3.imgtn.bdimg.com/it/u=2181998829,1234134066&fm=26&gp=0.jpg",
                    "Price":30
                }
            ]
        }
    },
    created () {
        getMemberInfo().then((res)=>{
            this.goodsList = res.reverse()
            // console.log(res)
        })
    },
    methods:{
        changeData(index,e){
            var e = e || event;
            var obj = e.target;
            if(obj.nodeName == 'SPAN'){
                var ipt = document.createElement('input');
 			    ipt.type = 'text';
                var con = obj.innerHTML;
 			    obj.innerHTML = '';
 			    obj.appendChild(ipt);
 			    ipt.style.width = '100px';
                ipt.focus(); // 聚焦 
            }
            ipt.onblur = ()=>{
                var value = ipt.value;
                ipt.remove();
                console.log(this.goodsList[index].objectId)
                if(ipt.value != ""){
                    if(obj.className == "itemPrice"){
                        updateMemberInfo(this.goodsList[index].objectId,"Price",value)
                    }
                    if(obj.className == "itemTitle"){
                        updateMemberInfo(this.goodsList[index].objectId,"title",value)
                    }
                    if(obj.className == "itemImg"){
                        updateMemberInfo(this.goodsList[index].objectId,"img",value)
                        this.goodsList[index].img = value
                    }
                }
                // tr的值是否为空 是空的话就还是以前的数 不是空就是新写的数
                obj.innerHTML = value == '' ? con : value;
            }
        },
        delGood(index){
            // console.log(this.goodsList[index].objectId)
            deleteMemberInfo(this.goodsList[index].objectId)
            this.goodsList.splice(index,1)
        },
        addShowBtn(){
            this.$refs.addBox.style.display = "block"
        },
        addOne(){
            if((this.$refs.thingName.value && this.$refs.thingPrice.value && this.$refs.thingImg.value) != ''){
                var goodsListAdd = {}
                // console.log(this.$refs.thingName.value)
                goodsListAdd.title = this.$refs.thingName.value;
                goodsListAdd.Price = this.$refs.thingPrice.value;
                goodsListAdd.img = this.$refs.thingImg.value;
                this.goodsList.unshift(goodsListAdd)
                // this.$refs.addBox.style.display = "none"
                // var objectid = Math.random()*10000
                addMemberInfo(this.$refs.thingName.value,this.$refs.thingPrice.value,this.$refs.thingImg.value)
                location.reload()
            } else {
                alert("请输入要添加的内容")
            }
        }
    }
}
</script>
<style scoped>
.masterGoods{
    width: 100%;
}
.nav{
    height: 70px;;
    margin:20px 0;
    background: #ddd;
    position: relative;
}
.nav h1{
    line-height: 70px;
    color:#555;
}
.nav button{
    position: absolute;
    bottom:7px;
    right:20%;
    background: #93C4F2;
    border:0;
    width: 50px;
    height: 25px;
    color:#fff;
    border-radius: 10px;
}
.content{
    width: 1200px;
    height: auto;
    display: inline-block;
    margin:0 auto;
}
.content-list{
    width: 900px;
    height: 150px;
    background: #eee;
    margin:auto;
    margin-bottom:25px;
    padding:20px;
    overflow: hidden;
    border:1px solid #fff;
    border-radius: 10px;
    font-size: 14px;
}
.content-list:hover{
    border:1px solid #000;
}
.content-list img{
    width: 150px;
    height: 150px;
    float: left;
    overflow: hidden;
}
.content-list .rightBox{
    width: 720px;
    height: 100%;
    float: right;
    text-align: left;
    position: relative;
}
.content-list .rightBox span{
    line-height: 30px;
    display: inline-block;
}
.content-list .rightBox span:nth-child(1){
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 16px;
}
.content-list .rightBox p{
    float: left;
    vertical-align: center;
    line-height: 30px;
}
.content-list .rightBox span.itemImg{
    float: left;
    vertical-align: center;
    white-space:nowrap;
    overflow: hidden;
    width: 600px;
    text-overflow:ellipsis; 
}
.content-list .rightBox button{
    width: 50px;
    height: 25px;
    background: #93C4F2;
    border:0;
    color:#fff;
    border-radius: 10px;
    position: absolute;
    right: 20px;
    bottom: 0;
}

.addOne{
    display: none;
}
.addOne .addBox input{
    width: 300px;
    padding:0 10px;
    height: 25px;
    display: block;
    margin:10px auto;
}
.addOne .addBox .addImg{
    padding:0;
}
.addOne .addBox button{
    width: 100px;
    height: 25px;
    background: #93C4F2;
    border:0;
    color:#fff;
    border-radius: 10px;
    margin:auto;
}
</style>


