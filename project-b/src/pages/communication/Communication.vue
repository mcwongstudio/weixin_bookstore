<template>
    <div>
        <div :key="commun.index" v-for="commun in communication">
            <a :href="commun.chatUrl">
            <img :src="commun.avatarUrl" alt="">
            <span>{{commun.nickName}}</span>
            </a>
            <hr>
        </div>
    </div>
</template>

<script>
import { post,showModal } from "@/util"
import config from "@/config"
export default {
  data() {
    return {
      communication: []
    }
  },
  mounted() {
    // this.getAllChat()
  },
  onShow() {
    if(config.openid){
      this.getAllChat()
    }
  },
  methods: {
    async getAllChat() {
      const res = await post("/wong/getallchat", {
        openid: config.openid
      })
    
      var list = []
      for(let i in res.allchat){
        
        var obj = JSON.parse(res.userinfo[i][0].user_info)
        var json = res.allchat[i]

        json['chatUrl'] = '/pages/chat/main?openid='+obj.openId
        json['nickName'] = obj.nickName
        json['avatarUrl'] = obj.avatarUrl

        list.push(json)
      }
      this.communication = list
    }
  },
  onPullDownRefresh () {
    if(config.openid){
      this.getAllChat()
    }else{
      showModal('请登录','')
    }
    
  }
}
</script>

<style>

span{
  position: relative;
  left: 25rpx;
  top: -20rpx;
}
hr {
  height: 2rpx;
  background: #888;
  margin-top: 10rpx;
}
img {
  margin: 15rpx 0 0 20rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
</style>
