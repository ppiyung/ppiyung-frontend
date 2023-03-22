<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
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
                            <router-link :to="{ name: 'admin/member' }"
                                :class="{'selected': this.currentMenu === 'member'}">
                                회원 관리
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link :to="{ name: 'admin/recruit' }"
                                :class="{'selected': this.currentMenu === 'recruit'}">
                                채용공고 관리
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link :to="{ name: 'admin/board' }"
                                :class="{'selected': this.currentMenu === 'board'}">
                                커뮤니티 관리
                            </router-link>
                        </b-nav-item>
                    </b-navbar-nav>

                    <b-navbar-nav align="right">
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
                            <b-dropdown-item @click="goTo('logout')">로그아웃</b-dropdown-item>
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
    goTo(routeName) {
      this.$router.push({ name: routeName });
    }
  },
  computed: {
    currentMenu() {
      const { name } = this.$route;
      if (name === 'admin/member') {
        return 'member';
      }
      if (name === 'admin/recruit') {
        return 'recruit';
      }
      if (name === 'admin/board') {
        return 'board'
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
