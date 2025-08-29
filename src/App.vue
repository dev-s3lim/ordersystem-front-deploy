<template>
  <v-app>
    <HeaderComponent />
    <v-main>
      <router-view />
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'

export default {
  name: 'App',

  components: {
    HeaderComponent: AppHeader,
    FooterComponent: AppFooter
  },
}
</script>

<style>
/* 전역 스타일 정의 가능 */
</style>
