<template>
  <div>
    <nav-bar />
    <b-container class="main-container">
      <b-row>
          <slot>
          </slot>
      </b-row>
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

export default {
  components: {
    NavBar
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
