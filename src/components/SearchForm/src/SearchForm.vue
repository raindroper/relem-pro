<template>
  <el-form :model="queryForm" :inline="inline"
           ref="form" @submit.native.prevent="query()"
           :label-width="labelWidth ? typeof labelWidth === 'string' ? labelWidth : (labelWidth + 'px') : ''">
    <el-form-item class="qp-form-item" v-for="queryItem in formHandled" :key="queryItem.key"
                  :label="queryItem.hideLabel ? '' : queryItem.label">
      <template v-if="queryItem.type === 'selector'">
        <el-select class="qp-select" v-model="queryForm[queryItem.key]"
                   @change="selectChange(queryItem.key, $event, queryItem.immediateQuery)"
                   :disabled="queryItem.disabled"
                   :placeholder="queryItem.placeholder"
                   :clearable="queryItem.clearable"
                   @clear="queryItem.clearMethod || (queryItem.immediateQuery && query)"
                   :style="Object.assign({}, queryItem.style,{width: queryItem.width})">
          <el-option
            v-for="option in queryItem.selectColumns"
            :key="queryItem.selectProp && option[queryItem.selectProp.value] || option.value"
            :value="queryItem.selectProp && option[queryItem.selectProp.value] || option.value"
            :label="queryItem.selectProp && option[queryItem.selectProp.label] || option.label"
          />
        </el-select>
      </template>
      <template v-if="queryItem.type === 'remoteSelector'">
        <el-select class="qp-select" v-model="queryForm[queryItem.key]"
                   filterable remote :remote-method="queryItem.remoteMethod"
                   @change="selectChange(queryItem.key, $event, queryItem.immediateQuery)"
                   :style="Object.assign({}, queryItem.style,{width: queryItem.width})"
                   clearable @clear="queryItem.clearMethod">
          <el-option v-for="option in queryItem.selectColumns"
                     :key="queryItem.selectProp && option[queryItem.selectProp.value] || option.value"
                     :value="queryItem.selectProp && option[queryItem.selectProp.value] || option.value"
                     :label="queryItem.selectProp && option[queryItem.selectProp.label] || option.label"
          />
        </el-select>
      </template>
      <template v-else-if="queryItem.type === 'input' || !queryItem.type ">
        <el-input v-model="queryForm[queryItem.key]"
                  @change="inputChange(queryItem.key, $event, queryItem.immediateQuery)"
                  :readonly="queryItem.readonly"
                  :disabled="queryItem.disabled"
                  :placeholder="queryItem.placeholder"
                  :clearable="queryItem.clearable"
                  @clear="queryItem.clearMethod || query"
                  :style="Object.assign({}, queryItem.style,{width: queryItem.width})"
        />
      </template>
      <template v-else-if="queryItem.type === 'daterange'">
        <el-date-picker
          @change="daterangeChange($event, {
            key: queryItem.key,
            handler: queryItem.dateHandler,
            dateProp: queryItem.dateProp,
            removeOriginDate: queryItem.removeOriginDate,
            immediateQuery: queryItem.immediateQuery
          })"
          type="daterange"
          v-model="queryForm[queryItem.key]"
          :disabled="queryItem.disabled"
          :placeholder="queryItem.placeholder"
          :clearable="queryItem.clearable"
          :style="Object.assign({}, queryItem.style,{width: queryItem.width})"
          :editable="queryItem.editable || false"
          :range-separator="queryItem.rangeSeparator"
          :start-placeholder="queryItem.startPlaceholder"
          :end-placeholder="queryItem.endPlaceholder"
        />
      </template>
      <template v-else-if="queryItem.type === 'checkbox'">
        <el-checkbox v-model="queryForm[queryItem.key]"
                     @change="checkboxChange(queryItem.key, $event, queryItem.immediateQuery)"
                     :true-label="queryItem.trueLabel"
                     :false-label="queryItem.falseLabel">
          {{queryItem.label}}
        </el-checkbox>
      </template>
      <template v-else-if="queryItem.type === '`search`'">
        <el-input v-model="queryForm[queryItem.key]"
                  @change="inputChange(queryItem.key, $event, queryItem.immediateQuery)"
                  :readonly="queryItem.readonly"
                  :disabled="queryItem.disabled"
                  :placeholder="queryItem.placeholder"
                  :clearable="queryItem.clearable"
                  @clear="query"
                  :style="Object.assign({}, queryItem.style,{width: queryItem.width})">
          <el-button @click="query" type="primary" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </template>
    </el-form-item>
    <template v-if="showQuery">
      <el-button type="primary" class="qp-button" @click="query" icon="fa-search">
        {{'查询'}}
      </el-button>
    </template>
  </el-form>
</template>

<script>
// TODO selectColumns 动态获取
export default {
  name: 'SearchForm',
  props: {
    form: {
      type: Array,
      required: true
    },
    inline: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String || Number,
      default: ''
    },
    queryForm: {
      type: Object,
      default: null
    },
    showQuery: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'queryForm',
    event: 'setQuery'
  },
  data () {
    return {}
  },
  methods: {
    checkboxChange (key, value, immediateQuery) {
      this.$emit('setQuery', Object.assign({}, this.queryForm, { [key]: value }))
      immediateQuery && this.query()
    },
    selectChange (key, value, immediateQuery) {
      this.$emit('setQuery', Object.assign({}, this.queryForm, { [key]: value }))
      immediateQuery && this.query()
    },
    inputChange (key, value, immediateQuery) {
      this.$emit('setQuery', Object.assign({}, this.queryForm, { [key]: value }))
      immediateQuery && this.query()
    },
    daterangeChange (date, option) {
      const { key, handler, dateProp, removeOriginDate = true, immediateQuery } = option
      const dateHandler = handler || ((date, dateProp = ['startTime', 'endTime']) => {
        const dateObj = {}
        dateProp.forEach((d, i) => {
          dateObj[dateProp[i]] = date[i].getTime()
        })
        return dateObj
      })
      const origin = Object.assign({}, this.queryForm, dateHandler(date, dateProp))
      removeOriginDate && (delete origin[key])
      this.$emit('setQuery', origin)
      immediateQuery && this.query()
    },
    query () {
      this.$emit('query', this.queryForm)
    }
  },
  computed: {
    formHandled () {
      return this.form.filter(i => !!i.type && i.type !== 'empty')
    }
  }
}
</script>

<style scoped>
  .qp-form-item {
    margin-right: 14px;
    margin-left: 0;
  }
</style>
