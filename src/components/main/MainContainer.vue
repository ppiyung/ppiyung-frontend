<template>
    <div>
        <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#4a4a4a"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        >
            <!-- Text slides with image -->
            <b-carousel-slide
                img-src="/banner.png"
            ></b-carousel-slide>

            <b-carousel-slide
                v-for="recruit in exposedRecruitList"
                :key="recruit.recruitId"
                :text="recruit.companyName"
                :img-src="recruit.imgLocation ? `${$apiUri.resources}/images/${recruit.imgLocation}` : null"
                :img-blank="recruit.imgLocation ? false : true">
                <h1 @click="goToDetail(recruit.recruitId)" class="recurit-title">{{recruit.recruitTitle}}</h1>
            </b-carousel-slide>
        </b-carousel>
        
        <h2 class="subtitle">최근 채용공고</h2>

        <div class="recurit-grid-container">
            <recruit-card
            v-for="recruit in recentRecruitList"
            :key="recruit.recruitId"
            :recuritId="recruit.recruitId"
            :companyName="recruit.companyName"
            :recruitTitle="recruit.recruitTitle"
            :recruitDetail="recruit.recruitDetail"
            :companyImg="recruit.imgLocation ? `${$apiUri.resources}/images/${recruit.imgLocation}` : 'default.png'"
            :recruitStartAt="recruit.recruitStartAt"
            :recruitEndAt="recruit.recruitEndAt"/>
        </div>
    </div>
</template>
<script>
import RecruitCard from '../recruit/RecruitCard.vue';

export default {
    components: {
        RecruitCard
    },
    data() {
        return {
            exposedRecruitList: [],
            slide: 0,
            sliding: null
        }
    },
    computed: {
        recentRecruitList() {
            return this.$store.getters['recruit/recruitList'];
        }
    },
    methods:{
        loadRecruitList() {
            this.$store.dispatch('auth/authRequest', {
                requestCallback: () => {
                    this.$store.dispatch('recruit/requestRecruitList', {
                        size: 8,
                        page: 1,
                        closed: false
                    });
                },
                failedCallback: (error) => {
                    console.error('실패');
                    console.error(error);
                    this.$store.commit('common/setSuccess', false);
                }
            });
        },
        loadExposedRecruitList() {
            this.$axios.get(
                this.$apiUri.recruit,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${this.$store.getters['auth/accessToken']}`
                    },
                    params: {
                        page: 1,
                        size: 10,
                        closed: false,
                        exposed: true
                    }
                }
            )
            .then((response) => {
                this.exposedRecruitList = response.data.payload.list
            })
            .catch((error) => {
                console.error(error);
                alert('요청에 실패했습니다. 다시 시도해주세요.');
            });
        },
        onSlideStart() {
            this.sliding = true
        },
        onSlideEnd() {
            this.sliding = false
        },
        goToDetail(id) {
            this.$router.push({
                name: 'recruitDetail',
                params: {
                    id
                }
            });
        }
    },
    created() {
        this.loadRecruitList();
        this.loadExposedRecruitList();
    }
}
</script>
<style scoped>
    .recurit-title {
        cursor: pointer;
    }
    .recurit-grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
    .subtitle {
        margin-top: 60px;
        margin-bottom: 45px;
    }
</style>