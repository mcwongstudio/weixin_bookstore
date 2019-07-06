<template>
    <div>
        <img src="/static/img/gh.jpg" alt="">
        <div id="font">
         &nbsp;&nbsp;叮咚二手书哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
        </div>
        <button @click="call">联系我们</button>
    </div>
</template>

<script>
export default {
    methods:{
        call(){
            wx.navigateTo({
                url: '/pages/callboss/main'
            })
        }
    }
}
</script>

<style>
img{
    position: relative;
    left: 200rpx;
    top: 220rpx;
    height: 350rpx;
    width: 350rpx;
}
#font{
    position: relative;
    left: 200rpx;
    top: 400rpx;
   
    width: 350rpx;
    height: 100rpx;
    font-size: 13px;
    color: darkgray;
}
button{
    width: 88px;
    height: 31px;
    font-size: 13px;
    color: #00CED1;
    border-color:#00CED1;

    position: relative;
    top: 550rpx;
}
</style>
