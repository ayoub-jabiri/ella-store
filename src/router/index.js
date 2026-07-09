import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    name: 'products-category',
    path: '/products',
    component: () => import('@/views/ProductsCategory.vue'),
  },
  {
    name: 'products-details',
    path: '/products/product-details/:productId',
    component: () => import('@/views/ProductDetails.vue'),
  },
  {
    name: 'cart-page',
    path: '/cart-page',
    component: () => import('@/views/CartPage.vue'),
  },
  {
    name: 'check-out',
    path: '/checkout',
    component: () => import('@/views/CheckOut.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
