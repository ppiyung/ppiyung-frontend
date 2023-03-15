<template>
    <base-layout>
        <h1>{{memberDetail.memberName}}</h1>

        <section class="section-applying">
            <h2>현재 진행중인 채용</h2>
        </section>

        <section class="section-introduce">
            <h2>회사 소개</h2>
            <img :src="profileImgSrc"
            class="profile-img">
            
            {{memberDetail.memberInfo}}
            
            <company-profile-map
                :coordX="memberDetail.memberCoordX"
                :coordY="memberDetail.memberCoordY"
            />
        </section>
    </base-layout>
</template>

<script>
import BaseLayout from '@/components/common/BaseLayout.vue';
import CompanyProfileMap from '@/components/member/CompanyProfileMap.vue';

export default {
    components: {
        BaseLayout, CompanyProfileMap
    },
    computed: {
        memberId() {
            return this.$route.params.id;
        },
        memberDetail() {
            return this.$store.getters['member/memberDetail'];
        },
        isSuccess() {
            return this.$store.getters['common/isSuccess'];
        },
        profileImgSrc() {
            if (Object.keys(this.memberDetail).length !== 0) {
                return this.$apiUri.resources + '/images/' + this.memberDetail.profileImage.imgLocation;
            } else {
                return '';
            }
        }
    },
    watch: {
        isSuccess(newVal) {
            if (newVal === false) {
                alert('조회에 실패했습니다.');
                this.$store.commit('common/setSuccess', null);
            }
        }
    },
    mounted() {
        this.$store.dispatch('auth/authRequest', {
            requestCallback: () => {
                this.$store.dispatch('member/getCompanyMemberById', this.memberId);
            },
            failedCallback: (error) => {
                console.error('실패');
                console.error(error);
                this.$store.commit('common/setSuccess', false);
            }
        });
    }
}
</script>

<style scopped>
img.profile-img {
    width: 600px;
}
section {
    margin: 60px;
}
</style>