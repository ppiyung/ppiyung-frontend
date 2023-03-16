<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-container>
                <b-navbar-brand>
                    <router-link :to="{ name: 'main' }">
                        <img src="/logo.png">
                    </router-link>
                </b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item>
                            <router-link :to="{ name: 'company/recruit' }"
                                :class="{'selected': this.currentMenu === 'recruit'}">
                                채용공고
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link :to="{ name: 'board' }"
                                :class="{'selected': this.currentMenu === 'suggest'}">
                                인재저격
                            </router-link>
                        </b-nav-item>
                    </b-navbar-nav>

                    <b-navbar-nav align="right">
                        <b-nav-item>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </b-nav-item>
                        <b-nav-item>
                            <font-awesome-icon icon="fa-solid fa-bell" />
                        </b-nav-item>
                        <b-nav-item v-if="!isLogin">
                            <router-link :to="{ name: 'login' }">
                                로그인
                            </router-link>
                        </b-nav-item>
                        <b-nav-item v-if="!isLogin">
                            <router-link :to="{ name: 'register' }">
                                회원가입
                            </router-link>
                        </b-nav-item>
                        <b-nav-item-dropdown
                            v-if="isLogin"
                            size="sm"
                            :text="memberInfo.memberNickname + '님'"
                            variant="primary"
                            right>
                            <b-dropdown-item @click="onLogout">로그아웃</b-dropdown-item>
                            <b-dropdown-item>마이페이지</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>
export default {
  methods: {
    onLogout() {
      this.$router.push({ name: 'logout' });
    }
  },
  computed: {
    currentMenu() {
      const { name } = this.$route;
      if (name === 'company/recruit') {
        return 'recruit';
      } if (name === 'company/suggest') {
        return 'suggest';
      } if (name === 'notify/suggest') {
        return 'notify/suggest'
      }
      
      return '';
    },
    memberInfo() {
      return this.$store.getters['auth/memberInfo'];
    },
    isLogin() {
      return this.$store.getters['auth/isLogin'];
    }
  }
};
</script>

<style scoped>
    img {
        height: 48px;
    }

    .navbar-collapse {
        justify-content: space-between;
    }

    a {
        color: #F0F0F0;
        text-decoration-line: none;
    }

    a.selected {
        color: #FFFFFF;
        font-weight: bold;
    }

</style>
