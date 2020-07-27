export default {
  loadData: {
    type: Function,
    default: null
  },
  columns: {
    type: Array,
    required: true
  },
  staticData: {
    type: Array,
    default: () => []
  },
  data: {
    type: Object,
    default: null
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  showSizeChanger: {
    type: Boolean,
    default: true
  },
  paginationLayout: {
    type: Array,
    default: () => ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']
  },
  checkedBoxFlag: {
    type: Boolean,
    default: false
  },
  reserveSelection: {
    type: Boolean,
    default: true
  },
  tableOperationMenus: {
    type: Array,
    default: () => []
  },
  showRefreshBtn: { // 是否显示刷新按钮
    type: Boolean,
    default: true
  },
  pageFlag: {
    type: Boolean,
    default: true
  },
  form: {
    type: Array,
    default: () => []
  },
  operationMenus: {
    type: Array,
    default: () => []
  },
  operationFlg: {
    type: String,
    default: ''
  },
  operationAlign: {
    type: String,
    default: '',
    validator: value => { // 验证匹配
      const align = ['', 'left', 'right']
      return align.indexOf(value) !== -1
    }
  },
  showQueryBtn: {
    type: Boolean,
    default: true
  },
  selectable: {
    type: Function,
    default: (row) => true
  },
  dir: { // 原始排序方式
    type: String,
    default: 'ascending'
  },
  field: { // 原始排序字段
    type: String,
    default: ''
  },
  autoLoad: {
    type: Boolean,
    default: true
  },
  showSelectColumn: {
    type: Boolean,
    default: true
  },
  frontPaging: {
    type: Boolean,
    default: false
  },
  needReload: {
    type: Function,
    default: () => false
  },
  reloadTime: {
    type: Number,
    default: 5000
  },
  autoReload: {
    type: Boolean,
    default: false
  },
  showSelectedCount: {
    type: Boolean,
    default: true
  },
  tableOperationWidth: {
    type: Number
  },
  expandFlag: {
    type: Boolean,
    default: false
  }
}
