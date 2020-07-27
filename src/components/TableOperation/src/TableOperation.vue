/**
* 表格行内操作，接收两个参数：
* rowData：操作所在行数据
* tableOperationMenus：操作按钮定义数组
* 示例：
* [
*    {
*      icon: "fa-plus", // 操作按钮图标
*      name: this.$t('lang.create'), // 操作名称
*      showflg: true/false, // 是否显示标志位
*      readOnly: true, // 是否只读标志位,只读按钮不受表格数据限制,一般用于创建等操作
*      multi: false, // 是否支持批量操作
*      operateMore: true/false, // 是否折叠操作按钮到更多操作中
*      enable:function (row) {
*        return true; // 是否启用按钮, 参数为表格某一行数据
*      }.bind(this),
*      handler: function(rows) {
*        // 按钮回调处理,参数为所有选中的表格行数据数组
*      }.bind(this)
*     }, {
*    // ...
*    }
* ]
*/
<template>
  <!-- eslint-disable -->
  <div>
    <template v-for="(menu, index) in menus">
      <el-button
        type="text"
        :icon="menu.icon"
        :disabled="!menu.enableFlg"
        :title="menu.name"
        @click="menu.handler(rowData, $event)"
        :key="index"
        v-if="menu.showFlg"
      ></el-button>
    </template>
    <el-dropdown trigger="hover" v-if="menusMore && menusMore.length > 0" @command="menusMoreHandler">
      <el-button type="text">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <template v-for="(menu, index) in menusMore">
          <el-dropdown-item
            class="clearfix"
            :icon="menu.icon"
            :key="index"
            :disabled="!menu.enableFlg"
            :command="index"
            v-if="menu.showFlg"
          >{{menu.name}}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'TableOperation',
  props: {
    rowData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableOperationMenus: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      menus: this.initMenus(),
      menusMore: this.initMoreMenus()
    }
  },
  computed: {},
  watch: {
    rowData: {
      handler: function (rows, oldVal) {
        this.reset(rows)
      },
      deep: true
    },
    tableOperationMenus: {
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
    initMenus () {
      const menus = []
      this.tableOperationMenus.forEach((item, index) => {
        const menu = item
        menu.enableFlg = menu.enable(this.rowData) || false
        menu.showFlg = menu.show(this.rowData) || false
        if (!menu.operateMore) {
          menus.push(menu)
        }
      })
      return menus
    },
    initMoreMenus () {
      const menus = []
      this.tableOperationMenus.forEach((item, index) => {
        const menu = item
        menu.enableFlg = menu.enable(this.rowData) || false
        menu.showFlg = menu.show(this.rowData) || false
        if (menu.operateMore) {
          menus.push(menu)
        }
      })
      return menus
    },
    menusMoreHandler (index, row) {
      this.menusMore[index].handler(this.rowData)
    },
    reset (rows) {
      this.menus.forEach((item, index) => {
        const menu = item
        menu.enableFlg = menu.enable(this.rowData) || false
        menu.showFlg = menu.show(this.rowData) || false
        this.menus.splice(index, 1, menu)
      })
      // 折叠按钮
      this.menusMore.forEach((item, index) => {
        const menu = item
        menu.enableFlg = menu.enable(this.rowData) || false
        menu.showFlg = menu.show(this.rowData) || false
        this.menusMore.splice(index, 1, menu)
      })
    }
  }
}
</script>
<style scoped>
</style>
