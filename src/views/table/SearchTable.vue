<template>
  <div class="page-container">
    <div class="table-page-search-wrapper">
      <el-form :inline="true">
        <el-form-item label="审批人">
          <el-input v-model="queryForm.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
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
    customRender: (text) => text + ' 次'
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
    scopedSlots: { customRender: 'action' }
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
    }
  }
}
</script>

<style scoped>

</style>
