<template>
  <div>
    <nav-bar v-if="!isCompany" />
    <nav-bar-company v-if="isCompany" />
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
import NavBarCompany from './NavBarCompany.vue';

export default {
  computed: {
    isCompany() {
      return this.$store.getters['auth/memberInfo'].memberType === 'C';
    }
  },
  components: {
    NavBar,
    NavBarCompany
  }
};
</script>

<style scoped>
.main-container {
  margin-top: 30px;
  min-height: 800px;
}
footer {
  text-align: center;
  font-size: 80%;
  background-color: #E0E0E0;
  height: 60px;
}
</style>
