<template>
    <div>
    {{recruitList}}
    <b-table :items="recruitList" :fields="fields" striped responsive="sm">
      <template #cell(applicantsList)>
        <b-button size="sm"  class="mr-2">
          지원자현황    
        </b-button>
      </template>

      <template #cell(editRecruitNotice)>
        <b-button size="sm"  class="mr-2" >
          공고수정
        </b-button>
      </template>
        
       <template #cell(closeRecruitNotice)>
        <b-button size="sm" class="mr-2" >
           즉시마감
        </b-button>
      </template>
      
    </b-table>
    </div>
</template>

<script>

export default {
   computed: {
    recruitList() {
      return this.$store.getters['recruit/recruitList'];
    },
    workArea() {
      return this.$store.getters['recruit/selectedWorkArea'];
    },
    loginMemberInfo() {
      return this.$store.getters['auth/memberInfo'];
    }


   },
   watch: {
    workArea() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch('recruit/requestRecruitListByCompanyId');
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
    }
   },
   data(){
      return{
        fields: [
        {
            key: 'recruitStartAt',
            label: '채용시작일'  
        },
        {
            key: 'recruitEndAt',
            label: '채용마감일'
        },
        {
            key: 'recruitTitle',
            label: '채용공고 제목'
        },
        {
            key: 'applicantsList',
            label: '지원자 현황'
        },
        {
            key: 'editRecruitNotice',
            label:'공고 수정'
        },
        {
            key: 'closeRecruitNotice',
            label: '즉시마감'
        }

        ] 
    }   
   },
   methods:{

   },
   mounted(){
    console.log(this.loginMemberInfo.memberId);

    this.$store.dispatch('auth/authRequest', {
      requestCallback: () => {
        this.$store.dispatch(
            'recruit/requestRecruitListByCompanyId',
            { memberId: this.loginMemberInfo.memberId}         
        );
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
