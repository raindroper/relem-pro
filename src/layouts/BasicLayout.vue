<template>
  <container-query
    :query="MediaQueryEnum"
    @change="handleMediaQuery"
  >
    <el-container class="container">
      <sider-menu :collapsed="collapsed"/>
      <div class="main-container">
        <nav-bar/>
        <router-view/>
      </div>
    </el-container>
  </container-query>
</template>

<script>
import { ContainerQuery } from 'vue-container-query'
import SiderMenu from './components/SiderMenu'
import NavBar from './components/NavBar/Index'
import variables from '@/styles/variables.scss'

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
    SiderMenu,
    NavBar
  },
  data () {
    return {
      MediaQueryEnum,
      collapsed: false,
      sideBarWidth: 210,
      variables
    }
  },
  methods: {
    handleMediaQuery (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    height: 100%;

    .main-container {
      width: 100%;
    }
  }
</style>
