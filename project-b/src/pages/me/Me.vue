<template>
  <div class="container">

    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login" plain="true">{{userinfo.nickName}}</button>
    </div>
    <div class="display">
     
      <img class="insert" src="/static/img/insert.png" alt="" @click="scanCode" >
      <img class="showbook" src="/static/img/mybook.png" alt="" @click="showMyBook" >
      <img class="setup" src="/static/img/setup.png" alt="" @click="setup" >
      <img class="common" src="/static/img/common.png" alt="" @click="common" >
      <img class="money" src="/static/img/money.png" alt="" @click="money" >
      <img class="collection" src="/static/img/collection.png" alt="" @click="collection" >
    </div>

    <div class="span">
      <span id="s1">添加图书</span>
      <span id="s2">我的图书</span>
      <span id="s3">设置</span>
      <span id="s4">意见反馈</span>
      <span id="s5">我的金币</span>
      <span id="s6">收藏</span>
    </div>

  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess, post, showModal, hideLoading } from '@/util'
import config from '@/config'
export default {
  data () {
    return {
      userinfo: {
        nickName: '登录',
        avatarUrl: '/static/img/head.png'
      },
      disabled_bool: true,
      phone: '',
      location: ''

      
    }
  },
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  mounted () {
   
  },

  methods: {
    login () {
      if (this.disabled_bool==true) {
        wx.showLoading({
          title: '正在登陆',
            })
          }
      let user = wx.getStorageSync('userinfo')
      const self = this
      if (this.disabled_bool==true) {
       
        qcloud.setLoginUrl(config.loginUrl)
        
        qcloud.login({
          
          success: function (userinfo) {
            hideLoading()
            qcloud.request({
              url: config.userUrl,
              login: true,
              success (userRes) {
                showSuccess('登录成功')
                
                config.openid = userinfo.openId
               
                self.userinfo = userRes.data.data
                self.disabled_bool = false
              }
            })
          },
          fail: function(){
            console.log('拒绝')
            hideLoading()
          }
        })
      }
    },

    async addBook (isbn) {
      setTimeout(function(){
        hideLoading()
      },300)
      
      const res = await post('/wong/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      if (res.code === 0 && res.title) {
        showSuccess('添加成功')
      }
      
    },

    //展示我的图书
    async showMyBook(){
      if(config.openid==''){
          showModal('请登录','')
      }
      else{
        wx.navigateTo({
          url:'/pages/mybooks/main?openid='+config.openid
        })
      }      
    },

    scanCode () {
      if(config.openid==''){
          showModal('请登录','')
      }
      else{
        wx.scanCode({
          success: res => {
            wx.showLoading({
              title: '正在添加',
            })
            if (res.result.length < 16) {
              this.addBook(res.result)
            } else {
              hideLoading()
              showModal('添加失败', '请扫描图书二维码')
            }
        }
      })
      }
    },
    setup(){
      wx.navigateTo({
        url: '/pages/setup/main'
      })
    },
    money(){
      showModal('提示','此功能暂未开通')
    },

    common(){
      wx.navigateTo({
                url: '/pages/callboss/main'
            })
    },
    collection(){
      if(config.openid==''){
          showModal('请登录','')
      }
      else{
        wx.navigateTo({
          url: '/pages/collection/main'
        })
      }
    }
  },
  onPullDownRefresh () {
    console.log('下拉')
  }
}
</script>

<style>
.container{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    position: fixed;
}
.userinfo {
  background-color: #00CED1;
  width: 750rpx;
  height: 100px;
  position: fixed;
}
.userinfo img {
  position: absolute;
  top: 15px;
  left: 20px;
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.userinfo button {
  position: absolute;
  top: 35px;
  left: 38px;
  
  border-style: none;
  width: 360rpx;
  height: 100rpx;
  color: aliceblue;
}

.insert {
  position: absolute;
  left: 150rpx;
  top: 280rpx;
  width: 70rpx;
  height: 70rpx;
}
.showbook{
  position: absolute;
  left: 350rpx;
  top: 280rpx;
  width: 70rpx;
  height: 70rpx;
}
.setup{
  position: absolute;
  left: 550rpx;
  top: 280rpx;
  width: 70rpx;
  height: 70rpx;
}
.common{
  position: absolute;
  left: 150rpx;
  top: 480rpx;
  width: 70rpx;
  height: 70rpx;
}
.money{
  position: absolute;
  left: 350rpx;
  top: 480rpx;
  width: 70rpx;
  height: 70rpx;
}
.collection{
  position: absolute;
  left: 550rpx;
  top: 480rpx;
  width: 70rpx;
  height: 70rpx;
}
.phone{
  position: absolute;
  left: 50rpx;
  top: 880rpx;
}
.location{
  position: absolute;
  left: 50rpx;
  top: 800rpx;
}
.span span{
  font-size: 27rpx;
}
#s1{
  position: absolute;
  left: 129rpx;
  top: 350rpx;
}
#s2{
  position: absolute;
  left: 332rpx;
  top: 350rpx;
}
#s3{
  position: absolute;
  left: 558rpx;
  top: 352rpx;
}
#s4{
  position: absolute;
  left: 129rpx;
  top: 550rpx;
}
#s5{
  position: absolute;
  left: 332rpx;
  top: 550rpx;
}
#s6{
  position: absolute;
  left: 558rpx;
  top: 552rpx;
}

</style>

