<script>
/* eslint-disable */
function hex2rgba (hex = '#ffffff', opacity) {
  const red = parseInt(hex.slice(1, 3), 16)
  const green = parseInt(hex.slice(3, 5), 16)
  const blue = parseInt(hex.slice(5, 7), 16)
  const RGBA = `rgba(${red}, ${green}, ${blue}, ${opacity || 1})`
  return {
    red,
    green,
    blue,
    rgba: RGBA
  }
}

const typeList = ['danger', 'success', 'info', 'warning']

export default {
  props: {
    value: String,
    statusList: Array,
    customColor: String,
    dotColorMap: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      type: 'info',
      text: '-',
      tip: '',
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    value (oldVal, newVal) {
      this.init()
    }
  },
  render (h) {
    const dotColorMap = this.dotColorMap ? this.dotColorMap : {
      success: '#00b818',
      warning: '#facc14',
      info: '#0070c0',
      danger: '#f24629'
    }
    const hideDot = (!this.type || this.text === '-')
    const dotColor = dotColorMap[this.type] || this.customColor
    const classes = [
      'status-dot',
      this.type ? 'status-dot__' + this.type : '',
      this.customColor ? 'status-dot__custom' : ''
    ]
    const colorStyle = {
      backgroundImage: `radial-gradient(${hex2rgba(dotColor).rgba} 33.3%, ${hex2rgba(dotColor, 0.3).rgba} 33.3%, ${hex2rgba(dotColor, 0.3).rgba} 100%)`
    }
    const statusDot = (<i class={classes} style={colorStyle}/>)
    const statusText = (<span class="status-text">{this.text}</span>)
    return (<span class="status-container">{(!hideDot || this.customColor) && statusDot} {statusText}</span>)
  },
  methods: {
    // 根据value获取state(图标颜色、状态)
    getState: function (state, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === state) {
          return arr[i]
        }
      }
      return null
    },
    init: function () {
      if (this.statusList instanceof Array) {
        if (
          this.value === null ||
          this.value === '' ||
          this.value === undefined
        ) {
          this.text = '-'
        } else {
          let state = this.getState(this.value, this.statusList)
          if (!state) {
            this.text = this.value
          } else {
            this.text = state.label
            this.type = state.tag
          }
        }
      } else if (this.statusList instanceof Object) {
        this.text = this.statusList.label
        this.type = this.statusList.tag
      }
      this.tip = this.info
    }
  }
}
</script>
<style scoped>
  .status-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .status-text {
    color: #262626;
  }

  .status-dot {
    margin-right: 12px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
  }
</style>
