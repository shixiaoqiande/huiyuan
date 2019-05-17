<template>
    <div class="masterGoods">
      <div class="bg"></div>
        <div class="nav">
            <h1>商 品 操 作</h1>
        </div>
        <div class="content">
            <button @click="addShowBtn" class="addBtn">添加</button>
            <ul class="content-ul">
                <li class="content-list addOne" ref="addBox">
                    <!-- 添加新物品 -->
                    <div class="addBox">
                        <p @click="addboxHidden">×</p>
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
                            <!-- <br> -->
                            <span class="itemPrice">{{item.Price}}</span> 积分币
                            <br>
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
import {
  getGoodsInfo,
  updateGoodsInfo,
  deleteGoodsInfo,
  addGoodsInfo
} from "../api";
export default {
  data() {
    return {
      rightBox: "",
      goodsList: []
    };
  },
  created() {
    getGoodsInfo().then(res => {
      this.goodsList = res.reverse();
    });
  },
  methods: {
    changeData(index, e) {
      var e = e || event;
      var obj = e.target;
      if (obj.nodeName == "SPAN") {
        var ipt = document.createElement("input");
        ipt.type = "text";
        var con = obj.innerHTML;
        obj.innerHTML = "";
        obj.appendChild(ipt);
        ipt.style.width = "100px";
        ipt.focus(); // 聚焦
      }
      ipt.onblur = () => {
        var value = ipt.value;
        ipt.remove();
        // console.log(this.goodsList[index].objectId);
        if (ipt.value != "") {
          if (obj.className == "itemPrice") {
            updateGoodsInfo(this.goodsList[index].objectId, "Price", value);
          }
          if (obj.className == "itemTitle") {
            updateGoodsInfo(this.goodsList[index].objectId, "title", value);
          }
          if (obj.className == "itemImg") {
            updateGoodsInfo(this.goodsList[index].objectId, "img", value);
            this.goodsList[index].img = value;
          }
        }
        // tr的值是否为空 是空的话就还是以前的数 不是空就是新写的数
        obj.innerHTML = value == "" ? con : value;
      };
    },
    delGood(index) {
      // console.log(this.goodsList[index].objectId)
      deleteGoodsInfo(this.goodsList[index].objectId);
      this.goodsList.splice(index, 1);
    },
    addShowBtn() {
      this.$refs.addBox.style.display = "block";
    },
    addOne() {
      if (
        (this.$refs.thingName.value &&
          this.$refs.thingPrice.value &&
          this.$refs.thingImg.value) != ""
      ) {
        var goodsListAdd = {};
        // console.log(this.$refs.thingName.value)
        goodsListAdd.title = this.$refs.thingName.value;
        goodsListAdd.Price = this.$refs.thingPrice.value;
        goodsListAdd.img = this.$refs.thingImg.value;
        this.goodsList.unshift(goodsListAdd);
        // this.$refs.addBox.style.display = "none"
        // var objectid = Math.random()*10000
        addGoodsInfo(
          this.$refs.thingName.value,
          this.$refs.thingPrice.value,
          this.$refs.thingImg.value
        );
        // location.reload();
      } else {
        alert("请输入要添加的内容");
      }
    },
    addboxHidden(){
      this.$refs.addBox.style.display = "none"
    }
  }
};
</script>
<style scoped>
.masterGoods {
  width: 100%;
}
.bg{
  width: 100%;
  height: 100%;
  background: url(../assets/bg1.jpg) center no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.nav {
  width: 80%;
  height: 70px;
  margin: 20px auto;
  position: relative;
  text-align: center;
}
.nav h1 {
  width: 100%;
  margin:auto;
  line-height: 70px;
  color: #fff;
  text-shadow: 0 0 3px #fff;
}
.nav a button {
  position: absolute;
  bottom: 7px;
  right: 20px;
  background: #93c4f2;
  border: 0;
  width: 100px;
  height: 25px;
  color: #fff;
  border-radius: 10px;
}
.content {
  width: 80%;
  margin: auto;
}
.content .addBtn{
  float: right;
  margin:20px;
  background: #93c4f2;
  border: 0;
  width: 100px;
  height: 25px;
  color: #fff;
  border-radius: 10px;
}
.content-list {
  width:95%;
  height: 150px;
  background: rgba(0,0,0,0.3);
  color:#fff;
  margin: auto;
  margin-bottom: 25px;
  padding: 20px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.content-list:hover {
  /* box-shadow: 0 1px 3px rgba(225,225,225,.7), 0 16px 32px -4px rgba(225,225,225,.6);
  transform: translateY(-1px);
  background: rgba(0,0,0,0.7); */
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-1px);
}
.content-list img {
  width: 18%;
  height: 150px;
  overflow: hidden;
}
.content-list .rightBox {
  width: 80%;
  height: 100%;
  position: relative;
}
.content-list .rightBox span {
  width: 100%;
  line-height: 25px;
  display: inline-block;
}
.content-list .rightBox span:nth-child(1) {
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.content-list .rightBox span.itemPrice{
  display: inline;
}
.content-list .rightBox span.itemImg {
  white-space: nowrap;
  overflow: hidden;
  width: 600px;
  text-overflow: ellipsis;
}
.content-list .rightBox button {
  width: 50px;
  height: 25px;
  background: #93c4f2;
  border: 0;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  right: 20px;
  bottom: 0;
}

.addOne {
  display: none;
  text-align: center;
  position: relative;
}
.addOne .addBox input {
  width: 300px;
  padding: 0 10px;
  height: 25px;
  display: block;
  margin: 10px auto;
}
.addOne .addBox p{
  position: absolute;
  top:15px;
  right: 20px;
  font-size: 28px;
  cursor: pointer;
  transition: all .5s;
}
.addOne .addBox p:hover{
  transform: rotate(180deg);
  transition: all .5s;
}
.addOne .addBox .addImg {
  padding: 0;
}
.addOne .addBox button {
  width: 100px;
  height: 25px;
  background: #93c4f2;
  border: 0;
  color: #fff;
  border-radius: 10px;
}
</style>


