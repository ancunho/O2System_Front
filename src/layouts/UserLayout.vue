<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container" :class="{ on: paddingFlag }">
      <!--      <div class="language">-->
      <!--        <lang-select />-->
      <!--      </div>-->
      <div class="top">
        <div class="header">
          <a href="/">
            <span class="title">KBH ODM/OEM Sales System</span>
          </a>
        </div>
        <div class="desc">
          Kolmar
        </div>
      </div>

      <route-view></route-view>

      <div class="footer">
        <div class="copyright">
          Copyright &copy; 2020 BnH OSS
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'
import LangSelect from '@/components/tools/LangSelect'

export default {
  name: 'UserLayout',
  components: {
    RouteView,
    LangSelect
  },
  mixins: [mixinDevice],
  data () {
    return {
      paddingFlag: false
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  },
  watch: {
    $route (to, from) {
      this.paddingFlag = 'register'.includes(to.name)
    }
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;

      &.on {
        padding-top: 30px;
      }

      a {
        text-decoration: none;
      }

      .language {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 400px;
        margin: 0 auto;
        padding: 0 15px;
        box-sizing: border-box;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
