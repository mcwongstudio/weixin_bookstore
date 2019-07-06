<template>
    <div>
        <img src="/static/img/gh.jpg" alt="">
        <div id="s1">叮咚图书</div>
        <div id="s2">更新说明</div>
        <button @click="call">反馈建议</button>
        <div class="new">
            <div>【V0.11.18.10】2018-9-31</div>
            <div>&nbsp;&nbsp;1.更好的聊天体验</div>
            <div>&nbsp;&nbsp;2.修复了若干bug</div>
        </div>
        
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
#s1{

    position: relative;
    /* left: 200rpx; */
    top: 280rpx;
    text-align: center;
    font-size: 35rpx;
}
#s2{
    position: relative;
    /* left: 200rpx; */
    top: 320rpx;
    text-align: center;
    font-size: 25rpx;
    color: darkgray;
}
button{
    width: 88px;
    height: 31px;
    font-size: 13px;
    color: #00CED1;
    border-color:#00CED1;

    position: relative;
    top: 400rpx;
}
.new{
    font-size: 22rpx;
    color: darkgray;
    position: relative;
    top: 500rpx;
    left: 5px;
}

</style>
