<template>
    <div>
        <input type="number" v-model="price" focus="true">
        <button @click="comfirm">确认</button>
    
    </div>
</template>

<script>
import {post} from "@/util"
export default {
    onLoad() {
    this.bookid = this.$root.$mp.query.id
    console.log(this.bookid)
  },
    data(){
        return {
            bookid: '',
            price: ''
        }
    },
    methods:{
        async comfirm(){
            console.log()
            if(this.price!=''){
                console.log(this.price)
            const res = await post('/wong/changeprice',{
                bookid: this.bookid,
                price: this.price
            })
            
            if (res.code === 0) {
                this.price = ''
                wx.showModal({
                    title: '修改成功',
                    content: '',
                    showCancel: 'false',
                    success: function(res) {
                        if (res.confirm) {
                            wx.navigateBack({//返回
                                delta:1
                                })
                            }
                        }
                    })
                }
            }
            
        }
    }

}
</script>

<style>
input{
    margin: 60rpx 0 0 130rpx;
    width: 400rpx;
    background:#F5F5F5;
    border-radius:25rpx;
    text-align:center;
}
button{
    position: relative;
    left: 260rpx;
    top: -57rpx;

    width: 130rpx;
    height: 70rpx;

    font-size: 30rpx;
   
}

</style>
