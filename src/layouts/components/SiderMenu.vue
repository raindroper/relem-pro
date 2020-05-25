<template>
  <div class="sider-container">
    <route-menu :collapsed="collapsed"/>
  </div>
</template>

<script>
import RouteMenu from './RouteMenu'

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
  }
}
</script>

<style scoped lang="scss">
  .sider-container {
    height: 100%;
    overflow: hidden;
  }
</style>
