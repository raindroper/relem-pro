<template>
  <header class="nav-bar layout-content-header">
    <div class="nav-left">
      <div class="toggle-side-btn transition" @click="toggleSideBar">
        <i :class="sideBarHide ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in rou" :key="item.name" :to="{name: item.name}">
          {{i18nRender(item.meta.title)}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav-right">
      <!--      <div class="i18n hover transition" @click="toggleLang">-->
      <!--        <i class="el-icon-s-tools"></i>-->
      <!--      </div>-->
      <div class="i18n hover transition">
        <el-dropdown style="height: 100%;color: #fff" @command="toggleLang">
          <div style="height: 100%;display:flex;align-items:center;">
            <i class="fa-language" style="margin-right: 10px;"></i>
            <span>{{$i18n.locale === 'zh-CN' ? '中文' : 'English'}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="user hover transition">
        <el-dropdown style="height: 100%;color: #fff">
          <div style="height: 100%;display:flex;align-items:center;">
            <i class="fa-user" style="margin-right: 10px;"></i>
            <span>{{userInfo.name}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{$t('menu.home')}}</el-dropdown-item>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </header>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { TOGGLE_SIDE_BAR } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

export default {
  name: 'NavBar',
  methods: {
    ...mapMutations([TOGGLE_SIDE_BAR]),
    ...mapActions(['setLang']),
    i18nRender,
    toggleSideBar () {
      this[TOGGLE_SIDE_BAR]()
    },
    toggleLang (lang) {
      console.log(lang)
      // lang = lang || this.$i18n.locale === 'en' ? 'zh-CN' : 'en'
      // console.log(lang)
      this.setLang(lang)
    }
  },
  computed: {
    ...mapGetters(['sideBarHide', 'userInfo']),
    rou () {
      return this.$router.currentRoute.matched
    }
  }
}
</script>

<style scoped lang="scss">
  .hover {
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }

  .nav-bar {
    width: 100%;
    height: 64px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-left {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .toggle-side-btn {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 64px;
        cursor: pointer;
        background: rgba(0, 0, 0, 0);
        font-size: 20px;
        transition: all .28s ease-in-out;
        color: #ffffff;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .nav-right {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #ffffff;

      .user {
        padding: 0 12px;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .i18n {
        padding: 0 12px;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 26px;
        line-height: 64px;
        vertical-align: middle;
      }
    }

  }
</style>
