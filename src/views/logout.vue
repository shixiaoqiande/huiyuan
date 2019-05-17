<template>
    <div>
        <button @click="click">退出登录</button>
    </div>
</template>
<script>
export default {
    name:'logout',
    data(){
        return{

        }
    },
    methods:{
        click(){
            if(confirm('确定退出登陆吗？')){
                alert('确定')
                localStorage.clear();
                this.$router.replace({path:'/'})
                location.replace(location.pathname+"#/");
            }else{
                alert('取消')
            }
             
        }
    },
    mounted(){
       

    }
}
</script>
<style scoped>
button{
  display: block;
  color:#fff;
  background: rgba(255, 255,255, .1);
  padding:0 10px;
  line-height: 40px;
  text-shadow: 0 0 2px #fff;
  transition: all .3s;
  border-radius:0 7px 7px 0;
  border:0;
   cursor: pointer;
}

</style>


