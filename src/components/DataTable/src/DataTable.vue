<script>
import StatusTag from '@/components/StatusTag/src/StatusTag.vue'
import HrefSlot from '@/components/HrefSlot/src/HrefSlot.vue'
import TableOperation from '@/components/TableOperation/src/TableOperation.vue'
import props from './props'
import { Table } from 'element-ui'

const MethodMapHandler = function () {
  const tableMethods = Object.keys(Table.methods)
  const tableMethodsMap = {}
  tableMethods.forEach(method => {
    tableMethodsMap[method] = (...args) => this.MethodProxy(method, ...args)
  })
  return tableMethodsMap
}
export default {
  name: 'DataTable',
  props: Object.assign({}, Table.props, props),
  data () {
    return {
      localLoading: false,
      localPagination: {},
      localData: [],
      queryForm: {},
      // menusFlg: this.operationFlg ? Vue.AuthList[this.operationFlg] : true,
      menusFlg: this.operationFlg,
      multipleSelection: [],
      columnsCheckedT: [],
      columnFilter: [],
      interval: null,
      ...MethodMapHandler.bind(this)()
    }
  },
  components: {
    StatusTag,
    HrefSlot,
    TableOperation,
    SearchForm: () => import('@/components/SearchForm/src/SearchForm.vue'),
    OperationPanel: () => import('@/components/OperationPanel/src/OperationPanel.vue')
  },
  created () {
    if (this.autoLoad) {
      this.getData()
    }
    this.columnFilter = this.getColumnsChecked()
  },
  methods: {
    Emitter (eventName, ...value) {
      this.$emit(eventName, ...value)
    },
    MethodProxy (method, ...arg) {
      this.$refs.table[method](...arg)
    },
    /**
     * 代理ElementTable行相关method
     * 支持['toggleRowSelection', 'toggleRowExpansion', 'setCurrentRow']三个方法
     * method 方法名
     * option 包含两个属性 prop, value. prop为该行唯一id的key, value为该id的值
     * 第三个及后面的参数为补充参数，合并至ElementTable方法的row参数后面
     * @returns void
     */
    RowMethodProxy (method, option = { prop: 'id', value: '' }, ...arg) {
      if (!['toggleRowSelection', 'toggleRowExpansion', 'setCurrentRow'].includes(method)) {
        throw new Error('RowMethodProxy only support on [\'toggleRowSelection\', \'toggleRowExpansion\', \'setCurrentRow\']')
      }
      const row = this.localData.find(r => r[option.prop] === option.value)
      row && this.$refs.table[method](row, ...arg)
    },
    /**
     * reload数据
     * reset Boolean 重置当前表格状态（分页、排序）
     * @returns void
     */
    reload (reset, showLoading) {
      reset && (this.localPagination = Object.assign({}, { current: 1, pageSize: this.pageSize }))
      this.getData({ showLoading })
    },
    /**
     * 加载数据
     * data对象优先，其次loadData方法，若无则返回staticData || []
     * @returns {*[]|default.methods.staticData}
     */
    getData ({ pagination, filters, sorter, clearSelection, query, showLoading = true } = {}) {
      const { data, loadData, staticData } = this
      const frontPaging = (this.data && this.data.frontPaging) || this.frontPaging || false
      showLoading && (this.localLoading = true)
      const resHandler = (res) => {
        const data = res.data || []
        // 前端自行分页
        if (frontPaging) {
          this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
            // TODO 此处需要根据接口修改
            current: (pagination && pagination.current) || this.localPagination.current || 1,
            total: data.length,
            showSizeChanger: this.showSizeChanger,
            pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize || 10
          })
          const start = (this.localPagination.current - 1) * this.localPagination.pageSize
          const end = this.localPagination.current * this.localPagination.pageSize
          this.localData = data.slice(start, end)
          this.localLoading = false
          this.Emitter('table-data-loaded', data || [])
          this.autoReloadRegister(this.localData)
          return
        }
        this.localPagination = (this.showPagination && Object.assign({}, this.localPagination, {
          // TODO 此处需要根据接口修改
          current: res.pageNo,
          total: res.total,
          showSizeChanger: this.showSizeChanger,
          pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize
        })) || false
        if (data.length === 0 && this.showPagination && this.localPagination.current > 1) {
          // 当前页面数据长度为0至上一页
          this.localPagination.current--
          this.getData()
          return
        }
        this.localData = data
        this.localLoading = false
        this.Emitter('table-data-loaded', data || [])
        this.autoReloadRegister(this.localData)
      }
      // TODO 字段名需根据业务修改
      const parameter = Object.assign({
          pageNo: (pagination && pagination.current) || (this.showPagination && this.localPagination.current) || this.pageNum,
          pageSize: (pagination && pagination.pageSize) || (this.showPagination && this.localPagination.pageSize) || this.pageSize
        },
        (sorter && sorter.field && { sortColumn: sorter.field }) || (this.field && { sortColumn: this.field }) || {},
        (sorter && sorter.order && { sortType: sorter.order }) || (this.dir && { sortType: this.dir }) || {},
        { ...filters },
        this.queryForm || {}
      )
      if (data) {
        if (!this.$axios) {
          console.error('need $axios, please install axios first!')
          throw new Error('need $axios, please install axios first!')
          // return []
        }
        const reqData = parameter
        const params = parameter
        this.$axios({
          method: data.method || 'get',
          params,
          data: reqData,
          url: data.url
        }).then(res => {
          // TODO 需根据业务调整
          resHandler(res)
        }).finally(() => {
          this.localLoading = false
        })
      } else if (loadData) {
        const result = this.loadData(parameter)
        if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
          result.then(res => {
            resHandler(res)
          })
        }
      } else {
        return staticData || []
      }
    },
    currentPaginationChange (current) {
      this.localPagination.current = current
      this.reload()
    },
    paginationSizeChange (size) {
      this.localPagination.pageSize = size
      this.reload()
    },
    selectionChange (rows) {
      if (this.checkedBoxFlag) {
        this.multipleSelection = rows
        this.Emitter('selection-change', rows)
      }
    },
    query (form) {
      form && (this.queryForm = form)
      this.reload(true)
    },
    getColumnsChecked () {
      const r = []
      this.allColumns = []
      this.allColumns = this.columns.map(col => {
        !col.hide && (r.push(col.prop))
        return col.prop
      })
      const oldChecked = localStorage.getItem(this.getColumnsCheckedKeys())
      if (oldChecked) {
        return oldChecked.split(',')
      }
      return r
    },
    getColumnsCheckedKeys () {
      // 用路由原始路径(matched.path)+每列prop首字母拼起来作为key
      const matched = this.$route ? this.$route.matched : [window.location.href]
      const pathKeys = matched[matched.length - 1].path || matched[matched.length - 1]
      let colKeys = ''
      this.allColumns.forEach(element => {
        element && (colKeys += element[0])
      })
      return pathKeys + colKeys
    },
    columnsFilterChange (event, index, prop) {
      this.columnFilterModel[index] = event.target.checked
      const checked = event.target.checked
      if (checked) {
        this.columnFilter.push(prop)
      } else {
        const index = this.columnFilter.indexOf(prop)
        index > -1 && this.columnFilter.splice(index, 1)
      }
      localStorage.setItem(this.getColumnsCheckedKeys(), this.columnFilter)
      this.$nextTick(() => {
      })
    },
    currentChange (row, oldRow) {
      if (!this.checkedBoxFlag) {
        const arg = row ? [row] : []
        this.multipleSelection = arg
        this.Emitter('selection-change', arg, oldRow)
      }
    },
    rowClick (row, column, e) {
      if (!((column.selectable !== undefined && !column.selectable(row)) || !this.selectable(row))) {
        this.$refs.table.toggleRowSelection(row)
      }
      this.Emitter('row-click', ...arguments)
    },
    sortChange (obj) {
      if (!obj.prop) {
        return
      }
      const sorter = { order: obj.order === 'ascending' ? 'asc' : 'desc' }
      this.getData({ sorter })
    },
    autoReloadRegister (data) {
      if (!this.autoReload) {
        return
      }
      if (data) {
        const reloadFlag = data.findIndex(row => this.needReload(row)) > -1
        if (reloadFlag) {
          if (this.interval) {
            clearTimeout(this.interval)
          }
          this.interval = setTimeout(() => {
            this.reload(false, false)
          }, this.reloadTime)
        }
      }
    }
  },
  computed: {
    columnFilterModel: {
      get: function () {
        return this.columns.map(col => this.columnFilter.includes(col.prop))
      },
      set: function (value) {
        localStorage.setItem(this.getColumnsCheckedKeys(), value)
      }
    }
  },
  render (h) {
    const {
      columns,
      staticData,
      $props,
      localPagination,
      paginationLayout,
      localLoading,
      checkedBoxFlag,
      reserveSelection,
      $scopedSlots,
      tableOperationMenus,
      showRefreshBtn,
      showPagination,
      form,
      operationMenus,
      menusFlg,
      operationAlign,
      showQueryBtn,
      queryForm,
      multipleSelection,
      selectable,
      showSelectColumn,
      columnFilter,
      columnFilterModel,
      showSelectedCount,
      tableOperationWidth,
      expandFlag,
      pageFlag
    } = this
    const props = {}
    const localKeys = Object.keys(this.$data)
    // 遍历Table props
    Object.keys(Table.props).forEach(k => {
      const localKey = `local${k.substr(0, 1).toUpperCase()}${k.substring(1)}`
      // 如果本地已定义则使用本地
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })

    // 若存在staticData则直接使用
    if ($props.staticData.length) {
      this.localData = $props.staticData
    }
    props.data = this.localData

    const colRender = (col, props, index) => {
      if (col.slotName) {
        return ($scopedSlots[col.slotName](props.row, index, props.row[col.prop]) || props.row[col.prop])
      }
      if (col.render) {
        return (<span>{col.render(props.row)}</span>)
      }
      if (col.statusTag) {
        return (<status-tag value={props.row[col.prop]} statusList={col.statusTag(props.row)}/>)
      }
      if (col.href) {
        return (<href-slot text={props.row[col.prop]} onHrefFun={col.href(props.row)}/>)
      }
      if (col.formatter) {
        return (<span>{col.formatter(props.row, props.column, props.row[col.prop], props.$index)}</span>)
      }
      return (<span>{props.row[col.prop]}</span>)
    }

    const colHeaderRender = (col, prop) => {
      if (col.headerSlot) {
        return $scopedSlots[col.headerSlot](col)
      } else {
        return <span>{col.label}</span>
      }
    }

    const operationRender = (props) => {
      return (<table-operation rowData={props.row} tableOperationMenus={tableOperationMenus}/>)
    }

    const tableHeader = (
      <div class="table-header-wrapper"
           style={{ justifyContent: operationAlign === 'left' ? 'flex-start' : 'flex-end' }}
           gutter={20}
      >
        {this.$slots.extra}
        {(form.length && menusFlg) && (
          <div class="query-panel-wrapper">
            <search-form showQuery={showQueryBtn} form={form} queryForm={queryForm} onSetQuery={this.query}/>
          </div>
        )}
        {operationMenus.length > 0 && (
          <operation-panel selectRows={multipleSelection} operationMenus={operationMenus}/>)}
      </div>
    )

    const pagination = (
      <el-pagination layout={paginationLayout.join(', ')} current-page={localPagination.current}
                     page-size={localPagination.pageSize}
                     onCurrent-change={this.currentPaginationChange}
                     onSize-change={this.paginationSizeChange}
                     total={localPagination.total}
      />
    )

    const columnFilterRender = (
      <el-popover
        placement="right"
        trigger="click">
        <div class="col-filter-container">
          {columns.filter(col => (col.show === undefined ? true : col.show))
            .map((col, index) => (
              <el-checkbox
                className="item"
                label={col.prop}
                key={col.prop}
                value={columnFilterModel[index]}
                disabled={columnFilter.length <= 1 && columnFilter.includes(col.prop)}
                onChange={() => this.columnsFilterChange(event, index, col.prop)}
              >
                {col.label}
              </el-checkbox>
            ))}
        </div>
        <el-tag slot="reference" class="name-wrapper">选择列</el-tag>
      </el-popover>
    )

    const tableFooter = (
      <el-row class="table-footer-wrapper" type="flex" jusity="start">
        <el-col span={6}>
          {showRefreshBtn && (<el-button type="text" icon="el-icon-refresh" onClick={this.reload}></el-button>)}
          {showSelectedCount && multipleSelection && (<span>当前选中{multipleSelection.length}条</span>)}
          {showSelectColumn && columnFilterRender}
        </el-col>
        <el-col span={18}>
          {showPagination && pagination}
        </el-col>
      </el-row>
    )

    const tableEmit = [
      'select',
      'select-all',
      'cell-mouse-enter',
      'cell-mouse-leave',
      'cell-click',
      'cell-dblclick',
      'row-dblclick',
      'row-contextmenu',
      'header-click',
      'filter-change',
      'header-dragend',
      'expand-change',
      'row-contextmenu',
      'header-contextmenu'
    ]

    const tableEmitMap = {}

    tableEmit.forEach(event => {
      tableEmitMap[event] = (...args) => this.Emitter(event, ...args)
    })

    const TableColumn = function (col, index) {
      return (<el-table-column
        {...{
          props: Object.assign({}, col, {
            ...col,
            align: col.align,
            sortable: col.sort,
            showOverflowTooltip: !col.isTooltip
          }),
          scopedSlots: {
            default: (props) => {
              return colRender(col, props, props.$index)
            },
            header: (prop) => {
              return colHeaderRender(col, prop)
            }
          }
        }}
      >
        {col.children &&
        col.children.length &&
        (col.children.filter(child => (child.show === undefined || child.show)).map((child, index) => TableColumn(child, index)))}
      </el-table-column>)
    }
    const table = (
      <el-table
        {...{
          props,
          class: 'table-wrapper',
          data: { staticData },
          directives: [{ name: 'loading', value: localLoading }],
          on: {
            'selection-change': this.selectionChange,
            'current-change': this.currentChange,
            'row-click': this.rowClick,
            'sort-change': this.sortChange,
            ...tableEmitMap
          },
          ref: 'table'
        }}>
        {checkedBoxFlag && (
          <el-table-column
            type="selection"
            align="center"
            reserve-selection={reserveSelection}
            selectable={selectable}
          />)}
        {
          expandFlag && (
            <el-table-column {...{
              props: { type: 'expand' },
              scopedSlots: {
                default: (prop) => {
                  return $scopedSlots.expandOperate({ $index: prop.$index, row: prop.row })
                }
              }
            }}/>
          )
        }
        {/* this.$slots.expandOperate */}
        {columns.filter(col => ((col.show === undefined || col.show) && (!col.prop || columnFilter.includes(col.prop)))).map((col, index) => {
            return TableColumn(col, index)
          }
        )}
        {tableOperationMenus.length && (
          <el-table-column
            label={'操作'}
            showOverflowTooltip={false}
            width={tableOperationWidth + 'px'}
            scopedSlots={
              {
                default: (props) => {
                  return operationRender(props)
                }
              }
            }
          />
        )}
      </el-table>
    )

    return (
      <div class="cbb-table_container">
        {(this.$slots.extra || form.length || (operationMenus.length > 0 && menusFlg)) && tableHeader}
        {table}
        {pageFlag && tableFooter}
      </div>
    )
  }
}
</script>

<style scoped>
  .table-wrapper >>> .cell.el-tooltip {
    max-width: 100% !important;
  }

  .table-footer-wrapper {
    margin: 10px 0;
    position: relative;
    text-align: left;
  }

  .item {
    display: block;
    padding: 0 0 5px 0;
  }

  .name-wrapper {
    display: inline-block;
  }

  .vertical .el-checkbox + .el-checkbox {
    margin-left: 0;
  }

  .el-pagination {
    float: right;
  }

  .operation-panel {
    /*padding: 16px;*/
  }

  .table-header-wrapper {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 12px 0;
  }

  .table-header-wrapper .table-header-extra-wrapper {
    flex-grow: 1;
    margin-right: 16px;
  }

  .col-filter-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 40px;
  }

  .query-panel-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .operation-panel-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
