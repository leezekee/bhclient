import Vue from 'vue'
import VueRouter from 'vue-router'

import Test from '@/views/Test.vue'
import RotatingMachineryOverView from '@/views/RotatingMachinery/RotatingMachineryOverView.vue'
import DieselMonitorSystemOverView from '@/views/DieselMonitorSystem/DieselMonitorSystemOverView.vue'
import ReciprocatMachineryOverView from '@/views/ReciprocatMachinery/ReciprocatMachineryOverview.vue'
import UnitOverView from '@/views/Unit/UnitOverview.vue'

Vue.use(VueRouter)

const routes = [
  // {path: '/', redirect: '/RotatingMachinery/Overview?uuid=1d3c2bc4d7e2b67bffb8c5b2162dcbb1'},
  {path: '/RotatingMachinery/Overview', component: RotatingMachineryOverView},
  {path: '/DieselMonitorSystem/Overview', component: DieselMonitorSystemOverView},
  {path: '/ReciprocatMachinery/Overview', component: ReciprocatMachineryOverView},
  {path: '/Unit/OverView', component: UnitOverView},
  {path: '/test', component: Test}
]

const router = new VueRouter({
  routes
})

export default router
