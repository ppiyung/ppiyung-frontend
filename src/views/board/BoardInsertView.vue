<template>
<basic-layout>
    <b-form class="mt-5">
        <p class="font-weight-bold h3 mb-3">게시글 작성</p>
        <b-form-group id="input-group-1">
            <label class="font-weight-500" for="input-1">제목 <span style="color: red;">*</span></label>
            <b-form-input id="input-1" v-model="coummityPostInfoParam.articleTitle" placeholder="제목을 입력해주세요."></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3">
        <label class="font-weight-500" for="input-3">내용 <span style="color: red;">*</span></label>
        <b-form-textarea id="textarea" v-model="coummityPostInfoParam.articleContent" placeholder="내용을 작성해주세요" rows="5" max-rows="6">
        </b-form-textarea>
        <div class="text-right"><b-button class="mt-5" pill variant="outline-secondary" type="submit" @click="Insert" >작성</b-button></div>
    </b-form-group>.
    </b-form>
</basic-layout>
</template>
<script>
import BasicLayout from '@/components/common/BaseLayout.vue';
import dayjs from 'dayjs';
export default {
    name: 'BoardInsertView',
    component: { dayjs },
    data(){
        dayjs(); // 현재 날짜 및 시간 가져오기

        return {
            coummityPostInfoParam: {articleCreatedAt : dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"), memberId : this.$store.getters['auth/memberInfo'].memberId },
        }
    },
    components :{
        BasicLayout
    },
    computed :{
        articleId(){
            return this.$route.params.id;
        }
    }
    ,
    methods :{
    // 커뮤니티 게시글 등록.
    Insert() {
     this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
            'board/setInsertBoard',
                { 
                    memberId: this.coummityPostInfoParam.memberId,
                    articleCreatedAt : this.coummityPostInfoParam.articleCreatedAt,
                    articleTitle : this.coummityPostInfoParam.articleTitle,
                    articleContent : this.coummityPostInfoParam.articleContent
                } 
            );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.applyResult.success = false;
        }
      });
    }
   }
};
</script>