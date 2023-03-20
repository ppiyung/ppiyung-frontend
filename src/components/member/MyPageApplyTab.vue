<template>
  <b-tab title="지원현황" active>
     <h3><span id="mypageNickname">{{memberInfo.memberNickname}}</span> 님이 지원한 목록</h3> <br>
    <div class="apply-container">
      <div v-if="!applyList.length" class="fadeNotice">
        지원한 이력이 없습니다.
      </div>
      <div v-else>
        <b-table :items="applyList" :fields="fields" striped responsive="sm">
          <template #row-details="row">
            <b-card>
              <b-row>
                <b-col sm="3" class="text-sm-right"
                  ><b>지원한 회사 </b></b-col>
                <b-col>{{ row.item.applyMember.memberName }}</b-col>
              </b-row>

               <b-row>
                <b-col sm="3" class="text-sm-right"
                  ><b>채용 공고</b></b-col>
                <b-col>{{ row.item.applyRecruit.recruitTitle }}</b-col>
              </b-row>

                <b-row>
                <b-col sm="3" class="text-sm-right" ><b>직무분야</b></b-col>
                <b-col>{{ row.item.applyRecruit.workAreaId }}</b-col>
              </b-row>

                <b-row>
                <b-col sm="3" class="text-sm-right"
                  ><b>채용 시작일 </b></b-col>
                <b-col>{{ row.item.applyRecruit.recruitStartAt}}</b-col>
              </b-row>

                <b-row>
                <b-col sm="3" class="text-sm-right"
                  ><b>채용 마감일 </b></b-col>
                <b-col>{{ row.item.applyRecruit.recruitEndAt }}</b-col>
              </b-row>

            </b-card>
          </template>
        </b-table>
      </div>
    </div>
    <span> </span>
  </b-tab>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "applyMember.memberName",
          label: "입사 지원한 회사",
          sortable: false,
        },
        {
          key: "applyRecruit.recruitTitle",
          label: "채용 공고 ",
          sortable: true,
        },
         {
          key: "applyRecruit.workAreaId",
          label: "직무 분야 ",
          sortable: true,
        },
           {
          key: "applyRecruit.recruitStartAt",
          label: "채용 시작일 ",
          sortable: true,
        },
          {
          key: "applyRecruit.recruitEndAt",
          label: "채용 마감일 ",
          sortable: true,
        }
        
      ],
    };
  },
  computed: {
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
    applyList() {
      return this.$store.getters["recruit/applyListById"];
    },
  },
  methods: {
    moveToDetailPage(id) {
      console.log(id);
      this.$router.push({
        name: "recruitDetail",
        params: { id },
      });
    },
  },
  mounted() {
    this.$store.dispatch("auth/authRequest", {
      requestCallback: () => {
        this.$store.dispatch("recruit/applyListById", this.memberInfo.memberId);
      },
      failedCallback: (error) => {
        console.error("실패");
        console.error(error);
        this.$store.commit("common/setSuccess", false);
      },
    });
  },
};
</script>

<style>
.duplicate-indicator {
  margin-bottom: 10px;
}
.applyBox {
  font-weight: 900;
}
.fadeNotice {
  font-weight: 900;
  text-align: center;
  margin-top: 100px;
  color: darkgray;
  font-size: 35px;
}
#mypageNickname{
 background-color: cornsilk;
}
</style>