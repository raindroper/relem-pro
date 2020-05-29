<template>
  <div class="nav-bar">
    <div class="nav-left">
      <div class="toggle-side-btn transition" @click="toggleSideBar">
        <i :class="sideBarHide ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
    </div>
    <div class="nav-right">
      <div class="user hover transition">
        <el-dropdown>
          <el-avatar :size="'small'"
                     :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{$t('menu.home')}}</el-dropdown-item>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <div class="i18n hover transition" @click="toggleLang">
        <i class="el-icon-s-tools"></i>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { TOGGLE_SIDE_BAR } from '@/store/mutation-types'

export default {
  name: 'NavBar',
  methods: {
    ...mapMutations([TOGGLE_SIDE_BAR]),
    ...mapActions(['setLang']),
    toggleSideBar () {
      this[TOGGLE_SIDE_BAR]()
    },
    toggleLang () {
      const lang = this.$i18n.locale === 'en' ? 'zh-CN' : 'en'
      this.setLang(lang)
    }
  },
  computed: {
    ...mapGetters(['sideBarHide'])
  }
}
</script>

<style scoped lang="scss">
  .hover {
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }

  .nav-bar {
    height: 64px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-left {
      height: 100%;

      .toggle-side-btn {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        line-height: 64px;
        cursor: pointer;
        background: rgba(0, 0, 0, 0);
        font-size: 24px;
        color: #666666;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .nav-right {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .user {
        padding: 0 12px;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .i18n {
        padding: 0 12px;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 26px;
        color: #666666;
        line-height: 64px;
        vertical-align: middle;
      }
    }

  }
</style>
