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
        }
    },
    getters: {
        recruitStatistics(state) {
            return state.recruitStatistics;
        },
        memberManage(state) {
            return state.memberManage;
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
    }
};