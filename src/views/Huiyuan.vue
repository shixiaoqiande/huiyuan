<template>
  <div class="about">
      <div class="top2">
        <div class='div1'><input type="text" placeholder="会员用户名" autofocus='true' v-model='us'></div>
        <div  class='div1'><input type="password" placeholder="密码" v-model='pw'></div> 
        <button class="a_goback" @click='aa'>会员登录</button>
      </div>
  </div>
</template>
<script>
import { getMemberInfo } from "../api/index.js";
import { constants } from "fs";
export default {
  name: "HelloWorld",
  data() {
    return {
      us: "",
      pw: "",
      liutu: [],
      flag: true
    };
  },
  async mounted() {
    let bb = () => {
      return Bmob.Query("vipuser")
        .find()
        .then((e)=> {
          return e;
        });
    };
    this.liutu = await bb();
    // console.log(this.liutu  )
  },
  methods: {
    aa() {
      if (this.us === "" || this.pw === "") {
        alert("请输入账号密码");
      }
      this.liutu.forEach((item, index) => {
        if (item.name === this.us && item.number === this.pw) {
          localStorage.setItem("user", JSON.stringify(this.us));
          localStorage.setItem("password", JSON.stringify(this.pw));
          localStorage.setItem("userId", JSON.stringify(item.userId));
          localStorage.setItem("isVip", JSON.stringify(item.isVip));
          this.$router.push("/mb/shou");
          alert("登录成功");
          this.flag = false;
        }
        if (
          index === this.liutu.length - 1 &&
          this.flag &&
          this.us !== "" &&
          this.pw !== ""
        ) {
          alert("账号或密码不正确");
        }
      });
    }
  }
};
</script>

<style scoped>
.top2 {
  width: 400px;
  height: 400px;
  margin: 10px auto;
}
.top2 div {
  line-height: 80px;
  text-align: center;
  font-size: 18px;
}
.top2 input{
  width: 300px;
  height: 40px;
  border:0;
  border-bottom:3px solid #ddd;
  /* box-shadow: 0 0 2px #fff; */
  background: 0;
  text-align: center;
  font-size: 16px;
  color:#ddd;
}
.top2 input::-webkit-input-placeholder{
  color:#ddd;
  text-shadow: 0 0 2px #fff;
}
.top2 input:focus{
  outline: none;
}
.div1 {
  width: 400px;
  height: 100px;
}
button {
  width: 200px;
  height: 45px;
  font-size: 20px;
  border:0;
  background: #DAF3EC;
  border-radius: 20px;
  margin:10px auto 0;
  cursor: pointer;
}
button:hover{
  box-shadow: 0 0 30px rgba(225,225,225,.6);
  transform: translateY(-1px);
}
</style>