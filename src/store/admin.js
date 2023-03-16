import axios from "axios";
import apiUri from "@/apiUri";
export default {
    namespaced: true,
    state: {
        recruitStatistics: {
        }
    },
    getters: {
        recruitStatistics(state) {
            return state.recruitStatistics;
        }
    },
    mutations: {
        setRecruitStatistics(state, recruitStatistics) {
            state.recruitStatistics = recruitStatistics;
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
    }
};