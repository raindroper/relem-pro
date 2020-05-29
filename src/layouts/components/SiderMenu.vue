<template>
  <div class="sider-container">
    <route-menu :collapsed="collapsed"/>
  </div>
</template>

<script>
import RouteMenu from './RouteMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'SiderMenu',
  model: {
    prop: 'collapsed',
    event: 'collapse'
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    RouteMenu
  },
  computed: {
    ...mapGetters(['sideBarHide'])
  }
}
</script>

<style scoped lang="scss">
  @import "~@/styles/variables.scss";

  .sider-container {
    background-color: #001529;
    height: 100%;
    /*overflow: hidden;*/
  }
</style>
