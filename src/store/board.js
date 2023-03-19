import axios from 'axios';
import apiUri from '@/apiUri';
import router from '@/router';
export default {
    namespaced: true,
    // 변수의미 (공통으로 사용할 변수 정의)
    state: {
        boardList: [], // 게시글 목록
        boardDetail: {}, // 게시글 세부내용
        boardTotal: '',
        likechecked: []
    },
    // 변수를 반환하는 getter로 이해.
    getters: {
        likechecked(state){
            return state.likechecked;
        }
        ,
        boardList(state) {
            return state.boardList;
        },
        boardDetail(state) {
            return state.boardDetail;
        },
        boardTotal(state) {
            return state.boardTotal;
        }

    },


    // 변수를 설정하는 setter값으로 이해.
    mutations: {
        setLikechecked(state,likechecked){
            state.likechecked =likechecked;
        }
        ,
        setBoardList(state, boardList) {
            state.boardList = boardList;
        },
        setBoardDetail(state, boardDetail) {
            state.boardDetail = boardDetail;
        },
        setBoardTotal(state, boardTotal) {
            state.boardTotal = boardTotal;
        }
    },

    // 커뮤니티에서 수행하는 메서드 
    actions: {
        // 전체 커뮤니티 게시글 목록 조회
        requestBoardList({ commit, rootGetters }, pageNum) {
            console.log(pageNum);
            axios.get(
                `${apiUri.board}/article`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    },
                    params: {
                        page: pageNum,
                        size: 3
                    }
                }
            )
                //  권한을 호출을 성공할 경우.
                .then((result) => {
                    commit('setBoardList', result.data.payload.list);
                    commit('setBoardTotal', result.data.payload.total);
                    commit('common/setSuccess', true, { root: true });
                })
                // 데이터 호출이 실패할 경우
                .catch((error) => {
                    console.error(error);
                    commit('common/setSuccess', false, { root: true });
                });
        },

        //개별 커뮤니티 게시물 세부 조회
        requestBoardDetail({ commit, rootGetters }, articleId) {
            axios.get(
                `${apiUri.board}/article/${articleId}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    },
                    params: {
                        page: 1,
                        size: 3
                    }
                }
            )
                .then((result) => {
                    commit('setBoardDetail', result.data.payload[0]);
                }).catch((error) => {
                    console.error(error);
                });
        },

        // 게시물 등록
        setInsertBoard({ commit, rootGetters }, { memberId, articleCreatedAt, articleTitle, articleContent }) {
            axios.post(
                `${apiUri.board}/article`,
                {
                    memberId, articleTitle, articleCreatedAt, articleContent
                }
                ,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`

                    }
                }

            ).then(() => {
                commit('common/setSuccess', true, { root: true });
            }).catch((error) => {
                console.error(error);
                commit('common/setSuccess', false, { root: true });
            });
        },
        //게시물 수정
        setModifyBoard({ commit, rootGetters }, { articleCreatedAt, articleTitle, articleContent, articleId }) {
            axios.put(
                `${apiUri.board}/article/${articleId}`,
                {
                    articleTitle, articleCreatedAt, articleContent, articleId
                }
                ,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`

                    }
                }
            ).then(() => {
                commit('common/setSuccess', true, { root: true });
            }).catch((error) => {
                console.error(error);
                commit('common/setSuccess', false, { root: true });
            });
        },
        // 게시글 삭제
        deleteBoard({ commit, rootGetters }, { articleId }) {
            axios.delete(
                `${apiUri.board}/article/${articleId}`,
                {
                    withCredentials: true,
                    params: {
                        articleId: this.articleId
                    },
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    }
                }
            ).then(() => {
                    console.log('삭제완료');
                    commit('common/setSuccess', true, { root: true });
                    //router.push({ name: 'main' });
                    router.push({ name: 'board' });
                    console.log('삭제완료2');
                })
                .catch(() => {
                    commit('common/setSuccess', false, { root: true });
                });
        },
        // 좋아요 추가
        insertLike({ commit, rootGetters }, { memberId, likeCreatedAt, articleId, reloadFuncRef }) {
            axios.post(
            `${apiUri.board}/like`,{memberId, likeCreatedAt, articleId},
                {
                    withCredentials: true,
                 
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    }
                }
            ).then(() => {
                commit('common/setSuccess', true, { root: true });
                reloadFuncRef();
            }).catch((error) => {
                console.error(error);
                commit('common/setSuccess', false, { root: true });
            });
        },
          // 좋아요 취소
        cencleLike({ commit, rootGetters }, { articleId,memberId, reloadFuncRef }) {
            axios.delete(
            `${apiUri.board}/like/${articleId}/${memberId}`,
                {
                    withCredentials: true,  
                    params :{
                        memberId,articleId
                    },
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    }
                }
            ).then(() => {
                commit('common/setSuccess', true, { root: true });
                reloadFuncRef();
            }).catch((error) => {
                console.error(error);
                commit('common/setSuccess', false, { root: true });
            });
        },
        // 좋아요 조회
        checkedLike({commit,rootGetters},{articleId, memberId}){
         axios.get(
           `${apiUri.board}/like/${articleId}/${memberId}`,
                {
                    withCredentials: true,  
                    params :{
                        memberId,articleId
                    },
                    headers: {
                        Authorization: `Bearer ${rootGetters['auth/accessToken']}`
                    }
                }
            ).then((result) => {
                if(result.data.payload[0] == null){
                commit('setLikechecked', null);
                }else {
                commit('setLikechecked', result.data.payload[0]);
                }
            }).catch((error) => {
                console.error(error);
                commit('common/setSuccess', false, { root: true });
         });
       }
    }

};