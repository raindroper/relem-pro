import Vue from 'vue'
// base library
import {
  Row,
  Col,
  Pagination,
  Button,
  Select,
  Tabs,
  TabPane,
  Card,
  Input,
  Form,
  FormItem,
  Alert,
  Notification,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  MessageBox,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Avatar,
  Checkbox,
  Tag,
  Popover,
  Loading
} from 'element-ui'
// ext library
// import VueCropper from 'vue-cropper'
// import Dialog from '@/components/Dialog'
// import MultiTab from '@/components/MultiTab'
// import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Select)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Card)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Alert)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DropdownMenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Popover)
// Vue.use(MessageBox)
Vue.use(Avatar)
Vue.use(Loading.directive)
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notification = Notification
Vue.prototype.$loading = Loading.service
// Vue.prototype.$info = Modal.info
// Vue.prototype.$success = Modal.success
// Vue.prototype.$error = Modal.error
// Vue.prototype.$warning = Modal.warning
//
// Vue.use(Dialog) // this.$dialog func
// Vue.use(MultiTab)
// Vue.use(PageLoading)
Vue.use(PermissionHelper)
// Vue.use(VueCropper)
