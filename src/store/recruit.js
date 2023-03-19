import axios from 'axios';
import apiUri from '@/apiUri';

export default {
  namespaced: true,
  state: {
    selectedWorkArea: 1,
    pageOption: {
      total: 0,
      page: 1,
      size: 12
    },
    recruitList: [],
    recruitDetail: { },
    openedResumeList: [],
    applyListById: [],
    suggestList:[]
  },
  getters: {
    recruitList(state) {
      return state.recruitList;
    },
    selectedWorkArea(state) {
      return state.selectedWorkArea;
    },
    pageOption(state) {
      return state.pageOption;
    },
    recruitDetail(state) {
      return state.recruitDetail;
    },
    openedResumeList(state){
      return state.openedResumeList;
    },
    applyListById(state){
      return state.applyListById;
    },
    suggestList(state){
      return state.suggestList;
    }
  },
  mutations: {
    setRecruitList(state, recruitList) {
      state.recruitList = recruitList;
    },
    setWorkArea(state, selectedWorkArea) {
      state.selectedWorkArea = selectedWorkArea;
    },
    setPageOption(state, pageOption) {
      state.pageOption = {
        ...state.pageOption,
        ...pageOption
      };
    },
    setRecruitDetail(state, recruitDetail) {
      state.recruitDetail = recruitDetail;
    },
    setOpenedResumeList(state, resumeList) {
      state.openedResumeList = resumeList;
    },
    setApplyListById(state, applyList){
      state.applyListById = applyList;
    },
    setSuggestList(state, suggestList){
      state.suggestList = suggestList;
    }

  },
  actions: {
    //마이페이지-입사제안 리스트 조회
    suggestList({ commit, rootGetters }, id) {
      console.log('asdf3');
      axios.get(
        `${apiUri.recruit}/suggest/member/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setSuggestList', result.data.payload);
          console.log('asdf4');
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },
    // 개별 채용공고 조회
    requestRecruitById({ commit, rootGetters }, id) { 
      axios.get(
        `${apiUri.recruit}/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setRecruitDetail', result.data.payload[0]);
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },
    // 전체 채용공고 조회
    requestRecruitList({ commit, rootGetters }) { 
      axios.get(
        apiUri.recruit,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setRecruitList', result.data.payload);
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },
      //아이디별 지원 현황 -마이페이지
      applyListById({ commit, rootGetters },id) { // 직무분야별 채용공고 조회
        axios.get(
          `${apiUri.recruit}/apply/member/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${rootGetters['auth/accessToken']}`
            }
          }
        )
          .then((result) => {
            console.log(result.data);
            commit('setApplyListById', result.data.payload);
            commit('common/setSuccess', true, { root: true });
          })
          .catch((error) => {
            console.error(error);
            commit('common/setSuccess', false, { root: true });
          });
      },
      
    // 기업별+직무분야별 채용공고 조회
    requestRecruitListByCompanyId({commit, getters, rootGetters}, {memberId}) { 
      axios.get(
        apiUri.recruit,
        {
          withCredentials: true,
          params: {
             workArea: `${getters.selectedWorkArea}` ,
             company: memberId
          },
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      
      )
        .then((result) => {
          commit('setRecruitList', result.data.payload);
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },

    requestRecruitListByWorkArea({ commit, getters, rootGetters }) { // 직무분야별 채용공고 조회
      console.log(getters.pageOption);
      axios.get(
        apiUri.recruit,

        {
          withCredentials: true,
          params: {
            workArea: getters.selectedWorkArea,
            ...getters.pageOption
         },
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setRecruitList', result.data.payload.list);
          
          const { total } = result.data.payload

          commit('setPageOption', {
            total
          });
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },

    requestRecruitListByWorkAreaAccumualtion({ commit, getters, rootGetters }) { // 직무분야별 채용공고 조회
      axios.get(
        apiUri.recruit,
        {
          withCredentials: true,
          params: {
            workArea: getters.selectedWorkArea,
            ...getters.pageOption
         },
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setRecruitList', [
            ...getters.recruitList,
            ...result.data.payload.list
          ]);

          const { total } = result.data.payload

          commit('setPageOption', {
            total
          });
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },

    requestAddBookmark({ commit, rootGetters }, { recruitId, memberId }) {
      axios.post(
        `${apiUri.recruit}/bookmark`,
        {
          recruitId,
          memberId
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then(() => {
          commit('common/setSuccess', true, { root: true });
        })
        .catch(() => {
          commit('common/setSuccess', false, { root: true });
        });
    },
    // eslint-disable-next-line
    requestAddApply({ rootGetters }, { recruitId, resultRef }) {
      axios.post(
        `${apiUri.recruit}/apply/${recruitId}`,
        { },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then(() => {
          console.log('공고 지원 성공');
          resultRef.success = true;
        })
        .catch(() => {
          console.error('공고 지원 실패');
          resultRef.success = false;
        });
    },

    //입사제안 보내기
    sendJobOffer({rootGetters}, {memberId, resultRef}){
       axios.post(
         `${apiUri.recruit}/suggest/${memberId}`,
         {},
         {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
         }

       )
       .then(() => {
        console.log('입사 제안 보내기 성공');
        resultRef.success = true;
      })
      .catch(() => {
        console.error('입사 제안 보내기 실패');
        resultRef.success = false;
      });
    },

    //공개 이력서 다운로드
    downloadResume({rootGetters}, {memberId, resultRef}){
        axios.get(
          `${apiUri.member}/${memberId}/resume`,
           {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${rootGetters['auth/accessToken']}`
            }
          }
        )
        .then((response) => {
          const blob = new Blob([response.data]);
          const fileObjectUrl = window.URL.createObjectURL(blob);
  
          const link = document.createElement("a");
          link.href = fileObjectUrl;
          link.style.display = 'none';
  
          const disposition = response.headers["content-disposition"];
          console.log(response.headers);
          link.download = decodeURI(
                          disposition
                            .match(/fileName[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
                            .replace(/['"]/g, ""));
          
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(fileObjectUrl);

          console.log('이력서 다운로드 성공');
          resultRef.success = true;
        }
        )
        .catch(() => {
          console.error('이력서 다운로드 실패');
          resultRef.success = false; 
        }
        );
    },
    openedResumeListByWorkArea({ commit, getters, rootGetters }) { // 직무분야별 채용공고 조회
      axios.get(
        `${apiUri.member}/resume/${getters.selectedWorkArea}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rootGetters['auth/accessToken']}`
          }
        }
      )
        .then((result) => {
          commit('setOpenedResumeList', result.data.payload);
          commit('common/setSuccess', true, { root: true });
        })
        .catch((error) => {
          console.error(error);
          commit('common/setSuccess', false, { root: true });
        });
    },
  }
};
