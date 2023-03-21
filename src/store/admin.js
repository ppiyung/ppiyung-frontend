import axios from "axios";
import apiUri from "@/apiUri";
export default {
    namespaced: true,
    state: {
        recruitStatistics: {
        },
        memberManage: {
            queryOption: {
                page: 1,
                size: 10
             },
             total: 0,
            memberList: [ ]
        },
        recruitManage: {
            queryOption: {
                page: 1,
                size: 10,
                workArea: 1,
                closed: false
             },
            total: 0,
            recruitList: [ ]
        },
        boardManage: {
            queryOption: {
                page: 1,
                size: 10
             },
            total: 0,
            boardList: [ ]
        }
    },
    getters: {
        recruitStatistics(state) {
            return state.recruitStatistics;
        },
        memberManage(state) {
            return state.memberManage;
        },
        recruitManage(state) {
            return state.recruitManage;
        },
        boardManage(state) {
            return state.boardManage;
        }
    },
    mutations: {
        setRecruitStatistics(state, recruitStatistics) {
            state.recruitStatistics = recruitStatistics;
        },
        setMemberList(state, data) {
            state.memberManage.memberList = data;
        },
        setMemberOption(state, option) {
            state.memberManage.queryOption = option;
        },
        setMemberTotal(state, total) {
            state.memberManage.total = total;
        },
        setRecruitList(state, data) {
            state.recruitManage.recruitList = data;
        },
        setRecruitOption(state, option) {
            state.recruitManage.queryOption = option;
        },
        setRecruitTotal(state, total) {
            state.recruitManage.total = total;
        },
        setBoardList(state, data) {
            state.boardManage.boardList = data;
        },
        setBoardOption(state, option) {
            state.boardManage.queryOption = option;
        },
        setBoardTotal(state, total) {
            state.boardManage.total = total;
        }
    },
    actions: {
        requestRecruitStatistics({ commit, rootGetters }) {
            axios.get(
                `${apiUri.recruit}/statistics`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    }
                }
            )
            .then((response) => {
                commit('setRecruitStatistics', response.data.payload);
                commit('common/setSuccess', true, { root: true });
            })
            .catch((response) => {
                console.error(response);
                commit('common/setSuccess', false, { root: true });
            });
        },
        requestMemberList({ getters, commit, rootGetters }) {
            axios.get(
                apiUri.member,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    },
                    params: getters.memberManage.queryOption
                }
            )
            .then((response) => {
                commit('setMemberList', response.data.payload.list);
                commit('setMemberTotal', response.data.payload.total);
                commit('common/setSuccess', true, { root: true });
            })
            .catch((response) => {
                console.error(response);
                commit('common/setSuccess', false, { root: true });
            });
        },
        requestEditMember({ rootGetters }, { memberInfo, resultRef}) { // 회원정보 수정 요청
            console.log('관리자/회원정보 수정 요청 시작');
            axios.put(
            `${apiUri.member}/${memberInfo.memberId}`,
            memberInfo,
            {
                withCredentials: true,
                headers: {
                Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                }
            }
            )
            .then(() => {
                resultRef.success = true;
            })
            .catch((error) => {
                console.error(error);
                resultRef.success = false;
            });
        },
        requestDeleteMember({ rootGetters }, { memberId, resultRef}) { // 회원 삭제 요청
            console.log('관리자/회원정보 수정 요청 시작');
            axios.delete(
            `${apiUri.member}/${memberId}`,
            {
                withCredentials: true,
                headers: {
                Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                }
            }
            )
            .then(() => {
                resultRef.success = true;
            })
            .catch((error) => {
                console.error(error);
                resultRef.success = false;
            });
        },
        requestEditRecruit({ rootGetters }, { recruitInfo, resultRef}) { // 회원정보 수정 요청
            console.log('채용공고 수정 요청 시작');
            axios.put(
                `${apiUri.recruit}/${recruitInfo.recruitId}`,
                recruitInfo,
                {
                    withCredentials: true,
                    headers: {
                    Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    }
                }
            )
            .then(() => {
                resultRef.success = true;
            })
            .catch((error) => {
                console.error(error);
                resultRef.success = false;
            });
        },
        requestSetRecruitExpose({ rootGetters }, { recruitId, willBeExposed, resultRef}) { // 회원정보 수정 요청
            console.log('채용공고 수정(상단배너노출 설정) 요청 시작');
            axios.put(
                `${apiUri.recruit}/expose/${recruitId}`,
                { recruitExpose: willBeExposed },
                {
                    withCredentials: true,
                    headers: {
                    Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    }
                }
            )
            .then(() => {
                resultRef.success = true;
            })
            .catch((error) => {
                console.error(error);
                resultRef.success = false;
            });
        },
        requestRecruitList({ commit, rootGetters, getters }) {
            axios.get(
                apiUri.recruit,
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                  },
                  params: getters.recruitManage.queryOption
                }
              )
            .then((response) => {
                commit('setRecruitList', response.data.payload.list);
                commit('setRecruitTotal', response.data.payload.total);
                commit('common/setSuccess', true, { root: true });
            })
            .catch((response) => {
                console.error(response);
                commit('common/setSuccess', false, { root: true });
            });
        },
        requestBoardList({ getters, commit, rootGetters }) {
            axios.get(
                `${apiUri.board}/article`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    },
                    params: getters.boardManage.queryOption
                }
            )
            .then((response) => {
                commit('setBoardList', response.data.payload.list);
                commit('setBoardTotal', response.data.payload.total);
                commit('common/setSuccess', true, { root: true });
            })
            .catch((response) => {
                console.error(response);
                commit('common/setSuccess', false, { root: true });
            });
        },
        requestDeleteArticle({ rootGetters }, { articleId, resultRef }) { // 게시글 삭제 요청
            console.log('게시글 요청 시작');
            axios.delete(
            `${apiUri.board}/article/${articleId}`,
            {
                withCredentials: true,
                headers: {
                Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                }
            }
            )
            .then(() => {
                resultRef.success = true;
            })
            .catch((error) => {
                console.error(error);
                resultRef.success = false;
            });
        }
    }
};