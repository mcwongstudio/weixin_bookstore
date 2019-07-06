import Vue from 'vue'
import SetUp from './SetUp'

const setup = new Vue(SetUp)

setup.$mount()

export default {
    config: {
        "navigationBarBackgroundColor": "#00CED1",
        "navigationBarTextStyle": "light",
        "navigationBarTitleText": "设置",
        "backgroundColor": "#eeeeee",
        "backgroundTextStyle": "dark",

        enablePullDownRefresh: true
      }
}
