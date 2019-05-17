<template>
  <div id="shou">
    <div class="bg"></div>
      <div class="content">
        <div class="zhong">
          <div class="shou2"><b>姓名：</b><span>{{obj.name}}</span></div>
          <div class="shou3"><b>电话：</b><span>{{obj.number}}</span></div>
          <div class="shou4"><b>积分：</b><span>{{obj.score}}</span></div>
          <!-- <router-link to='/hgoods' ><button class="shou5"><b>点击积分兑换</b></button></router-link> -->
        </div>
        <div class='shou6'>
          <div class="shou7">兑 换 纪 录</div>
          <div class="tu" >
              <div class='tu2' v-for='(items,index) in userShopArr' :key='index'> 
                <img :src="items.img" alt=""  ><br/>
                <b>{{items.title}}</b>
                <p>兑换积分{{items.Price}}</p>
                <P>兑换次数:{{items.num}}</P>
                <P>兑换时间:{{items.updatedAt}}</P>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { getMemberInfo, getGoodsInfo } from "../api/index.js";
export default {
  name: "",
  data() {
    return {
      res: [],
      obj: {},
      allShopArr:[],
      userShopArr:[],
      userId:''
    };
  },
  components: {},
  created(){
    
  },
  mounted() {
      getMemberInfo()
        .then(res => {
          this.users = res;
          for (let i = 0; i < this.users.length; i++) {
            if (
              JSON.stringify(this.users[i].name) ===
              localStorage.getItem("user")
            ) {
              this.obj = this.users[i];
            }
          }
        })
        .catch(err => {
          // console.log(err);
        });
        Bmob.Query('usershop').find().then(res=>{
          // console.log(res,'---',localStorage.getItem("userId"))
          this.allShopArr = res;
          this.allShopArr.map((item,index)=>{
            if(item.userId==localStorage.getItem("userId")){
              this.userShopArr.push(this.allShopArr[index])
            }
          })
          // console.log(this.userShopArr,'---')
          // this.getuser(this.userShopArr)
        })
  },
  methods: {}
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#shou {
  width: 100%;
  color: #fff;
  text-shadow: 0 0 3px #fff;
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
  /* opacity: 0.9; */
}
.content {
  width:100%;
  margin: auto;
}
#shou1 img {
  width: 30px;
}
.top {
  height: 80px;
  text-align: left;
  color: #fff;
  line-height: 80px;
}
.top p {
  font-size: 32px;
  font-weight: 600;
}
.zhong {
  width: 90%;
  height: 100px;
  margin:0 auto;
  padding-right: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  line-height: 100px;
  align-items: center;
}
.zhong div {
  height: 80px;
  text-align: left;
  line-height: 80px;
}
.zhong span {
  height: 80px;
  text-align: left;
  line-height: 80px;
}
.shou6 {
  width: 90%;
  height: auto;
  margin: 0 auto;
}
.shou7 {
  width: 100%;
  height: 30px;
  /* margin: 0 auto; */
  font-size: 20px;
  font-weight: 600;
  padding-top: 30px;
}
.tu {
  width: 100%;
  padding-top: 30px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* align-items: flex-start; */
}
.tu2:hover {
  box-shadow: 0 1px 3px rgba(225, 225, 225, 0.7),
    0 16px 32px -4px rgba(225, 225, 225, 0.6);
  transform: translateY(-1px);
}
.tu2 {
  width: 200px;
  height: 300px;
  text-align: center;
  margin-top: 10px;
  padding: 10px 15px;
  margin: 5px 10px;
  background: #fff;
  color: #333;
  font-size: 14px;
  border-radius: 10px;
}
.tu2 b {
  width: 100%;
  height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.tu2 img {
  width: 200px;
}
</style>
