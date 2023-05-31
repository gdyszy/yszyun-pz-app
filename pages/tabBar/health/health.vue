<template>
  <view class="health-content">
    <view class="health-card">
      <view class="health-circle">
        <qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
        <view class="skip-count">
          <view>{{skipCount}} <text>步</text> </view>
          <text>步数</text>
        </view>
      </view>
      <view class="health-consume">距离 <text>1.18</text>公里 &nbsp;&nbsp; 热量 <text>35.80</text>千卡</view>
    </view>
    <!-- 运动 -->
    <view class="health-item" v-for="(item,index) in list" :key="index">
      <view class="health-image">
        <image :src="'/static/'+item.image+ '.png'" mode=""></image>
      </view>
      <view class="health-intro">
        <view class="health-name">
          {{item.name}}
        </view>
        <view>
          {{nowDate}} {{item.content}}
        </view>
      </view>
      <view class="health-message">
        <text>{{item.count}}</text>{{item.unit}}
      </view>
    </view>
    <view class="health-tip">
      <view class="title">
        健康贴士
      </view>
      <view class="content">
        您的心率最新记录为74次/分钟,最大心率为123次每分钟最低为54次每分钟
      </view>
    </view>
  </view>
</template>

<script>
  function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dates = date.getDate();
    dates = dates > 10 ? dates : "0" + dates
    month = month > 10 ? month : "0" + month
    return year + "-" + month + "-" + dates
  }
  export default {
    data() {
      return {
        nowDate: getDate(),
        skipCount:1281, //步数
        list: [{
          name: "运动记录",
          content: "见证您的历程",
          image: "sport",
          count: "1.6",
          unit: "公里"
        }, {
          name: "心率",
          content: "看护您的心脏",
          image: "heart",
          count: "74",
          unit: "次/分钟"
        }, {
          name: "睡眠",
          content: "保持健康睡眠",
          image: "sleep",
          count: "9.2",
          unit: "小时"
        }, {
          name: "血氧",
          content: "让生活更活力",
          image: "blood",
          count: "100",
          unit: "%"
        }],
        // chartData opts 进度环配置
        chartData: {
          series: [{
            color: "#fff",
            data: 0 
          }]
        },
        opts: {
          title: {
            name: " ",
          },
          subtitle: {
            name: " ",
          },
          extra: {
            arcbar: {
              type: "circle",
              width: 8,
              backgroundColor: "rgba(255,255,255,.4)",
              startAngle: 1.5,
              endAngle: 0.25,
              gap: 2
            }
          }
        },
      }
    },
    onLoad() {
      
    },
    onShow() {
      this.chartData.series[0].data = this.skipCount / 10000 
    },
    methods:{
      
    }
  }
</script>

<style>
  .health-content {
    padding: 40rpx 20rpx;
  }

  .health-card {
    text-align: center;
    padding-top: 40rpx;
    font-size: 14px;
    height: 340rpx;
    color: #fff;
    border-radius: 5px;
    background: linear-gradient(180deg, #52a2f6 0%, #278af4 100%);
  }

  .health-circle {
    display: flex;
    justify-content: center;
    position: relative;
    height: 280rpx;
    overflow: hidden;
  }

  .skip-count {
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    font-size: 28px;
    line-height: 40rpx;
  }

  .skip-count text {
    font-size: 14px;
  }

  .health-consume text {
    font-size: 16px;
    margin: 0 5rpx;
  }

  .health-item {
    margin: 20rpx 0;
    background-color: #fff;
    border-radius: 5px;
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
    padding: 20rpx;
    box-shadow: 2px 2px 5px 0px #ccc;
  } 

  .health-name {
    font-weight: 600;
    font-size: 16px;
    color: #000;
  }

  .health-intro {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
  }

  .health-image image {
    width: 100rpx;
    height: 100rpx;
    margin: 0 28rpx;
  }

  .health-message {
    width: 168rpx;
    /* flex: 1; */
    line-height: 120rpx;
    text-align: right;
  }

  .health-message text {
    font-size: 20px;
    color: #000;
  }

  .health-tip .title {
    color: #aaa;
    padding: 20rpx 0;
  }

  .health-tip .content {
    padding: 30rpx 20rpx;
    border-radius: 6px;
    color: #fff;
    line-height: 22px;
    font-size: 14px;
    background-color: #8db4f7;
  }
</style>
