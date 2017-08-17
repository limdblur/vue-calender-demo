
export default {
  routes: [
    {path: '/login', name: 'login', component: resolve => require(['../views/login.vue'], resolve), meta: {title: '股份大会'}},
    {path: '/customer', name: 'customer', component: resolve => require(['../views/customer.vue'], resolve), meta: {title: '客户列表'}},
    {path: '/customerDetail', name: 'customerDetail', component: resolve => require(['../views/customerDetail.vue'], resolve), meta: {title: '客户信息'}},
    {path: '/test', name: 'test', component: resolve => require(['../views/test.vue'], resolve), meta: {title: '客户信息'}},
    {path: '/calender', name: 'calender', component: resolve => require(['../views/calender.vue'], resolve), meta: {title: '客户信息'}},
    {path: '', redirect: '/login'}
  ],
  linkActiveClass: 'active'
}
