import StatusTag from './src/StatusTag.vue'

StatusTag.install = function (Vue) {
    Vue.component(StatusTag.name, StatusTag)
}

export default StatusTag
