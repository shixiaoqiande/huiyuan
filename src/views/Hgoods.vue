<template>
<div class='a_inner'>
  <div class="bg"></div>
  <!-- 头部logo图 -->
  <div class="a_headBox">
    <div class="a_headBox_box">
      <img src="../assets/logo.png" alt="">
      <!-- <router-link to="/shou"><button class="a_goback">返回会员信息</button></router-link> -->
    </div>
  </div>
  <!-- 用户状态信息+banner图 -->
  <div class="a_banner">    
    <div class="a_user">
        <p>昵称：{{name}}</p>
        <p>积分：{{score}}</p>
      </div>
    <div class="a_lo_img"></div>
  </div>
  <!-- 超值兑换 -->
  <div class="a_line">超值兑换</div>
  <!-- 商品 -->
  <div class="a_goods">
    <div v-for="(item,index) in goods" :key="index" class="a_goods-item">
      <!-- 商品图片 -->
      <img :src="item.img" alt="">
      <!-- 商品信息 -->
      <div class="a_goods-text">
        <p class="a_item-jifen" ref="score">
          <span v-if="score>=item.Price" class="a_jifen">{{item.Price}}</span>
          <span v-else class="a_no_jifen">{{item.Price}}</span>
          <span class="a_jifen-text">积分</span>
          <span v-if="score<item.Price" class="a_tips">不可兑换</span>
        </p>
        <p class="a_item-title">{{item.title}}</p>
          <!-- <input class="a_number" type="number" value="1" min="1" max="999999" v-model="period" ref="inpNum"/> -->
          <input class="a_number" type="number" @change="getnum(index,$event)" value="1" min="1" :max="score/item.Price" ref="inpNum"/>
          <button v-if="score<item.Price" class="a_btn a_no_btn" >立即兑换</button>
          <button v-else @click="click(item.Price,index)" class="a_btn"> 立即兑换</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  getMemberInfo,
  getGoodsInfo,
  resetMemberInfo,
  updateGoodsInfo,
  everyUserShop
} from "../api";
export default {
  components: {},
  data() {
    return {
      name: null,
      score: 0,
      userId: "",
      objectId: "",
      show: false,
      goods: [],
      allShopArr: [],
      userShopArr: [],
      arr: [],
      period:0
    };
  },

  created() {
    // 初始化数据
    this.getGoodInfo();
    this.getMemberInfo();
    this.getUserShop();
  },
  // watch: {
  //   period(newVal){
  //     if(newVal<0){
  //       this.period = 1;
  //     }
  //   }
  // },
  methods: {
    getnum(index,e){
      var value = parseInt(e.target.value)
      console.log(value,`${value}`=='NaN')
      if((value<=0)||`${value}`=='NaN'){
        this.$refs.inpNum[index].value = 1
      }else if (value >= Math.floor(this.score / this.goods[index].Price)) {
        this.$refs.inpNum[index].value = Math.floor(
          this.score / this.goods[index].Price
        );
      };
    },
    getUserShop() {
      Bmob.Query("usershop")
        .find()
        .then(res => {
          this.allShopArr = res;
          this.allShopArr.map((item, index) => {
            if (item.userId == this.userId) {
              this.userShopArr.push(this.allShopArr[index]);
            }
          });
          if (this.userShopArr.length == 0) {
            this.getUserShop();
          }
          for (var i in this.userShopArr) {
            this.arr.push(this.userShopArr[i]);
          }
        });
    },
    async getGoodInfo() {
      let arr = await getGoodsInfo();
      this.goods = arr;
    },
    async getMemberInfo() {
      let arr = await getMemberInfo();
      let user = arr.filter(
        item => item.name == JSON.parse(localStorage.getItem("user"))
      )[0];
      this.objectId = user.objectId;
      this.name = user.name;
      this.score = user.score;
      this.userId = user.userId;
    },
    click(price, index) {
      var flag = true;
      if (this.score >= price) {
        alert("兑换成功");
        this.score -= price*this.$refs.inpNum[index].value;
        resetMemberInfo(this.objectId, "score", this.score);
        var usershop = Bmob.Query("usershop");
        this.userShopArr.map((item, indexs) => {
          if (this.userShopArr[indexs].title == this.goods[index].title) {
            flag = false;
            this.userShopArr[indexs].num += parseInt(
              this.$refs.inpNum[index].value
            );
            usershop.get(this.userShopArr[indexs].objectId).then(res => {
              res.set("num", this.userShopArr[indexs].num);
              res.save();
            });
            return false;
          }
        });
        if (flag) {
          usershop.set("title", this.goods[index].title);
          usershop.set("img", this.goods[index].img);
          usershop.set("Price", parseInt(this.goods[index].Price));
          usershop.set("num", 1);
          usershop.set("userId", parseInt(this.userId));
          usershop.save().then(res => {
            console.log(res);
            this.arr.push({
              objectId: res.objectId,
              title: this.goods[index].title,
              num: 1,
              Price: parseInt(this.goods[index].Price)
            });
            // console.log(this.arr[this.arr.length-1].title,"--------");
            this.userShopArr = this.arr;
            // console.log(this.userShopArr[this.userShopArr.length-1],"--------");
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.a_inner {
  max-width: 90%;
  margin: 0 auto;
}
.bg {
  width: 100%;
  height: 100%;
  background: url(../assets/bg1.jpg) center no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
/* 头部logo */
.a_headBox {
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
.a_headBox_box {
  max-width: 1248px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.a_goback {
  float: right;
  padding: 5px;
  border: 1px solid #f1f1f1;
  background-color: #f1f1f1;
  border-radius: 4px;
  cursor: pointer;
}
/* banner大盒子 */
.a_banner {
  max-width: 1248px;
  margin: 0 auto;
  display: flex;
  box-shadow: 0 0 32px rgba(225, 225, 225, 0.6);
  transform: translateY(-1px);
}
/* banner用户信息部分 */
.a_user {
  width: 10%;
  padding: 20px 10px 20px 20px;
  line-height: 30px;
  font-size: 12px;
  background: #f5f5f5;
}
/* banner背景图 */
.a_lo_img {
  flex: 1;
  width: 100%;
  height: 360px;
  background: url(../assets/bgLogo.png) center no-repeat;
  background-size: 100% 100%;
}
/* 超值兑换标题 */
.a_line {
  position: relative;
  padding: 20px 0;
  text-align: center;
  font-size: 16px;
  color: #ddd;
}
/* 超值兑换标题左边直线 */
.a_line::before {
  display: block;
  position: absolute;
  top: 28px;
  width: 44%;
  content: "";
  border-top: 1px solid #ededed;
}
/* 超值兑换标题右边直线 */
.a_line::after {
  display: block;
  position: absolute;
  top: 28px;
  right: 0;
  width: 44%;
  content: "";
  border-top: 1px solid #ededed;
}
/* 商品大盒子 */
.a_goods {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
/* 每个商品div */
.a_goods-item {
  width: 210px;
  margin: 10px 0;
  background: #fff;
  padding: 20px;
}
.a_goods-item:hover {
  box-shadow: 0 1px 3px rgba(225, 225, 225, 0.7),
    0 16px 32px -4px rgba(225, 225, 225, 0.6);
  transform: translateY(-1px);
}
/* 每个商品的图片 */
.a_goods-item img {
  width: 100%;
  height: 220px;
  cursor: pointer;
  border: 1px solid #eee;
}
/* 每个商品盒子的下半部分 */
.a_goods-text {
  width: 100%;
}
/* 积分数字样式 */
.a_goods-text p:nth-child(1) {
  margin: 5px;
  font-weight: 700;
  font-size: 20px;
}
/* 积分数字默认样式 */
.a_jifen {
  color: red;
}
/* 积分不足样式 */
.a_no_jifen {
  color: #ccc;
}
/* “积分”字体样式 */
.a_jifen-text {
  font-size: 12px;
  color: #aaa;
  margin-left: 5px;
}
/* “不可兑换”样式 */
.a_tips {
  font-size: 12px;
  float: right;
  background: #ccc;
  color: #fff;
  border-radius: 2px;
  padding: 2px 5px;
}
/* 商品标题 */
.a_item-title {
  width: 100%;
  height: 40px;
  margin: 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font: 14px tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "\u5b8b\u4f53",
    sans-serif;
  cursor: pointer;
}
.a_item-title:hover {
  color: #e4393c;
}
.a_item_box {
  width: 100%;
  height: 50px;
}
.a_number {
  width: 30%;
  height: 24px;
  outline: none;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}
/* “立即兑换”按钮 */
.a_btn {
  width: 90px;
  height: 29px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  background: #46c95e;
  border: 0;
  border-radius: 5px;
  outline: none;
  float: right;
  cursor: pointer;
}
/* 积分不足时，“立即兑换”按钮样式 */
.a_no_btn {
  background: #ccc;
  border: 1px solid #ccc;
  cursor: auto;
}
button:hover {
  opacity: 0.8;
}
</style>