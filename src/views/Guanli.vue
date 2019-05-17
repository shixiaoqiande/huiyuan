<template>
  <div class="guanli">
      <div class="top22">    
        <div class='div11'><input type="text" placeholder="管理员用户名" v-model='us'></div>
        <div class='div11'><input type="password" placeholder="密码" v-model='pw'></div> 
        <button class="a_goback" @click='aa'>登录</button>
      </div>
 </div>
</template>

<script>
import { getMemberInfo } from "../api/index.js";
import { constants } from "fs";
// import {getBanner} from "../api/index.js";
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
        .then(function(e) {
          return e;
        });
    };
    this.liutu = await bb();
  },
  methods: {
    aa() {
      if (this.us === "" || this.pw === "") {
        alert("请输入账号密码");
      }
      this.liutu.forEach((item, index) => {
        if (
          item.name === this.us &&
          item.number === this.pw &&
          item.isVip === 1
        ) {
          localStorage.setItem("user", JSON.stringify(this.us));
          localStorage.setItem("password", JSON.stringify(this.pw));
          localStorage.setItem("userId", JSON.stringify(item.userId));
          localStorage.setItem("isVip", JSON.stringify(item.isVip));
          this.$router.push("/admin/member");
          alert("登录成功");
          this.flag = false;
        }
        if (
          index === this.liutu.length - 1 &&
          this.flag &&
          this.us !== "" &&
          this.pw !== ""
        ) {
          alert("没有权限或账号密码不正确");
        }
      });
    }
  }
};
</script>
<style scoped>
.top22 {
  width: 400px;
  height: 400px;
  margin: 10px auto;
}
.top22 div {
  line-height: 80px;
  text-align: center;
  font-size: 18px;
}
.top22 input {
  width: 300px;
  height: 40px;
  border:0;
  border-bottom:3px solid #ddd;
  background: 0;
  text-align: center;
  font-size: 16px;
  color:#ddd;
}
.top22 input::-webkit-input-placeholder{
  color:#ddd;
  text-shadow: 0 0 2px #fff;
}
.top22 input:focus{
  outline: none;
}
.div11 {
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
