<template>
    <div>
      <b-table :items="recruitList" :fields="fields" striped responsive="sm">
        <template #cell(applicantsList)="row">
          <b-button size="sm"  class="mr-2" @click="goToDetail(row.item.recruitId)">
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

      <div class="page-indicator">
          <span
              class="page-num-link"
              @click="changePage(queryOption.page - 1)"
          > &lt; </span> &nbsp;

          <span
              v-for="pageNum in pageArr"
              :key="pageNum"
          >
              <span
                  class="page-num-link"
                  :class="pageNum === queryOption.page ? 'selected' : ''"
                  @click="changePage(pageNum)"
              >{{ pageNum }}</span>
              &nbsp;
          </span>

          <span
              class="page-num-link"
              @click="changePage(queryOption.page + 1)"
          > &gt; </span>
      </div>

      <div v-if="recruitList.length === 0" class="no-item">
        조건에 맞는 데이터가 존재하지 않습니다.
      </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
   computed: {
    recruitList() {
      return this.$store.getters['recruit/recruitList']
        .map(item => {
          return {
            ...item,
            recruitStartAt: dayjs.unix(item.recruitStartAt / 1000).format('YYYY년 MM월 DD일'),
            recruitEndAt: dayjs.unix(item.recruitEndAt / 1000).format('YYYY년 MM월 DD일')
          }
        });
    },
    workArea() {
      return this.$store.getters['recruit/selectedWorkArea'];
    },
    loginMemberInfo() {
      return this.$store.getters['auth/memberInfo'];
    },
    queryOption() {
        return this.$store.getters['recruit/pageOption'];
    },
    pageTotal() {
        if (Object.keys(this.queryOption).length !== 0) {
            const option = this.queryOption;
            return Math.ceil(this.queryOption.total / option.size);
        } else {
            return 0;
        }
    },
    pageArr() {
        let pageCount = 0;
        if (Object.keys(this.recruitList).length !== 0) {
            const option = this.queryOption;
            pageCount = Math.ceil(option.total / option.size);
        } else {
            return [ '1' ]
        }

        const currentPage = this.queryOption.page;
        const size = this.queryOption.size;
        const currentGroup = Math.ceil(currentPage / size);

        let lastNumber = currentGroup * pageCount;
        if (lastNumber > pageCount) {
            lastNumber = pageCount;
        }
        const firstNumber = lastNumber - (pageCount - 1);
        
        return [...new Array(lastNumber - firstNumber + 1).keys()]
            .map(key => key + firstNumber);
    }
   },
   watch: {
    workArea() {
      this.loadRecruitList();
    },
    'queryOption.page': {
        handler() {
            this.loadRecruitList();
        }
    },
    'queryOption.closed': {
        handler() {
            this.loadRecruitList();
        }
    },
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
    changePage(page) {
        let pageCount = 0;
        console.log('asf');
        if (Object.keys(this.recruitList).length !== 0) {
            const option = this.queryOption;
            pageCount = Math.ceil(option.total / option.size);
        }

        if (page > 0 && page <= pageCount) {
            console.log('aaa');
            this.$store.commit('recruit/setPageOption', { ...this.queryOption, page })
        }
    },
    loadRecruitList() {
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
    },
    goToDetail(recruitId) {
      this.$router.push({ name: "company/recruitStatus", params: { recruitId: recruitId } })
    }
   },
   mounted(){
    console.log(this.loginMemberInfo.memberId);
    this.loadRecruitList();
   }

}
</script>

<style scoped>
.page-num-link {
    cursor: pointer;
}
.selected {
    font-weight: bold;
}
.page-indicator {
    margin-bottom: 20px;
}
</style>