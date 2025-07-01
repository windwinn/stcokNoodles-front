import { createRouter,createWebHistory } from 'vue-router'

import StockWorklists from '../views/StockWorklists.vue'
import StockDetailsFresh from '../views/StockDetailsFresh.vue'
import StockDetailsVetgetable from '../views/StockDetailsVetgetable.vue'
import cmsStock from '../views/CmsStock.vue'

const routes = [
    { path: '/',  name:'StockWorklists', component: StockWorklists },
    { path: '/StockDetailsFresh', name: 'StockDetailsFreshs',component: StockDetailsFresh },
    {
      path: '/StockDetailsFresh/:stockId',
      name: 'StockDetailsFresh',
      component: StockDetailsFresh,
      props: true,
    },
    { path: '/StockDetailsVetgetable', name: 'StockDetailsVetgetables',component: StockDetailsVetgetable },
    {
      path: '/StockDetailsVetgetable/:stockId',
      name: 'StockDetailsVetgetable',
      component: StockDetailsVetgetable,
      props: true,
    },
    { path: '/cmsStock', name: 'cmsStock',component: cmsStock },
  ]
  

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router