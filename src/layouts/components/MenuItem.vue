<script>
import { i18nRender } from '@/locales'

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    hasShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      return showingChildren.length > 0
    }
  },
  render (h) {
    const sub = (
      <el-submenu index={this.item.name} popper-append-to-body>
        <template slot="title">
          <i class={this.item.meta.icon}/>
          <span slot="title">
            {i18nRender(this.item.meta.title)}
          </span>
        </template>
        {
          this.item.children && this.item.children.length > 0 && this.item.children.map(child => {
            console.log(this.item)
            return <menu-item item={child} key={child.name} index={child.name}/>
          })
        }
      </el-submenu>
    )

    const notSub = (
      <router-link to={{ name: this.item.name }}>
        <el-menu-item index={this.item.name}>
          <i class={this.item.meta.icon}></i>
          <span slot="title">
              {i18nRender(this.item.meta.title)}
            </span>
        </el-menu-item>
      </router-link>
    )

    const menuShow = (this.hasShowingChild(this.item.children, this.item) && !this.item.hideChildrenInMenu)
    return !this.item.hidden ? menuShow ? sub : notSub : null
  }
}
</script>

<style scoped>

</style>
