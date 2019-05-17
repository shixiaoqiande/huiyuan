<template>
<div class='admin'>
  <div class="bg"></div>
  <!-- <div class="title">管理员</div> -->
  <div class="mb_content">
    <div class="nav">
      <router-link :to="{name:'member'}" exact>会员信息</router-link>
      <router-link :to="{name:'mastergoods'}">商品信息</router-link> 
      <Logout />
    </div>
    <div class="con_page">
      <router-view/>
    </div>
  </div>
</div>
</template>

<script>
import Logout from './logout'
export default {
  components: {
    Logout
  },
  data() {
    return {};
  },
  beforeCreate() {
    if (localStorage.getItem("user")&&localStorage.getItem("isVip")==1) {
      // console.log(localStorage.getItem("isVip"))
      return true;
    } else {
      this.$router.replace("/");
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
.admin {
  width: 100%;
  height: 100%;
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
.title{
  line-height: 50px;
  color: #ffffff;
  padding:10px;
}
.mb_content{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.con_page{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.nav_box{
  width: 15%;
}
.nav{
  margin-top:50px;
  width: 15%;
}
.nav a{
  display: block;
  width: 100px;
  margin:20px 0;
  color:#fff;
  text-decoration: none;
  background: rgba(255, 255,255, .1);
  padding:0 10px;
  line-height: 50px;
  text-shadow: 0 0 2px #fff;
  transition: all .3s;
  border-radius:0 10px 10px 0;
}
.nav a.router-link-active{
  background: #E8F7F0;
  color:#333;
}

.nav a:hover{
  width: 110px;
  transition: all .3s;
  transform: translateY(-1px);
}
.con_page{
  flex: 1;
}
</style>