<template>
  <div class="layout">
    <nav-bar v-if="type === 'ROLE_NORMAL' || type === undefined"/>
    <nav-bar-company v-if="type === 'ROLE_COMPANY'" />
    <nav-bar-admin v-if="type === 'ROLE_ADMIN'" />
    <b-container class="main-container">
      <slot>
      </slot>
    </b-container>
    <footer>
      <b-container>
        팀삐융 2023<br>
        KOSA-솔트룩스 교육과정
      </b-container>
    </footer>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import NavBarAdmin from './NavBarAdmin.vue';
import NavBarCompany from './NavBarCompany.vue';

export default {
  computed: {
    type() {
      return this.$store.getters['auth/memberInfo'].role;
    }
  },
  components: {
    NavBar,
    NavBarCompany,
    NavBarAdmin
  }
};
</script>

<style scoped>
.layout {
  min-height: 100%;
}
.main-container {
  margin-top: 30px;
  min-height: 100vh;
  margin-bottom: 60px;
}
footer {
  text-align: center;
  font-size: 80%;
  background-color: #E0E0E0;
  height: 60px;
}
</style>
