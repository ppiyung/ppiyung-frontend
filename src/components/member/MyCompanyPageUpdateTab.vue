<template>
  <b-tab title="정보 수정하기" active>
    <h3>
      <span id="mypageNickname">{{ memberInfo.memberNickname }}</span> 님의
      회원정보 수정
    </h3>
    <br/>
    <div class="updateContainer">
      <b-row style="margin-bottom: 15px">
        <b-col lg="2" class="pb-2"> 회사프로필 </b-col>
        <b-col v-if="previewImageData == null"><b-img :src="profileImgSrc"></b-img
        ></b-col>
        <b-col ><b-img left :src="previewImageData"></b-img></b-col>
        <b-col
          ><div class="resumeButtonContainer">
            <b-button @click="upleoadImage">업로드</b-button>
          </div></b-col
        >
      </b-row>
      <b-form-file
        v-model="imageFile"
        :state="Boolean(imageFile)"
        placeholder="업로드할 이미지를 선택해주세요."
        drop-placeholder="이곳에 이력서 드래그"
        @change="previewImage"
      ></b-form-file>
      <b-row style="margin-top: 15px">
        <b-col lg="2" class="pb-2"> 아이디 </b-col>
        <b-col lg="4" class="pb-2">
          <b-form-input
            :disabled="true"
            v-model="updateInfoform.memberId"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="2" class="pb-2"> 비밀번호 </b-col>
        <b-col lg="4" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberPw"
            type="password"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="2" class="pb-2"> 이름 </b-col>
        <b-col lg="4" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberName"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="2" class="pb-2"> 닉네임 </b-col>
        <b-col lg="4" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberNickname"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="2" class="pb-2"> 생년월일 </b-col>
        <b-col lg="4" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberBirth"
            type="date"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="2" class="pb-4">사업자등록번호</b-col>
        <b-col lg="4" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberRegNum"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="2" class="pb-2"> 전화번호 </b-col>
        <b-col lg="4" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberPhone"
            required
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="2" class="pb-2"> 이메일 </b-col>
        <b-col lg="4" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberEmail"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="2" class="pb-2"> 사업장 주소 </b-col>
        <b-col lg="6" class="pb-2">
          <b-form-input
            v-model="updateInfoform.memberAddr"
            required
          ></b-form-input>
          <update-map-container
            @changed="handleChanged"
            :initialCoordX="this.memberInfo.memberCoordX"
            :initialCoordY="this.memberInfo.memberCoordY"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="2" class="pb-2"> 회사소개 </b-col>
        <b-col lg="6" class="pb-2">
          <b-form-textarea
            v-model="updateInfoform.memberInfo"
            required
            rows="3"
            no-resize
          ></b-form-textarea>
          <!-- <b-form-input
            v-model="updateInfoform.memberInfo"
            required
          ></b-form-input> -->
        </b-col>
        <b-col lg="2" class="pb-2" style="margin-left: 40px"> 
          <b-button style="margin-left: 50px" variant="primary" @click="updateSubmit">수정하기</b-button>
        </b-col>
      </b-row>
    </div>
  </b-tab>
</template>

<script>
import UpdateMapContainer from "./UpdateMapContainer.vue";

export default {
  name: "UpdateTab",
  components: { UpdateMapContainer },
  data() {
    return {
      updateInfoform: {},
      genderOptions: [
        { value: "F", text: "여성" },
        { value: "M", text: "남성" },
        { value: "O", text: "여기에 없음" },
        { value: "X", text: "밝히지 않음" },
      ],
      imageFile: null,
      previewImageData: null,
    };
  },
  computed: {
    addressCompany() {
      return this.$store.getters["member/registerInfo"].memberAddr;
    },
    registerType() {
      return this.$store.getters["member/registerInfo"].memberType;
    },
    memberDetail() {
            return this.$store.getters['member/memberDetail'];
        },
    memberInfo() {
      return this.$store.getters["auth/memberInfo"];
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
  watch: {
    "updateInfoform.memberId": {
      handler(val) {
        this.$store.dispatch("member/getMemberById", val);
      },
    },
  },
  methods: {
    // 선택 장소가 변하는 경우
    handleChanged({ addrInput, coordX, coordY }) {
      this.updateInfoform.memberAddr = addrInput;
      this.updateInfoform.memberCoordX = coordX;
      this.updateInfoform.memberCoordY = coordY;
    },
    //기업 프로필 업로드
    upleoadImage() {
      this.$axios
        .postForm(
          `${this.$apiUri.member}/img`,
          {
            file: this.imageFile,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.$store.getters["auth/accessToken"]}`,
            },
          }
        )
        .then((result) => {
          console.log(result);
          alert("이미지 업로드에 성공했습니다.");
        })
        .catch((result) => {
          console.error(result);
        });
    },
    // 회원정보 수정 목록 전송
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
    //이미지 미리보기
    previewImage(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.previewImageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        this.previewImageData = null;
      }
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
img {
  max-height: 160px;
  max-width: 160px;
}
.duplicate-indicator {
  margin-bottom: 10px;
}
#mypageNickname{
 font-weight: 900;
}
.resumeButtonContainer{
  margin-left: 180px
}
</style>