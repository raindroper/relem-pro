<template>
  <el-menu
    class="sider-menu"
    :collapse="sideBarHide"
    background-color="#001529"
    text-color="#fff"
    :collapse-transition="false"
    :default-active="currentRouteName"
  >
    <h1 style="color: #fff">logo</h1>
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

<style scoped>
  .sider-menu {
    height: 100%;
  }

  .sider-menu:not(.el-menu--collapse) {
    width: 199px;
    min-height: 400px;
  }
</style>
