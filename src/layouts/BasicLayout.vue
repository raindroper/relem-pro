<template>
  <container-query
    :query="MediaQueryEnum"
    @change="handleMediaQuery"
  >
    <el-container class="container">
      <el-aside :width="200">
        <sider-menu :collapsed="collapsed"/>
      </el-aside>
      <el-container>
        <el-header>
          <button @click="changeCollapsed">header</button>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </container-query>
</template>

<script>
import { ContainerQuery } from 'vue-container-query'
import SiderMenu from './components/SiderMenu'
import { mapMutations } from 'vuex'
import { TOGGLE_SIDE_BAR } from '../store/mutation-types'

console.log('containerQuery', ContainerQuery)

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
    SiderMenu
  },
  data () {
    return {
      MediaQueryEnum,
      collapsed: false
    }
  },
  methods: {
    ...mapMutations([TOGGLE_SIDE_BAR]),
    handleMediaQuery (val) {
      console.log(val)
    },
    changeCollapsed () {
      console.log('changeCollapsed')
      this[TOGGLE_SIDE_BAR]()
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
  }
</style>
