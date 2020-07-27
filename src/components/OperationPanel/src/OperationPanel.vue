/**
* 表格顶部操作，接收三个参数：
* selectRows：选中的表格行数据,数组形式
* operationMenus：操作按钮定义数组
* flg：是否显示操作按钮,保留参数,暂时未使用
* 示例：
* [
*    {
*      icon: "fa-plus", // 操作按钮图标
*      name: this.$t('lang.create'), // 操作名称
*      operateMore: true/false, // 是否折叠操作按钮到更多操作中
*      show: function (row) {
*        return true; // 是否显示标志位, 参数为表格某一行数据
*      }.bind(this),
*      enable:function (row) {
*        return true; // 是否启用按钮, 参数为表格某一行数据
*      }.bind(this),
*      handler: function(rows) {
*        // 按钮回调处理, 参数为表格某一行数据
*      }.bind(this)
*     }, {
*    // ...
*    }
* ]
*/
<template>
  <!-- eslint-disable -->
  <div class="operation-panel__wrapper" v-if="menusFlg">
    <template v-for="(menu, index) in menus">
      <el-button
        type="primary"
        :icon="iconTran(menu.icon)"
        :disabled="!!!menu.enableFlg"
        @click="menu.handler(selectRows, $event)"
        :key="index"
        v-if="menu.showflg"
        class="op-btn"
      >{{menu.name}}
      </el-button>
    </template>
    <el-dropdown trigger="hover" v-if="menusMore && menusMore.length > 0" @command="menusMoreHandler">
      <el-button type="primary"
                 class="op-btn">
        {{$t('lang.operationMore')}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <template v-for="(menu, index) in menusMore">
          <el-dropdown-item
            class="clearfix"
            :icon="iconTran(menu.icon)"
            :key="index"
            :disabled="!!!menu.enableFlg"
            :command="index"
            v-if="menu.showflg"
          >{{menu.name}}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'OperationPanel',
  props: {
    selectRows: {
      type: Array,
      default: () => {
        return []
      }
    },
    operationMenus: {
      type: Array,
      default: () => {
        return []
      }
    },
    flg: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {
      menus: this.initMenus(),
      menusMore: this.initMoreMenus(),
      menusFlg: this.flg ? Vue.AuthList[this.flg] : true
    }
  },
  computed: {},
  watch: {
    selectRows: {
      handler: function (rows, oldVal) {
        this.reset(rows)
      },
      deep: true
    },
    operationMenus: {
      handler: function (rows, oldVal) {
        this.menus = this.initMenus()
        this.menusMore = this.initMoreMenus()
      },
      deep: true
    }
  },
  mounted () {
  },
  methods: {
    iconTran (value) {
      return value
    },
    initMenus () {
      const menus = []
      this.operationMenus.forEach((item, index) => {
        const menu = item
        menu.enableFlg = false
        if (menu.readOnly) {
          menu.enableFlg = true
        }
        if (!menu.operateMore) {
          menus.push(menu)
        }
      })
      return menus
    },
    initMoreMenus () {
      const menus = []
      this.operationMenus.forEach((item, index) => {
        const menu = item
        menu.enableFlg = menu.readOnly
        if (menu.operateMore) {
          menus.push(menu)
        }
      })
      return menus
    },
    menusMoreHandler (index, row) {
      this.menusMore[index].handler(this.selectRows)
    },
    reset (rows) {
      this.menus.forEach((item, index) => {
        const menu = item
        if (menu.readOnly) {
          menu.enableFlg = true
        } else if (rows.length <= 0) {
          menu.enableFlg = false
        } else if (!menu.multi && rows.length > 1) {
          menu.enableFlg = false
        } else {
          let flg = true
          rows.forEach((row, index) => {
            if (!menu.enable(row)) {
              flg = false
            }
          })
          menu.enableFlg = flg
        }
        this.menus.splice(index, 1, menu)
      })
      // 更多菜单
      this.menusMore.forEach((item, index) => {
        const menu = item
        if (menu.readOnly) {
          menu.enableFlg = true
        } else if (rows.length <= 0) {
          menu.enableFlg = false
        } else if (!menu.multi && rows.length > 1) {
          menu.enableFlg = false
        } else {
          let flg = true
          rows.forEach((row, index) => {
            if (!menu.enable(row)) {
              flg = false
            }
          })
          menu.enableFlg = flg
        }
        this.menusMore.splice(index, 1, menu)
      })
    }
  }
}
</script>
<style scoped>
  .operation-panel__wrapper {
    /*padding: 16px;*/
    /*margin-top: 10px;*/
    margin-left: 20px;
  }

  .op-btn {
    /*height: 32px;*/
    /*font-size: 14px;*/
    margin-right: 16px;
    margin-left: 0;
  }
</style>
