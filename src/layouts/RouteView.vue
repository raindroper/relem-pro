<script>
export default {
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  render (h) {
    const { $route: { meta } } = this
    return this.keepAlive || meta.keepAlive ? (
      <div class="route-view">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    ) : (
      <div class="route-view">
        <router-view />
      </div>
    )
  }
}
</script>

<style scoped lang="less">
  .route-view {
    background-color: #fff;
    padding: 16px;
  }
</style>
