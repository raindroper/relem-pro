<template>
  <el-menu
    class="sider-menu"
    :collapse="sideBarHide"
    background-color="#001529"
    text-color="#fff"
    :collapse-transition="true"
    :default-active="currentRouteName"
  >
    <div class="logo">logo</div>
    <menu-item v-for="i in menus" :item="i" :key="i.path"/>
  </el-menu>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MenuItem from './MenuItem'

export default {
  name: 'RouteMenu',
  components: {
    MenuItem
  },
  data () {
    return {
      menus: []
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    ...mapGetters(['sideBarHide']),
    currentRouteName () {
      return this.$route.name
    }
  },
  created () {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
  }
}
</script>

<style scoped lang="scss">
  @import "~@/styles/variables.scss";

  .logo {
    display: inline-block;
    width: calc(100% - 2px);
    color: #ffffff;
    height: 64px;
  }

  .sider-menu {
    height: 100%;
  }

  .sider-menu:not(.el-menu--collapse) {
    width: $sideBarWidth;
    min-height: 400px;
  }
</style>
