<template>
  <b-tab title="정보 수정하기" active>
    <h3>
      <span id="mypageNickname">{{ memberInfo.memberNickname }}</span> 님의
      회원정보 수정
    </h3>
    <br />
    <b-container>
      <b-row>
        <b-col sm="3" class="pb-2"> 비밀번호 </b-col>
        <b-col sm="9" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberPw"
            type="password"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3" class="pb-2"> 이름 </b-col>
        <b-col sm="9" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberName"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3" class="pb-2"> 닉네임 </b-col>
        <b-col sm="9" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberNickname"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3" class="pb-2"> 생년월일 </b-col>
        <b-col sm="9" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberBirth"
            type="date"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3" class="pb-2"> 성별 </b-col>
        <b-col sm="9" class="pb-2">
          <b-form-select
            v-model="updateInfoform.memberGender"
            :options="genderOptions"
          ></b-form-select>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3" class="pb-2"> 전화번호 </b-col>
        <b-col sm="9" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberPhone"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3" class="pb-2"> 자기 소개 </b-col>
        <b-col sm="9" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberInfo"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3" class="pb-2"> 이메일 </b-col>
        <b-col sm="9" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberEmail"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12" class="pb-2">
          <b-button id="myPageUpdateBtn" variant="primary" @click="updateSubmit">수정하기</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-tab>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      updateInfoform: {},
      genderOptions: [
        { value: "F", text: "여성" },
        { value: "M", text: "남성" },
        { value: "O", text: "여기에 없음" },
        { value: "X", text: "밝히지 않음" },
      ],
    };
  },
  computed: {
    registerType() {
      return this.$store.getters["member/registerInfo"].memberType;
    },

    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
    },
  },
  watch: {
    "updateInfoform.memberId": {
      handler(val) {
        this.$store.dispatch("member/getMemberById", val);
      },
    },
  },
  methods: {
    updateSubmit() {
      this.$store.dispatch("auth/authRequest", {
        requestCallback: () => {
          this.$store.dispatch("member/editMemberInfo", this.updateInfoform);
        },
        failedCallback: (error) => {
          console.error("실패");
          console.error(error);
          this.$store.commit("common/setSuccess", false);
        },
      });
    },
  },
  created() {
    //new Date().toISOString().substr(0,10)
    const memberInfoObj = { ...this.$store.getters["auth/memberInfo"] };
    memberInfoObj.memberBirth = new Date(memberInfoObj.memberBirth)
      .toISOString()
      .substring(0, 10);
    this.updateInfoform = memberInfoObj;
  },
};
</script>

<style scoped>
.duplicate-indicator {
  margin-bottom: 10px;
}
#mypageNickname {
  background-color: cornsilk;
}
#myPageUpdateBtn{
  float:right;
}

</style>