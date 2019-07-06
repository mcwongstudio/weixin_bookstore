<template>
    <div id="page">
        <div id="manager" class="white" @click="manager">
            <hr>
            <span>主页设置</span>
            <hr>
        </div>
        <div class="white" @click="black">
            <hr>
            <span>黑名单管理</span>
            <hr>
        </div>
        <div class="white" @click="power">
            <hr>
            <span>权限管理</span>
            <hr>
        </div>
        <div id="about" class="white" @click="about">
            <hr>
            <span>关于</span>
            <hr id="middle">
        </div>
        <div id="news" class="white" @click="news">
            <span>更新日志</span>
            <hr>
        </div>
    </div>
</template>

<script>
import {showModal} from '@/util'
export default {
    
    methods:{
        manager() {
            showModal('提示','此功能暂未开通')
        },
        black () {
            showModal('提示','此功能暂未开通')
        },
        power () {
            wx.navigateTo({
                url: '/pages/power/main'
      })
        },
        about(){
             wx.navigateTo({
                url: '/pages/about/main'
      })
        },
        news(){
            wx.navigateTo({
                url: '/pages/news/main'
      })
        }
  }
    
}
</script>

<style>
#page{
  background-color: #f5f5f5;
  width: 750rpx;
  height: 100%;
  position: fixed;
}
#manager{
    margin-top: 20px; 
}

span {
    font-size: 20px;
    margin-left: 15px;
}

hr{
    height: 1px;
    background:  #D3D3D3;
    margin: 10px 0 10px 0; 
}

#about{
    margin-top: 30px; 
}
#middle{
    width: 720rpx;
    margin:0 0 0 15rpx;
    margin-top: 10px;
}
.white{
  background-color: white;
  width: 750rpx;
}

#news{
    padding-top:10px; 
}
#news hr{
    margin-top:10px; 
}


</style>
