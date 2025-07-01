import { createRouter,createWebHistory } from 'vue-router'

import StockWorklistsFresh from '../views/freshFood/StockWorklistsFresh.vue'
import StockDetailsFresh from '../views/freshFood/StockDetailsFresh.vue'
import StockWorklistsVetgetable from '../views/vetgetable/StockWorklistsVetgetable.vue'
import StockDetailsVetgetable from '../views/vetgetable/StockDetailsVetgetable.vue'
import cmsStock from '../views/cms/CmsStock.vue'

const routes = [
    { path: '/',  name:'StockWorklistsFresh', component: StockWorklistsFresh },
    { path: '/StockDetailsFresh', name: 'StockDetailsFreshs',component: StockDetailsFresh },
    {
      path: '/StockDetailsFresh/:stockId',
      name: 'StockDetailsFresh',
      component: StockDetailsFresh,
      props: true,
    },
    { path: '/StockWorklistsVetgetable',  name:'StockWorklistsVetgetable', component: StockWorklistsVetgetable },
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