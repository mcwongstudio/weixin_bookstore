<template>
    <div>
        <textarea v-model="vm" focus="true" placeholder="写下你的建议，客服小姐姐会认真看哦" name="" id="text" cols="40" rows="10"></textarea>
        <img src="/static/img/send.png" alt="" @click="send">
    </div>
</template>

<script>
import {showModal} from '@/util'
export default {
    data(){
        return{
            vm: ''
        }
    },
    methods:{
        
        send(){
            if(this.vm){
                wx.showModal({
                    title: '发送成功',
                    content: '',
                    showCancel: 'false',
                    success: function(res) {
                        if (res.confirm) {
                            wx.navigateBack({//返回
                                delta:2
                                })
                            }
                        }
                    })
            } 
        }
    }
}
</script>

<style>
#text{
    position: relative;
    
    top: 100rpx;
    margin: 0 auto 0 auto;
    background-color: #E6E6FA;
    color: #A9A9A9;
    font-size:17px; 
    border-radius:25rpx;
    padding: 10rpx;
}
img{
    position: relative;
    left: 610rpx;
    top: 110rpx;
    width: 30px;
    height: 30px;
}
</style>
