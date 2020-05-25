<!--<template>-->
<!--  <div v-if="!item.hidden">-->
<!--    <template v-if="!hasShowingChild(item.children, item) || item.hideChildrenInMenu">-->
<!--      <router-link :to="{name: item.name}">-->
<!--        <el-menu-item :index="item.name">-->
<!--          <i :class="item.meta.icon"></i>-->
<!--          <span slot="title">{{item.meta.title}}</span>-->
<!--        </el-menu-item>-->
<!--      </router-link>-->
<!--    </template>-->
<!--    <el-submenu v-else-->
<!--                :index="item.name" popper-append-to-body>-->
<!--      <template slot="title">-->
<!--        <i :class="item.meta.icon"></i>-->
<!--        <span slot="title">{{item.meta.title}}</span>-->
<!--      </template>-->
<!--      <menu-item v-for="child in item.children" :item="child" :key="child.name" :index="child.name"></menu-item>-->
<!--    </el-submenu>-->
<!--  </div>-->
<!--</template>-->

<script>
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
        return !item.hidden;
      })
      return showingChildren.length > 0
    }
  },
  render (h) {
    const sub = (
      <el-submenu index={this.item.name} popper-append-to-body>
        <template slot="title">
          <i class={this.item.meta.icon}></i>
          <span slot="title">
            {this.item.meta.title}
          </span>
        </template>
        {
          this.item.children && this.item.children.length > 0 && this.item.children.map(child => {
            console.log(this.item)
            return <menu-item item={child} key={child.name} index={child.name}></menu-item>
          })
        }
      </el-submenu>
    )

    const notSub = (
      <template>
        <router-link to={{ name: this.item.name }}>
          <el-menu-item index={this.item.name}>
            <i class={this.item.meta.icon}></i>
            <span slot="title">
              {this.item.meta.title}
            </span>
          </el-menu-item>
        </router-link>
      </template>
    )

    const menuShow = (!this.hasShowingChild(this.item.children, this.item) || this.item.hideChildrenInMenu)
    return !this.item.hidden ? menuShow ? sub : notSub : null
  }
}
</script>

<style scoped>

</style>
