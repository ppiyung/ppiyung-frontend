<template>
    <base-layout>
        <h1>{{memberDetail.memberName}}</h1>

        <section class="section-applying">
            <h2>현재 진행중인 채용</h2>
            <div class = "recruit-card-wrapper">
                <recruit-card
                v-for="recruit in recruitList"
                :key="recruit.recruitId"
                :recuritId="recruit.recruitId"
                :companyId="recruit.companyId"
                :recruitTitle="recruit.recruitTitle"
                :recruitDetail="recruit.recruitDetail"
                :comapnyImg="profileImgSrc"
                :recruitStartAt="new Date(recruit.recruitStartAt).toISOString()"
                :recruitEndAt="new Date(recruit.recruitEndAt).toISOString()"/>
            </div>
        </section>

        <section class="section-introduce">
            <h2>회사 소개</h2>
            <img :src="profileImgSrc"
            class="profile-img">
            
            <div>
                {{memberDetail.memberInfo}}
            </div>
        </section>

        <section class="section-map">
            <h2>회사 위치</h2>

            {{ memberDetail.memberAddr }}<br /><br />

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
import RecruitCard from '@/components/recruit/RecruitCard.vue';

export default {
    components: {
        BaseLayout, CompanyProfileMap, RecruitCard
    },
    computed: {
        recruitList() {
            return this.$store.getters['recruit/recruitList'];
        },
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
                const location = this.memberDetail.profileImage.imgLocation;
                if (location === null || location === undefined) {
                    return '/default.png';
                } else {
                    return this.$apiUri.resources + '/images/' + this.memberDetail.profileImage.imgLocation;
                }
            } else {
                return '/default.png';
            }
        }
    },
    data() {
        return {
            recruitListResult: {
                success: null
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

        this.$store.dispatch('auth/authRequest', {
            requestCallback: () => {
                this.$store.dispatch('recruit/requestRecruitListByOnlyCompanyId', {
                    companyId: this.memberId,
                    resultRef: this.recruitListResult
                });
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
.recruit-card-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>