<template>
    <div>
      <b-table :items="applyList" :fields="fields" striped responsive="sm">
        <template #cell(downloadResume)="row">
          <b-button size="sm"
            class="mr-2"
            :disabled="row.item.resumeLocation === undefined"
            @click="downloadResume(row.item.memberId)">
            {{row.item.resumeLocation ? '열람' : '미제출'}}
          </b-button>
        </template>
          
        <template #cell(resultControl)="row">
          <b-button size="sm" class="mr-2"
            v-if="row.item.applyResult === undefined"
            @click="setResult({
              applyId: row.item.applyId,
              applyResult: true
          })">
            합격
          </b-button>
          <b-button size="sm" class="mr-2"
            v-if="row.item.applyResult === undefined"
            @click="setResult({
              applyId: row.item.applyId,
              applyResult: false
          })">
            불합격
          </b-button>

          <span v-if="row.item.applyResult !== undefined"
            :class="row.item.applyResult ? 'passed' : 'no-passed'">
            통보 완료 ({{row.item.applyResult ? '합격' : '불합격'}})
          </span>
        </template>
        
      </b-table>

      <div v-if="applyList.length === 0" class="no-item">
        조건에 맞는 데이터가 존재하지 않습니다.
      </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
   computed: {
    loginMemberInfo() {
      return this.$store.getters['auth/memberInfo'];
    },
    applyList() {
      return this.$store.getters['recruit/applyListById']
        .map(item => {
          return {
            ...item,
            memberBirth: dayjs.unix(item.memberBirth / 1000).format('YYYY/MM/DD'), 
            applyCreatedAt: dayjs.unix(item.applyCreatedAt / 1000).format('YYYY/MM/DD'), 
          }
        })
    },
    recruitId() {
      return this.$route.params.recruitId;
    }
   },
   data(){
      return{
        fields: [
          {
              key: 'applyCreatedAt',
              label: '지원일자'  
          },
          {
              key: 'memberName',
              label: '지원자 이름'
          },
          {
              key: 'workAreaId',
              label: '희망지원부문'
          },
          {
              key: 'memberPhone',
              label: '연락처'
          },
          {
              key: 'memberGender',
              label: '성별'
          },
          {
              key: 'memberBirth',
              label: '생년월일'
          },
          {
              key: 'downloadResume',
              label:'이력서 열람'
          },
          {
              key: 'resultControl',
              label: '합불여부'
          }
        ],
        downloadResult: { 
          success: null
        },
        setApplyResult: {
          success: null
        }
    }   
   },
   watch: {
    'downloadResult.success': {
      handler(val) {
        if (val === false) {
          alert('이력서 다운로드 실패했습니다.');
        }
        this.downloadResult.success = null;
      }
    },
    'setApplyResult.success': {
      handler(val) {
        if (val === false) {
          alert('합불통보 요청을 실패했습니다.');
        }
        console.log('합불통보 성공');
        this.setApplyResult.success = null;
        this.loadApplyList();
      }
    }
   },
   methods:{
    downloadResume(memberId){
      console.log(memberId);
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
            this.$store.dispatch(
              'recruit/downloadResume',
              {memberId: memberId, resultRef: this.downloadResult}
            )
          },
          failedCallback: (error) => {
            console.error('실패');
            console.error(error);
            this.downloadResult.success = false;
          }
        }
      );
    },
    loadApplyList() {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
              'recruit/applyListByCompany',
              this.recruitId
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
    },
    setResult({ applyId, applyResult }) {
      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
          this.$store.dispatch(
              'recruit/requestSetApplyResult',
              { applyId, applyResult, resultRef: this.setApplyResult }         
          );
        },
        failedCallback: (error) => {
          console.error('실패');
          console.error(error);
          this.$store.commit('common/setSuccess', false);
        }
      });
    }
   },
   mounted(){
    this.loadApplyList();
   }
}
</script>

<style scoped>
.passed {
  color: blue;
}
.no-passed {
  color: red;
}
</style>