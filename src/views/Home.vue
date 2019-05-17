<template>
  <div id="app">
    <div id="nav">
      <h1>欢 迎 登 陆</h1>
      <div class="bon">
         <router-link :to="{name:'huiyuan'}" exact><span class="hui">会员</span></router-link>
         <router-link :to="{name:'guanli'}"> <span class="guan">管理员</span></router-link> 
      </div>
      <div class="xia">
          <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
 
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  background: url(../assets/bg1.jpg) center no-repeat;
  background-size: cover;
  overflow: hidden;
}
#nav {
  width: 500px;
  height: 500px;
  margin: 50px auto 0;
  text-align: center;
  padding-top: 10px;
  overflow: hidden;
}
#nav h1{
  color:#fff;
  /* margin:20px 0; */
  text-shadow: 0 0 3px #fff;
}
.bon {
  width: 80%;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  margin:50px auto 0;
}
.bon a {
  display: inline-block;
  width: 150px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  border: 1px solid skyblue;
  border-radius: 10px;
  color: #fff;
  /* background: #BBE6D6; */
}
.bon a.router-link-active{
  background: #E8F7F0;
  color:#333;
}
.bon a:hover {
  background: #E8F7F0;
  color:#333;
  box-shadow: 0 0 30px rgba(225,225,225,.6);
  transform: translateY(-1px);
}

.xia {
  width: 100%;
  height: 400px;
  margin-top:20px;
}
</style>
