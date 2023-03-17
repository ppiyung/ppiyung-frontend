<template>
    <div>
    <b-table :items="suggestList" :fields="fields" striped responsive="sm">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          상세정보 {{ row.detailsShowing ? '닫기' : '보기'}}
        </b-button>
      </template>

      <template #cell(resumeLocation)="row">
        <b-button size="sm"  class="mr-2" @click="downloadResume(row.item.memberId)">
          다운로드
        </b-button>
      </template>

       <template #cell(sendJobOffer)="row">
        <b-button size="sm" class="mr-2" @click="sendJobOffer(row.item.memberId)" >
           입사제안 보내기
        </b-button>
      </template>

      <template #row-details="row"> 
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>지원자 거주지 :</b></b-col>
            <b-col>{{ row.item.memberAddr }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>지원자 연락처 :</b></b-col>
            <b-col>{{ row.item.memberPhone}}</b-col>
          </b-row>

           <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>지원자 이메일 :</b></b-col>
            <b-col>{{ row.item.memberEmail}}</b-col>
          </b-row>

        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {    
      computed: {
        suggestList() {
          return this.$store.getters['recruit/openedResumeList']
                .map((item) => {
                  return {...item, 
                  memberBirth: dayjs(item.memberBirth).format('YY-MM-DD'), 
                  lastSuggested: dayjs(item.lastSuggested).format("YYYY/MM/DD"),
                  _showDetails: false } ;
                });
        },
        selectedWorkArea() {
          return this.$store.getters['recruit/selectedWorkArea'];
        },
        memberInfo() {
          return this.$store.getters['auth/memberInfo'];
        }
      },
      watch: {
        selectedWorkArea() {
            this.$store.dispatch('auth/authRequest', {
              requestCallback: () => {
                this.$store.dispatch('recruit/openedResumeListByWorkArea');
              },
              failedCallback: (error) => {
                console.error('실패');
                console.error(error);
                this.$store.commit('common/setSuccess', false);
              }
            });
        },
        suggestList(val) {
          console.log(val);
        },
        'suggestResult.success': {
          handler(val) {
            if (val === true) {
              alert('입사 제안 보내기 성공했습니다.');
              this.suggestResult.success = null;
            } else if (val === false) {
              alert('입사 제안 보내기 실패했습니다.');
              this.suggestResult.success = null;
            }
          }
        },
        'downloadResult.success': {
          handler(val) {
            if (val) {
              alert('이력서 다운로드 성공했습니다.');
            } else {
              alert('이력서 다운로드 실패했습니다.');
            }
          }
        }
      },
      data() {
        return {
          fields : [
            {
              key : 'memberId',
              label : '지원자 이름',
              sortable : true
            },
            {
              key : 'memberGender',
              label : '성별',
              sortable : true
            },
            {
              key : 'memberBirth',
              label : '생년월일',
              sortable : true
            },
             {
              key : 'show_details',
              label :'상세'
            },
            {
              key : 'resumeLocation',
              label :'이력서 열람'
            },
            { 
              key : 'lastSuggested',
              label : '입사제안 이력'
            },
            { 
              key : 'sendJobOffer',
              label : '입사제안 보내기'
            }
           
          ],
          suggestResult:{
            success : null
           },
          downloadResult:{
            success : null
          },
      };

      },
      methods: {
        sendJobOffer(memberId){
          this.$store.dispatch('auth/authRequest',{
            requestCallback: () => {
              this.$store.dispatch(
                'recruit/sendJobOffer',
                { memberId: memberId, resultRef: this.suggestResult}
              )
            },
            failedCallback: (error) => {
                console.error('실패');
                console.error(error);
                this.suggestResult.success = false;
            }
          }
          );
        },
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
        }
      },
      mounted(){
        this.$store.dispatch('auth/authRequest', {
          requestCallback: () => {
            this.$store.dispatch('recruit/openedResumeListByWorkArea');
           
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
