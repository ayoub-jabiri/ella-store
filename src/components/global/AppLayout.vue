<template>
  <v-layout class="position-relative">
    <CartDrawer />
    <AppNav v-if="$route.name !== 'check-out'" />
    <FixedNav v-if="$route.name !== 'check-out'" />
    <v-main :style="`${$route.name !== 'check-out' ? 'padding-top: 150px' : ''}`">
      <slot></slot>
    </v-main>
    <AppFooter v-if="$route.name !== 'check-out'" />
  </v-layout>
</template>

<script>
import CartDrawer from './CartDrawer.vue'
import AppNav from './AppNav.vue'
import FixedNav from './FixedNav.vue'
import AppFooter from './AppFooter.vue'
export default {
  components: {
    CartDrawer,
    FixedNav,
    AppNav,
    AppFooter,
  },
}
</script>
