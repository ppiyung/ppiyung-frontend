<template>
  <div>
    <div class="control-wrapper">
      <b-button variant="primary" @click="submit">게시</b-button>
    </div>

    <b-form-group label-cols="4" label-cols-lg="2" label="채용 분야" label-for="recruit-title">
      <b-form-select v-model="recruitFormData.workAreaId" :options="workAreaOptions"></b-form-select>
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" label="채용 공고 제목" label-for="recruit-title">
        <b-form-input v-model="recruitFormData.recruitTitle" id="recruit-title"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" label="노출 시작일" label-for="recruit-start">
        <b-form-datepicker v-model="recruitFormData.recruitStartAt" id="recruit-start"></b-form-datepicker>
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" label="노출 마감일" label-for="recruit-end">
        <b-form-datepicker v-model="recruitFormData.recruitEndAt" id="recruit-end"></b-form-datepicker>
    </b-form-group>

    <b-form-group label-cols="4" label-cols-lg="2" label="공고 세부 내용" label-for="recruit-content">
        <ckeditor :editor="editor" v-model="recruitFormData.recruitDetail" :config="editorConfig"></ckeditor>
    </b-form-group>

    <div class="control-wrapper">
      <b-button variant="primary" @click="submit">게시</b-button>
    </div>{{success}}
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  computed: {
    memberInfo() {
      return this.$store.getters['auth/memberInfo'];
    },
    success() {
      return this.$store.getters['common/isSuccess'];
    }
  },
  watch: {
    success(val) {
      if (val === true) {
        alert('공고 게시에 성공했습니다.');
        this.$router.push({ name: 'company/recruit' })
      } else if (val === false) {
        alert('공고 게시에 실패했습니다.');
        this.$store.commit('common/setSuccess', null);
      }
    }
  },
  data() {
    return {
      recruitFormData: {
        companyId: '',
        recruitTitle: '',
        recruitDetail: '',
        workAreaId: '',
        recruitStartAt: '',
        recruitEndAt:  ''
      },
      workAreaOptions: [
        { value: 1, text: '프론트엔드' },
        { value: 2, text: '웹개발' }
      ],
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        }
      }
    }
  },
  methods: {
    submit() {
      let validation = true;
      Object.keys(this.recruitFormData).every(key => {
        if (this.recruitFormData[key] === ''
            || this.recruitFormData[key] === undefined) {
              validation = false;
              return false;
            }
      });

      if (!validation) {
        alert('모든 값을 빠짐없이 입력해주세요.');
        return;
      }

      this.$store.dispatch('auth/authRequest', {
        requestCallback: () => {
            this.$store.dispatch('recruit/requestAddRecruit', this.recruitFormData);
        },
        failedCallback: (error) => {
            console.error('실패');
            console.error(error);
            this.$store.commit('common/setSuccess', false);
        }
      });
    }
  },
  created() {
    this.$store.commit('common/setSuccess', null);
    this.recruitFormData.companyId = this.memberInfo.memberId;
  }
}
</script>

<style>
.control-wrapper {
  text-align: right;
  margin: 30px 0;
}
.ck-editor__editable_inline {
    min-height: 500px;
}
</style>