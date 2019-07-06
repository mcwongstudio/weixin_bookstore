<template>
    <div>
    <div class="phone">
      获取手机型号
      <switch :checked="phone" @change="getPhone"></switch>
      <p>{{phone}}</p>
    </div>
    <div class="location">
      获取地理位置
      <switch :checked="location" @change="getLocation"></switch>
      <p>{{location}}</p>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            phone: '',
            location: ''
        }
    },
    methods:{
         getPhone (e) {
      if (e.target.value) {
        // 选中
        var res = wx.getSystemInfoSync()
        this.phone = res.model
      } else {
        this.phone = ''
      }
    },
    getLocation (e) {
      // KVM8HWxeOsyf4q7cimqGNR1fV70QdkpM
      const ak = 'KVM8HWxeOsyf4q7cimqGNR1fV70QdkpM'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84',
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.formatted_address
                } else {
                  this.location = '抱歉，无法获取当前位置'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    }
    }
}
</script>

<style>
.phone{
    position: relative;
    left: 30rpx;
    top: 50rpx;
}
.location{
    position: relative;
    left: 30rpx;
    top: 90rpx;
}
switch{
    position: relative;
    left: 350rpx;
}
p{
    font-size: 13px;
    color: brown;
}
</style>
