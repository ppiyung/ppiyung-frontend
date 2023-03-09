<template>
  <div>
    <nav-bar />
    <b-container>
      <b-row>
          <slot>
          </slot>
      </b-row>
    </b-container>
    <footer>
      <b-container>
                  팀삐융 2023<br>
          @KOSA-솔트룩스 교육
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
.container {
  margin-top: 30px;
  min-height: 600px;
}
</style>
