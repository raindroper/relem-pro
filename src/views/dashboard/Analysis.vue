<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        v-if="toogle"
        label="日期1"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <button @click="toogle = !toogle">toggle</button>
  </div>
</template>

<script>
// import Grand from '@/components/test/grand'
export default {
  name: 'Analysis',
  data () {
    return {
      toogle: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    timeChange (argument, type) {
      const dataString = argument[1] // 这里看下源码确认一下索引
      this.formData.contract_signing_time = dataString
      console.log(argument)
      console.log(type)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },
  mounted () {
    console.log(this.$router)
  }
}
</script>

<style scoped>

</style>
