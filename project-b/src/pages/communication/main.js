import Vue from 'vue'
import Communication from './Communication'

const communication = new Vue(Communication)

communication.$mount()

export default {
    config: {
      
      "backgroundColor": "#B0C4DE",
      "backgroundTextStyle": "dark",
      enablePullDownRefresh: true
    }
  }