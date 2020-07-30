<template>
  <div class="page-container">
    <div class="table-page-search-wrapper">
      <el-form :inline="true">
        <el-form-item label="审批人">
          <el-input v-model="queryForm.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-action:add type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <data-table
      :columns="columns"
      :loadData="loadData"
      ref="table"
    >
      <span slot="serial" slot-scope="scope, index">
        {{ index }}
      </span>
      <template slot="action">
        <el-button>删除</el-button>
        <el-button>删除2</el-button>
      </template>
    </data-table>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable/src/DataTable'
import { getSearchTable } from '@/api/table'

// const columns = [
//   {
//     prop: 'nodeName',
//     label: 'ss'
//   }
// ]

const columns = [
  {
    label: '#',
    slotName: 'serial',
    prop: 'serial'
  },
  {
    label: '规则编号',
    prop: 'no'
  },
  {
    label: '描述',
    prop: 'description',
    scopedSlots: { customRender: 'description' }
  },
  {
    label: '服务调用次数',
    prop: 'callNo',
    sorter: true,
    needTotal: true,
    render: (row, index, text) => text + ' 次'
  },
  {
    label: '状态',
    prop: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    label: '更新时间',
    prop: 'updatedAt',
    sorter: true
  },
  {
    label: '操作',
    prop: 'action',
    width: '150px',
    slotName: 'action'
  }
]

export default {
  name: 'SearchTable',
  components: {
    DataTable
  },
  data () {
    return {
      queryForm: {},
      columns,
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryForm)
        console.log('loadData request parameters:', requestParameters)
        return getSearchTable(requestParameters)
          .then(res => {
            return res.result
          })
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('onSubmit')
      this.$refs.table.reload()
    },
    testAPI () {
      this.$http({
        method: 'GET',
        url: 'http://localhost:3000/test'
      })
    }
  },
  created () {
    this.testAPI()
  }
}
</script>

<style scoped>

</style>
