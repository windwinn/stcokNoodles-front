import { createRouter,createWebHistory } from 'vue-router'

import stockNew from '../views/StockNew.vue'
import stockDetailsNew from '../views/StockDetailsNew.vue'
import cmsStock from '../views/CmsStock.vue'

const routes = [
    { path: '/',  name:'stockNew', component: stockNew },
    { path: '/stockDetailsNew', name: 'stockDetailNew',component: stockDetailsNew },
    {
      path: '/stockDetailsNew/:stockId',
      name: 'stockDetailsNew',
      component: stockDetailsNew,
      props: true,
    },
    { path: '/cmsStock', name: 'cmsStock',component: cmsStock },
  ]
  

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router