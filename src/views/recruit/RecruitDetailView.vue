<template>
  <basic-layout>
    <b-row>
      <b-col lg="8">
        <img src="https://picsum.photos/600/400/?image=82">
        <h1>{{recruitDetail.recruitTitle}}</h1>

        {{recruitDetail.companyId}}

        {{recruitDetail.recruitDetail}}

        {{recruitDetail.recruitStartAt}}

        {{recruitDetail.recruitEndAt}}

        {{recruitDetail.workAreaId}}

        위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.
        국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다.

        국회는 의장 1인과 부의장 2인을 선출한다. 국무총리는 대통령을 보좌하며,
        행정에 관하여 대통령의 명을 받아 행정각부를 통할한다. 국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다.

        국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다.
        국가는 모성의 보호를 위하여 노력하여야 한다.

        국회는 선전포고, 국군의 외국에의 파견 또는 외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다.
        누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다.
        다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.

        모든 국민은 양심의 자유를 가진다. 대통령이 궐위되거나 사고로 인하여 직무를
        수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다.

        국민의 자유와 권리는 헌법에 열거되지 아니한 이유로 경시되지 아니한다.
        국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다.

        대통령의 임기연장 또는 중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는 효력이 없다.
        제3항의 승인을 얻지 못한 때에는 그 처분 또는 명령은 그때부터 효력을 상실한다. 이 경우 그 명령에 의하여 개정 또는
        폐지되었던 법률은 그 명령이 승인을 얻지 못한 때부터 당연히 효력을 회복한다.

        군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에
        관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.

        대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한
        조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.

        <div>
          <b-button variant="primary">지원하기</b-button>&nbsp;
          <b-button variant="secondary">관심공고</b-button>
        </div>
      </b-col>

      <b-col lg="4" class="apply-control-right">
          <b-button variant="primary">지원하기</b-button>&nbsp;
          <b-button variant="secondary">관심공고</b-button>
      </b-col>
    </b-row>

  </basic-layout>
</template>

<script>
import BasicLayout from '@/components/common/BaseLayout.vue';

export default {
  name: 'RecruitDetailView',
  components: {
    BasicLayout
  },
  computed: {
    recruitId() {
      return this.$route.params.id;
    },
    recruitDetail() {
      return this.$store.getters['recruit/recruitDetail'];
    }
  },
  mounted() {
    this.$store.dispatch('recruit/requestRecruitById', this.recruitId);
  }
};
</script>

<style scoped>
img {
  max-height: 500px;
  max-width: 600px;
}
h1 {
  margin-top: 20px;
}
@media ( max-width : 1400px) {
  .apply-control-right {
    display: none;
  }
}
</style>
