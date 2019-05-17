<template>
    <div class="c_member">
        <div class="bg"></div>
        <div class="c_inner">
            <!-- 标题 -->
            <div class="c_title">
                会 员 管 理 
                <!-- 提示 -->
                <p class="tip">双击修改信息 ! 信息存在或错误文字会变红O ！</p>
                <!-- 搜索 -->
                <input class="c_sousuo" type="text" placeholder="搜索会员名/手机号" @input="inpChange">
                <!-- <router-link to="/mastergoods"><button class="a_goback">管理商品信息</button></router-link> -->
            </div>
            <!-- 信息导航 -->
            <div class="c_infonav">
                <p>姓名</p>
                <p>电话</p>
                <p>积分</p>
                <p>设置管理员</p>
                <p @click="addvip">增加</p>
            </div>
            <!-- 增加会员 -->
            <div class="c_add" ref="c_add">
                <!-- 点击c_add消失 -->
                <div class="c_addmove" @click="addmove"></div>
                <!-- 增加会员 -->
                <div class="c_addinner">
                    <span>{{nameP}}</span>
                    <input type="text" @blur="getName($event)" placeholder="请输入会员名" />
                    <span>{{numberP}}</span>
                    <input type="text" @blur="getNum($event)" placeholder="请输入手机号" />
                    <span>{{scoreP}}</span>
                    <input type="text" @blur="getScore($event)" placeholder="请输入会员积分" />
                    <!-- sureAdd 确认增加 -->
                    <button @click="sureAdd">确认增加</button>
                </div>
            </div>
            <!-- 信息盒子 -->
            <div class="c_infoitem" ref="c_infoitem" v-for="(item,index) in vipinfoArr" :key="index">
                <!-- 会员名 -->
                <div class="c_infoname">
                    <!-- 点击修改信息事件 -->
                    <span @dblclick="changeName(index)" class="c_info" ref="c_info_name">{{item.name}}</span>
                    <span class="c_change" ref="c_change_name">
                        <!-- 修改信息事件 -->
                        <input ref="name_inp" type="text" @blur="getNewName(index,$event)" @keydown="enters" />
                    </span>
                </div>
                <!-- 会员手机号 -->
                <div class="c_infonumber">
                    <span @dblclick="changeNum(index,$event)" class="c_info" ref="c_info_num">{{item.number}}</span>
                    <span class="c_change" ref="c_change_num">
                        <input ref="num_inp" type="text" @blur="getNewNum(index,$event)" @keydown="enters" />
                    </span>
                </div>
                <!-- 会员积分 -->
                <div class="c_infoscore">
                    <span @dblclick="changeScore(index,$event)" class="c_info" ref="c_info_score">{{item.score}}</span>
                    <span class="c_change" ref="c_change_score">
                        <input ref="score_inp" type="text" @blur="getNewScore(index,$event)" @keydown="enters" />
                    </span>
                </div>
                <!-- 管理员设置 -->
                <div @dblclick="setVipUser(index)" ref="setVip" style="cursor: pointer;">{{item.isVip==1?'取消管理员':'设为管理员'}}</div>
                <!-- 删除会员 -->
                <div class="c_infomove" v-if="item.isVip==1" style="color:gray;">删除</div>
                <div class="c_infomove" @click="moveVip(index)" v-else>删除</div>
            </div>
        </div>
    </div>
