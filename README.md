<h1> 优势智能舒心陪诊APP </h1>

# 产品简介


陪诊业务：是指非本次就诊人员，陪同就诊人员进行病情诊断或治疗称之为陪诊，一般为无病人员陪同患病人员一起去医院就诊。代替挂号、排队、收费等，可以省去很多的时间与精力。由于有很多老年人行动不便，子女又不在身边，要去医院看病变得费时费力，有时还不一定能够如愿。陪诊服务能够很好的解决此类问题。陪诊人对相关业务熟悉，精力充沛，能够节省很多时间，大大方便居家老人。

目前已实现功能有：
1. 登录及注册：微信一键登录
2. 首页：方便用户快速找到需要的功能服务。功能包含接送陪诊、到院陪诊、代跑取药、上门助浴、诊前约号；自动领取优惠券，自动定位当前城市。
3. 健康：记录用户的相关健康信息；
4. 订单：用户订单的各种状态展示及详情查看；
5. 我的：我的订单、优惠券、服务对象管理、服务条款、检查版本（APP）、分享转发（APP）、退出登录；
6. 我是陪诊师：接单，我的订单，余额提现，提现日志查看



功能截图

首页

![](https://wiki.yszyun.com/uploads/peizhen/images/m_2e12baa4d5bc991000077be5b8c5283f_r.jpg)

自动领取新人优惠券

![](https://wiki.yszyun.com/uploads/peizhen/images/m_2f78c640ff64105b93ab4acd986b1b01_r.jpg)

查看已开通服务的城市

![](https://wiki.yszyun.com/uploads/peizhen/images/m_16816367d52268c40e81f1e036d7f143_r.jpg)


查看医院详情

![](https://wiki.yszyun.com/uploads/peizhen/images/m_10e148378aa04e072311bfe435d11bf2_r.jpg)


可对接手环，获取健康信息

![](https://wiki.yszyun.com/uploads/peizhen/images/m_50f1b92b9a60c43c2ecdb56b62d96933_r.jpg)

个人中心

![](https://wiki.yszyun.com/uploads/peizhen/images/m_9f6559417b0f4e46859c59f68b95d0b0_r.jpg)

优惠中心

![](https://wiki.yszyun.com/uploads/peizhen/images/m_31fdd305a3ccd5308dc6b769ed4bcb82_r.jpg)

优惠券领取

![](https://wiki.yszyun.com/uploads/peizhen/images/m_e5a1de4fc0b6bf7b1a65212b4917e22b_r.jpg)

服务条款

![](https://wiki.yszyun.com/uploads/peizhen/images/m_dd014168594b64872f08e738abeb596b_r.jpg)


陪诊师注册

![](https://wiki.yszyun.com/uploads/peizhen/images/m_4f976210c7eefaa4a6ba16435dff1b95_r.jpg)

陪诊师中心

![](https://wiki.yszyun.com/uploads/peizhen/images/m_1eeb2e2cc126a8cabdab18de36749671_r.jpg)




# 产品优势

产品前端采用uni-App开发，实现App（iOS，Android）、微信小程序、H5 多平台部署运营。


# 产品功能
管理后台：
1. 统计分析
2. 城市管理
3. 菜单导航
4. 轮播图
5. 医院信息管理
6. 陪诊师审核管理
7. 陪诊师管理
8. 陪诊订单
9. 提现审核
10. 余额变动记录
11. 免责声明设置
12. 优惠券设置
13. 卡券领取记录
14. app版本更新
15. 会员管理
16. 管理员权限管理
17. 管理员日志
18. 角色管理
19. 菜单规则
20. 系统设置


# 产品演示
![](https://wiki.yszyun.com/uploads/peizhen/images/m_7ba72aa64f0ea6fdef9db254b456cbaa_r.png)

# 陪诊 关注公众号后回复 关键字： 陪诊

# 目录结构
```
├── common                  公共样式
├── components              组件资源
├── pages                   前端页面
├── App.vue                 全局生命周期和全局样式配置
├── manifest.json           应用配置
├── main.js                 vue初始化入口
├── api.js                  接口地址配置
├── pages.json              配置页面路由
└── README.md               说明文档
```

# 安装步骤
* 复制源码到新建的项目
* 创建或选择云服务空间,进入manifest.json可视化重新获取appid
* 使用HBuilderx运行到手机或微信开发者工具

以上方法都是基于[HBuilderX工具开发](https://uniapp.dcloud.io/quickstart?id=_1-%e9%80%9a%e8%bf%87-hbuilderx-%e5%8f%af%e8%a7%86%e5%8c%96%e7%95%8c%e9%9d%a2)的方法

# 修改微信地图key
* api.js 文件中， mapkey 修改为自己申请的key,申请方法如下
小程序中使用地图JS SDK

申请开发者密钥（key）：申请密钥
https://lbs.qq.com/console/mykey.html

开通webserviceAPI服务：控制台 ->应用管理 -> 我的应用 ->添加key-> 勾选WebServiceAPI -> 保存

(小程序SDK需要用到webserviceAPI的部分服务，所以使用该功能的KEY需要具备相应的权限)

# 常见问题
## Q:首页未获取到医院信息
 答： 手机系统定位未打开或者是没有允许小程序定位，需打开定位功能

## Q:首页提示此key未开启WebserviceAPI功能……
 答： 您可登录lbs.qq.com，进入控制台key管理界面，找到此key并设置启用WebserviceAPI

扫码添加技术微信支持，备注说明对应的插件名称

![](https://wiki.yszyun.com/uploads/moa-admin/images/m_a3639d790e5a0b1f9d1a1dd5e695894c_r.png)


前端免费开源，后端付费，详情咨询电话： 400-008-1668
邮箱：marketing@yszyun.com