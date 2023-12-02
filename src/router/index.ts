// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        redirect: '/overview'
      },
      {
        path: '/overview',
        name: 'Overview',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
      },
      {
        path: '/what-is-cryptocurrency',
        name: 'What Is Cryptocurrency',
        component: () => import('@/pages/WhatIsCryptocurrency.vue'),
      },
      {
        path: '/investment-tips',
        name: 'Investment Tips',
        component: () => import('@/pages/InvestmentTips.vue'),
      },
      {
        path: '/investment-mistakes',
        name: 'Investment Mistakes',
        component: () => import('@/pages/InvestmentMistakes.vue'),
      },
      {
        path: '/stability',
        name: 'Stability',
        component: () => import('@/pages/Stability.vue'),
      },
      {
        path: '/supply',
        name: 'Supply',
        component: () => import('@/pages/Supply.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0,0);
  }
})

router.beforeEach((to, from, next) => {
  document.title = typeof to.name === 'string' ? to.name : 'Stablecoins';
  next();
});

export default router