</template>
<script>
import {
  getMemberInfo,
  addMemberInfo,
  deleteMemberInfo,
  resetMemberInfo,
  setVip
} from "../api";
export default {
  data() {
    return {
      // 存放会员信息数组
      vipinfoArr: [],
      // 存放增加的 name
      name: "",
      // 存放增加的 number
      number: "",
      // 存放增加的 score
      score: "",
      // name 错误提示
      nameP: "",
      // number 错误提示
      numberP: "",
      // score 错误提示
      scoreP: "",
      xin: [],
      isVipText: "",
      ischangeVip: false
    };
  },
  created() {
    // 初始化数据
    this.getInfo();
  },
  methods: {
    // 设为管理员
    setVipUser(index) {
      if (this.vipinfoArr[index].isVip == 1) {
        this.$refs.setVip[index].innerHTML = "设为管理员";
        setVip(this.vipinfoArr[index].objectId, "isVip", 0);
        this.vipinfoArr[index].isVip = 0;
        // console.log(this.vipinfoArr[index].isVip, "++++");
      } else {
        this.$refs.setVip[index].innerHTML = "取消管理员";
        setVip(this.vipinfoArr[index].objectId, "isVip", 1);
        this.vipinfoArr[index].isVip = 1;
        // console.log(this.vipinfoArr[index].isVip, "----");
      }
    },
    // 获取用户信息
    async getInfo() {
      let arr = await getMemberInfo();
      this.vipinfoArr = arr;
      for (var i in this.vipinfoArr) {
        this.xin.push(this.vipinfoArr[i]);
      }
    },
    // 初始化信息
    initinfo(c_change, c_info) {
      for (var i = 0; i < this.$refs.c_change_name.length; i++) {
        this.$refs.c_change_name[i].style.display = "none";
        this.$refs.c_info_name[i].style.display = "block";
        this.$refs.c_change_num[i].style.display = "none";
        this.$refs.c_info_num[i].style.display = "block";
        this.$refs.c_change_score[i].style.display = "none";
        this.$refs.c_info_score[i].style.display = "block";
      }
    },
    // 删除会员
    moveVip(index) {
      this.$refs.c_infoitem[index].remove();
      // console.log(this.c_infoitem, this.vipinfoArr);
      deleteMemberInfo(this.vipinfoArr[index].objectId);
      this.xin.slice(index,1)
    },
    // 点击修改 name 事件
    changeName(index) {
      this.initinfo();
      this.$refs.c_change_name[index].style.display = "block";
      this.$refs.c_info_name[index].style.display = "none";
      this.$refs.name_inp[index].value = this.$refs.c_info_name[index].innerHTML
      this.$refs.name_inp[index].focus();
    },
    // 点击修改 num 事件
    changeNum(index) {
      this.initinfo();
      this.$refs.c_change_num[index].style.display = "block";
      this.$refs.c_info_num[index].style.display = "none";
      this.$refs.num_inp[index].value = this.$refs.c_info_num[index].innerHTML
      this.$refs.num_inp[index].focus();
    },
    // 点击修改 score 事件
    changeScore(index) {
      this.initinfo();
      this.$refs.c_change_score[index].style.display = "block";
      this.$refs.c_info_score[index].style.display = "none";
      this.$refs.score_inp[index].value = this.$refs.c_info_score[index].innerHTML
      this.$refs.score_inp[index].focus();
    },
    // 修改 name 会员名
    getNewName(index, e) {
      var value = e.target.value;
      this.$refs.c_change_name[index].style.display = "none";
      this.$refs.c_info_name[index].style.display = "block";
      if (value != "") {
        this.$refs.c_info_name[index].innerHTML = value;
        resetMemberInfo(this.vipinfoArr[index].objectId, "name", value);
      }
    },
    // 修改 number 手机号
    getNewNum(index, e) {
      var value = e.target.value;
      var zeNum = /^1[34578]\d{9}$/.test(value);
      this.$refs.c_change_num[index].style.display = "none";
      this.$refs.c_info_num[index].style.display = "block";
      if (value != "") {
        this.$refs.c_info_num[index].innerHTML = value;
        this.$refs.num_inp[index].value = this.vipinfoArr[index].number
        for (var i in this.xin) {
          if (value == this.xin[i].number && i!=index && value != "") {
            console.log(value,this.xin[i].number)
            this.$refs.c_info_num[index].className = "c_warn";
            return false;
          } else {
            this.$refs.c_info_num[index].className = "c_info";
          }
        }
        if (zeNum) {
          resetMemberInfo(this.vipinfoArr[index].objectId, "number", value);
          this.$refs.c_info_num[index].className = "c_info";
        } else {
          this.$refs.c_info_num[index].className = "c_warn";
        }
      }
    },
    // 修改 score 积分
    getNewScore(index, e) {
      var value = e.target.value;
      var zeScore = /^\d*$/.test(value);
      this.$refs.c_change_score[index].style.display = "none";
      this.$refs.c_info_score[index].style.display = "block";
      if (value != "") {
        this.$refs.c_info_score[index].innerHTML = value;
        if (zeScore) {
          resetMemberInfo(
            this.vipinfoArr[index].objectId,
            "score",
            parseInt(value)
          );
          this.$refs.c_info_score[index].className = "c_info";
        } else {
          this.$refs.c_info_score[index].className = "c_warn";
        }
      }
    },
    enters(e){
      if(e.keyCode==13){
        this.initinfo();
      }
    },
    // 点击显示增加会员会员
    addvip() {
      this.$refs.c_add.style.display = "block";
    },
    // 点击隐藏增加会员
    addmove() {
      this.$refs.c_add.style.display = "none";
    },
    // 获取增加的 name
    getName(e) {
      var value = e.target.value;
      this.name = value;
      // for (var i in this.xin) {
      //   if (value == this.xin[i].name && value != "") {
      //     this.nameP = "用户已经存在！";
      //     return false;
      //   } else {
      //     this.nameP = "";
      //     this.name = value;
      //   }
      // }
    },
    // 获取增加的 number
    getNum(e) {
      var value = e.target.value;
      var ze = /^1[34578]\d{9}$/.test(value);
      if (ze || value == "") {
        this.numberP = "";
        for (var i in this.xin) {
          if (value == this.xin[i].number && value != "") {
            this.numberP = "手机号已经注册！";
            return false;
          } else {
            this.numberP = "";
            this.number = value;
          }
        }
      } else {
        this.numberP = "手机号格式有误！";
      }
    },
    // 获取增加的 score
    getScore(e) {
      var ze = /^\d*$/.test(e.target.value);
      if (ze) {
        this.score = e.target.value;
        this.scoreP = "";
      } else {
        this.scoreP = "积分应该是一个数值！";
      }
    },
    // 点击 确定增加
    sureAdd() {
      // console.log(this.name, this.number, this.score);
      var query = Bmob.Query('vipuser');
      if (!(this.name == "" || this.number == "" || this.score == "")) {
        var score = parseInt(this.score);
        query.set("name", this.name);
        query.set("number", this.number);
        query.set("score", score);
        query.set("isVip", 0);
        query.save().then(res => {
            console.log(res)
            this.vipinfoArr.push({
              objectId:res.objectId,
              name: this.name,
              number: this.number,
              score: this.score,
              isVip: 0
            });
            this.xin.push({
              objectId:res.objectId,
              name: this.name,
              number: this.number,
              score: this.score,
              isVip: 0
            })
        }).catch(err => {
            // console.log(err)
        })
        // location.reload();
      }
      this.$refs.c_add.style.display = "none";
    },
    // 搜索会员
    inpChange(e) {
      var value = e.target.value;
      this.vipinfoArr = [];
      for (var i in this.xin) {
        var reg = new RegExp(value,"gim");
        console.log()
        if (reg.test(this.xin[i].name)||reg.test(this.xin[i].number)) {
          // `<i style='color:crimson'>${value}</i>`
          // var result = this.xin[i].name.replace(reg,'')
          // console.log(result)
          this.vipinfoArr.push(this.xin[i]);
        }
      }
      if (value == "") {
        this.vipinfoArr = this.xin;
      }
    }
  }
};
</script>
<style scoped>
.result{
  color: crimson;
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
/* 大盒子 */
.c_member {
  width: 100%;
  height: 100%;
}
.c_inner {
  width: 85%;
  margin: 0 auto;
  overflow: hidden;
}
.tip{
  font-size: 13px;
  font-weight: normal;
  position: absolute;
  top: 57px;
  left: 10px;
}
.c_inner div {
  border-radius: 5px;
}
/* 标题 */
.c_title {
  width: 100%;
  height: 100px;
  color: #fff;
  /* background: #fff; */
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  margin-top: 20px;
  font-weight: 600;
  text-shadow: 0 0 3px #fff;
  position: relative;
}
/* 搜索 */
.c_sousuo {
  width: 250px;
  height: 30px;
  text-indent: 20px;
  border-radius: 20px;
  border: 0;
  position: absolute;
  bottom: 20px;
  right: 30px;
}
.c_sousuo:focus {
  outline: none;
}
/* 导航 */
.c_infonav {
  width: 100%;
  height: 50px;
  background: #777;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}
.c_info{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
/* 信息盒子 */
.c_infoitem {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 5px 20px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  box-sizing: border-box;
  border-bottom:1px solid #555;
}
.c_infoitem:hover {
  background: rgba(0, 0, 0, 0.7);
}
/* name */
.c_infoname {
  width: 20%;
  cursor: pointer;
}
/* number */
.c_infonumber {
  width: 20%;
  cursor: pointer;
}
/* score */
.c_infoscore {
  width: 20%;
  cursor: pointer;
}
/* move */
.c_infomove {
  width: 20%;
  text-align: right;
  cursor: pointer;
}
/* 修改信息 */
.c_change {
  display: none;
}
.c_change input {
  width: 50%;
}
.c_change button {
  width: 30%;
  border: 0;
  outline: 0;
}
/* 增加 */
.c_add {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
}
/* 隐藏增加盒子 */
.c_addmove {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
/* 增加 */
.c_addinner {
  width: 300px;
  height: 300px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* 增加 input */
.c_addinner input {
  width: 230px;
  height: 30px;
  text-indent: 15px;
}
.c_addinner span {
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  color: crimson;
}
.c_addinner button {
  margin-top: 20px;
  width: 200px;
  height: 40px;
  outline: 0;
  border: 0;
}
.c_warn {
  color: crimson;
}
</style>
