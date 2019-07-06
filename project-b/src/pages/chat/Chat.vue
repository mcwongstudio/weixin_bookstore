<template>
    <div id="page" ref="ele">
        <!-- <div class="name">{{headUrl.sellnickName}}</div> -->
        
            <div 
            v-if="cl.text"
            class="chat" 
            :key="cl.id" 
            v-for="cl in chatlist" 
            :style="{'text-align': cl.local}">
            
            <img :src="headUrl.sellUrl" alt="" v-if="cl.local=='left'">
            <span :class="cl.local">{{cl.text}}</span>
            <img :src="headUrl.myUrl" alt="" v-if="cl.local=='right'">
           
            </div>

            <div id="kong"></div>

        <div class="inputer">
            <img class="input" src="/static/img/emoticon.png" alt="">
            <input v-model="mychat" class="input" type="text" >
            <button class="input" @click="send">发送</button>
        </div>
    </div>
    
</template>

<script>
import { post } from "@/util"
import config from '@/config'
export default {
  data() {
    return {
      sell_openid:'',
      mychat: '',
      height: 0,
      orderName:'',
      openid1: '',
      openid2: "",
      chatstr: '',
      chatstr2: '',
      chatlist: [],
      headUrl: {},
      index: 0
    };
  },
  onLoad() {

      this.openid2 = this.$root.$mp.query.openid
      this.openid1 = config.openid
      this.getChat()
      this.getHeadUrl()
      
      
    
    
  },
  onShow(){
    setTimeout(()=>{
      this.pageScrollToBottom()},500)
    setTimeout(()=>{
      this.setName()},500)
      
  },
  methods: {

    //得到聊天数据
    async getChat() {
      const res = await post("/wong/getchat", {
        openid1: config.openid,
        openid2: this.openid2
      })
      this.chatstr = res.chatinfo[0].chat
      this.index = res.chatinfo[0].index
      const chatlist = res.chatinfo[0].chat.split("#")

      var list = []
      for (var i in chatlist){
        var json = {}
        json['index'] = i
        // 整理聊天数据
        if(chatlist[i][0] == '+'){
          json['local'] = 'right'
          json['text'] = chatlist[i].substring(1)

          this.chatstr2 +=  ('#-'+json['text'])
              
        }else{
          json['local'] = 'left'
          json['text'] = chatlist[i].substring(1)
          
          this.chatstr2 += ('#+'+json['text'])
        }
        list.push(json)
      }
      this.chatlist = list
    },
    async getHeadUrl(){
      const res = await post('/wong/getheadurl',{
        sell_openid: this.openid2,
        my_openid: config.openid
      })
      console.log(res.myUrl)
      
      this.headUrl = res
      console.log(this.headUrl)
    },

    //发送
    async send() {
      if(this.mychat){
        var send = this.mychat
        this.mychat = ''
        this.chatstr += ('#+' + send)
        this.chatstr2 += ('#-' + send)
        //把发送内容追加到数组中以显示
        this.chatlist.push({
          'index': this.chatlist.length,
          'local':'right',
          'text':send
          })
        //索引值index比最大+1
        
        //把发送内容加入数据库
        const res = await post('/wong/addchat',{
          openid1: this.openid1,
          openid2: this.openid2,
          chatstr: this.chatstr,
          chatstr2: this.chatstr2
        }) 
       
        
      }
      this.pageScrollToBottom()
    },

    setName(){
      wx.setNavigationBarTitle({
      title: this.headUrl.sellnickName
    })
    },

  //去到滚动条底部
  async pageScrollToBottom() {
      wx.pageScrollTo({
        scrollTop: 9999
      })
  }
  }
}
</script>

<style>
#page {
  width: 100%;
  height: 100%;
  background-color: #FDF5E6;
}
.chat{
  margin-bottom: 15rpx;
  
}
.chat img{
  position: relative;
  top: 40rpx;

  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  margin: 20rpx
}
.chat span{
  padding: 10rpx 30rpx 10rpx 30rpx;
  border-radius:25rpx;
  
  font-size: 30rpx;
}
.chat .right {
  background-color: #32CD32;
}
.chat .left {
  background-color: #ffffff;
}

.name {
  height: 60rpx;
  width: 750rpx;
  background-color: #faf0e6;
  text-align: center;

  position: fixed;
  top: 0rpx;
  z-index: 9998;
 
}
.inputer {
  position: fixed;
  bottom: 0rpx;
  background-color: #ffffff;
  z-index: 9999;
  width: 750rpx;
  height: 90rpx;
}
.inputer .input {
  position: fixed;
  bottom: 20rpx;
}
.inputer img {
  margin-left: 25rpx;
  width: 45rpx;
  height: 45rpx;
}
.inputer input {
  margin-left: 75rpx;
  width: 500rpx;

  border: 3rpx #aaa;
  border-style: none none solid none;
}
.inputer button {
  /* position:fixed; 
    bottom:20rpx; */
  /* position: absolute; */
  left: 600rpx;
  height: 70rpx;
  width: 120rpx;
  font-size: 30rpx;
}

.input #test {
  height: 1800rpx;
  background-color: aqua;
}
#kong{
  height: 100rpx;
}
</style>
