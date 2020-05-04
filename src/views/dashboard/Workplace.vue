<template>
  <page-view :avatar="userInfo.imagePhoto" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ userInfo.realname }}</div>
      <div>产品经理</div>
    </div>
    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="进行中的项目"
            :body-style="{ padding: 0 }">
            <a slot="extra">全部项目</a>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.cover"/>
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/">科学搬砖组</a>
                    <span class="datetime">9小时前</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span>&nbsp;
                    在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                    <span>{{ item.project.action }}</span>&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="XX 指数" style="margin-bottom: 24px" :loading="radarLoading" :bordered="false" :body-style="{ padding: 0 }">
            <div style="min-height: 400px;">
              <radar :data="radarData" />
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { PageView } from '@/layouts'
import { mapGetters } from 'vuex'
import { Radar } from '@/components'

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageView,
    Radar
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      timeFix: timeFix(),
      projects: [{
        id: 1,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title: 'Alipay',
        description: '那是一种内在的东西， 他们到达不了，也无法触及的',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 2,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
        title: 'Angular',
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 3,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        title: 'Ant Design',
        description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 4,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
        title: 'Ant Design Pro',
        description: '那时候我只会想自己想要什么，从不想自己拥有什么',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 5,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
        title: 'Bootstrap',
        description: '凛冬将至',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      },
      {
        id: 6,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
        title: 'Vue',
        description: '生命就像一盒巧克力，结果往往出人意料',
        status: 1,
        updatedAt: '2018-07-26 00:00:00'
      }],
      loading: true,
      radarLoading: true,
      activities: [{
        id: 1,
        user: {
          nickname: '@name',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
        },
        project: {
          name: '白鹭酱油开发组',
          action: '更新',
          event: '番组计划'
        },
        time: '2018-08-23 14:47:00'
      },
      {
        id: 1,
        user: {
          nickname: '蓝莓酱',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
        },
        project: {
          name: '白鹭酱油开发组',
          action: '更新',
          event: '番组计划'
        },
        time: '2018-08-23 09:35:37'
      },
      {
        id: 1,
        user: {
          nickname: '@name',
          avatar: '@image(64x64)'
        },
        project: {
          name: '白鹭酱油开发组',
          action: '创建',
          event: '番组计划'
        },
        time: '2017-05-27 00:00:00'
      },
      {
        id: 1,
        user: {
          nickname: '曲丽丽',
          avatar: '@image(64x64)'
        },
        project: {
          name: '高逼格设计天团',
          action: '更新',
          event: '六月迭代'
        },
        time: '2018-08-23 14:47:00'
      },
      {
        id: 1,
        user: {
          nickname: '@name',
          avatar: '@image(64x64)'
        },
        project: {
          name: '高逼格设计天团',
          action: 'created',
          event: '六月迭代'
        },
        time: '2018-08-23 14:47:00'
      },
      {
        id: 1,
        user: {
          nickname: '曲丽丽',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
        },
        project: {
          name: '高逼格设计天团',
          action: 'created',
          event: '六月迭代'
        },
        time: '2018-08-23 14:47:00'
      }],
      radarData: [{
        item: '引用',
        '个人': 70,
        '团队': 30,
        '部门': 40
      },
      {
        item: '口碑',
        '个人': 60,
        '团队': 70,
        '部门': 40
      },
      {
        item: '产量',
        '个人': 50,
        '团队': 60,
        '部门': 40
      },
      {
        item: '贡献',
        '个人': 40,
        '团队': 50,
        '部门': 40
      },
      {
        item: '热度',
        '个人': 60,
        '团队': 70,
        '部门': 40
      },
      {
        item: '引用',
        '个人': 70,
        '团队': 50,
        '部门': 40
      }]
    }
  },
  mounted () {
    // this.getProjects()
    // this.getActivity()
    // this.initRadar()

    this.loading = false
    const dv = new DataSet.View().source(this.radarData)
    dv.transform({
      type: 'fold',
      fields: ['个人', '团队', '部门'],
      key: 'user',
      value: 'score'
    })
    this.radarData = dv.rows
    this.radarLoading = false
  },
  methods: {
    // getProjects () {
    //   this.$http.get('/workplace/projects')
    //     .then(res => {
    //       this.projects = res.data && res.data.data
    //       this.loading = false
    //     })
    // },
    // getActivity () {
    //   this.$http.get('/workplace/activity')
    //     .then(res => {
    //       this.activities = res.data
    //     })
    // },
    // initRadar () {
    //   this.radarLoading = true
    //   this.$http.get('/workplace/radar')
    //     .then(res => {
    //       const dv = new DataSet.View().source(res.data)
    //       dv.transform({
    //         type: 'fold',
    //         fields: ['个人', '团队', '部门'],
    //         key: 'user',
    //         value: 'score'
    //       })
    //       this.radarData = dv.rows
    //       this.radarLoading = false
    //     })
    // }
  }
}
</script>

<style lang="less" scoped>
  .project-list {
    .card-title {
      font-size: 0;
      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;
        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }
  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }
  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }
  .mobile {
    .project-list {
      .project-card-grid {
        width: 100%;
      }
    }
    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }
    .headerContent .title .welcome-text {
      display: none;
    }
  }
</style>
