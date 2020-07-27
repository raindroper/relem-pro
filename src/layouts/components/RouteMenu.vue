<template>
  <el-menu
    class="sider-menu"
    :collapse="sideBarHide"
    text-color="#808c95"
    :collapse-transition="true"
    :default-active="currentRouteName"
    :unique-opened="true"
    @open="subMenuOpen"
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
  methods: {
    subMenuOpen (index) {
      // 展开菜单跳转subMenu路由，配合route的redirect自动跳转第一个(自行配置)子菜单
      this.$router.push({ name: index })
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
    border-right: none;
  }

  .sider-menu:not(.el-menu--collapse) {
    width: $sideBarWidth;
    min-height: 400px;
  }
</style>
