<template>
  <container-query
    :query="MediaQueryEnum"
    @change="handleMediaQuery"
  >
    <el-container class="container">
      <sider-menu class="sider-wrapper layout-sidebar transition" :class="{collapsed: sideBarHide}" :collapsed="collapsed"/>
      <div class="main-container layout-content" :class="{'collapsed': !sideBarHide}">
        <nav-bar/>
        <main class="layout-content-main">
          <router-view/>
        </main>
      </div>
    </el-container>
  </container-query>
</template>

<script>
import { ContainerQuery } from 'vue-container-query'
import SiderMenu from './components/SiderMenu'
import NavBar from './components/NavBar/Index'
import { mapGetters } from 'vuex'

const MediaQueryEnum = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

export default {
  name: 'BasicLayout',
  components: {
    ContainerQuery,
    SiderMenu,
    NavBar
  },
  data () {
    return {
      MediaQueryEnum,
      collapsed: false,
      sideBarWidth: 210
    }
  },
  methods: {
    handleMediaQuery (val) {
      console.log(val)
    }
  },
  computed: {
    ...mapGetters(['sideBarHide'])
  }
}
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    width: 100vw;
    justify-content: flex-start;

    .sider-container {
      flex: 0 0 210px;
      width: 210px;
      max-width: 210px;
      min-width: 210px;
      &.collapsed {
        flex: 0 0 64px;
        width: 64px;
        max-width: 64px;
        min-width: 64px;
      }
    }

    .main-container {
      overflow-x: hidden;
      flex: auto;
      min-height: 100vh;
    }
  }
</style>
