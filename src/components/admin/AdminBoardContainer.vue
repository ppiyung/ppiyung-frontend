<template>
    <div>
        <b-table :items="boardList" :fields="fields" striped responsive="sm">
            <template #cell(showDetails)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                상세정보 {{ row.detailsShowing ? '닫기' : '보기'}}
                </b-button>
            </template>

            <template #row-details="row"> 
                <b-card>
                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>게시글 ID: </b></b-col>
                        <b-col>{{ row.item.articleId}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>게시글 제목: </b></b-col>
                        <b-col>{{ row.item.articleTitle }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>게시글 내용: </b></b-col>
                        <b-col>{{ row.item.articleContent }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>게시자: </b></b-col>
                        <b-col>{{ row.item.member }}({{ row.item.companyId }})</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>댓글 수: </b></b-col>
                        <b-col>{{ row.item.commentCnt }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>좋아요 수: </b></b-col>
                        <b-col>{{ row.item.likeCnt }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>게시 시각: </b></b-col>
                        <b-col>{{ row.item.articleCreatedAt }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>작업: </b></b-col>
                        <b-col>
                            <b-button @click="deleteArticle(row.item.articleId)">
                                삭제
                            </b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </template>
        </b-table>
 
        <div class="page-indicator">
            <span
                class="page-num-link"
                @click="changePage(queryOption.page - 1)"
            > &lt; </span> &nbsp;

            <span
                v-for="pageNum in pageArr"
                :key="pageNum"
            >
                <span
                    class="page-num-link"
                    :class="pageNum === queryOption.page ? 'selected' : ''"
                    @click="changePage(pageNum)"
                >{{ pageNum }}</span>
                &nbsp;
            </span>

            <span
                class="page-num-link"
                @click="changePage(queryOption.page + 1)"
            > &gt; </span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            deleteArticleResult: {
                success: null
            },
            fields: [
                {
                    key: 'articleId',
                    label: '게시글 ID',
                    sortable: true
                },
                {
                    key: 'articleTitle',
                    label: '게시글 제목',
                    sortable: true
                },
                {
                    key: 'member',
                    label: '게시자',
                    sortable: true
                },
                {
                    key: 'commentCnt',
                    label: '댓글 수',
                    sortable: true
                },
                {
                    key: 'likeCnt',
                    label: '좋아요 수',
                    sortable: true
                },
                {
                    key: 'articleCreatedAt',
                    label: '게시 시각',
                    sortable: true
                },
                {
                    key: 'showDetails',
                    label: '상세정보',
                    sortable: true
                },
            ]
        }
    },
    computed: {
        boardListRaw() {
            return this.$store.getters['admin/boardManage'].boardList;
        },
        boardList() {
            return this.$store.getters['admin/boardManage'].boardList
                .map(item => {
                    return {
                        ...item,
                        _showDetails: false,
                        member: `${item.memberId} (${item.memberNickname})`
                    };
                });
        },
        total() {
            return this.$store.getters['admin/boardManage'].total;
        },
        queryOption() {
            return this.$store.getters['admin/boardManage'].queryOption;
        },
        pageTotal() {
            if (Object.keys(this.queryOption).length !== 0) {
                const option = this.queryOption;
                return Math.ceil(this.total / option.size);
            } else {
                return 0;
            }
        },
        pageArr() {
            let pageCount = 0;
            if (Object.keys(this.boardList).length !== 0) {
                const option = this.queryOption;
                pageCount = Math.ceil(this.total / option.size);
            } else {
                return [ '1' ]
            }

            const currentPage = this.queryOption.page;
            const size = this.queryOption.size;
            const currentGroup = Math.ceil(currentPage / size);

            let lastNumber = currentGroup * pageCount;
            if (lastNumber > pageCount) {
                lastNumber = pageCount;
            }
            const firstNumber = lastNumber - (pageCount - 1);
            
            return [...new Array(lastNumber - firstNumber + 1).keys()]
                .map(key => key + firstNumber);
        }
    },
    methods: {
        changePage(page) {
            let pageCount = 0;
            if (Object.keys(this.boardList).length !== 0) {
                const option = this.queryOption;
                pageCount = Math.ceil(this.total / option.size);
            }

            if (page > 0 && page <= pageCount) {
                this.$store.commit('admin/setBoardOption', { ...this.queryOption, page })
            }
        },
        deleteArticle(articleId) {
            if (!confirm("정말로 삭제하시겠습니까? 이 작업은 돌이킬 수 없습니다.")) {
                return;
            }

            this.$store.dispatch('auth/authRequest', {
            requestCallback: () => {
                this.$store.dispatch('admin/requestDeleteArticle', { articleId, resultRef: this.deleteArticleResult });
            },
            failedCallback: (error) => {
                console.error('실패');
                console.error(error);
            }
            });
        },
        loadBoardList() {
            this.$store.dispatch('auth/authRequest', {
            requestCallback: () => {
                this.$store.dispatch('admin/requestBoardList');
            },
            failedCallback: (error) => {
                console.error('실패');
                console.error(error);
                this.$store.commit('common/setSuccess', false);
            }
            });
        }
    },
    watch: {
        'queryOption': {
            handler() {
                this.loadBoardList();
            },
            deep: true
        },
        'deleteArticleResult.success': {
            handler(val) {
                if (val === true) {
                    this.loadBoardList();
                    this.deleteArticleResult.success = null;
                } else if (val === false) {
                    alert('공고 즉시 마감에 실패했습니다.')
                }
            }
        }
    },
    created() {
        this.loadBoardList();
    } 
}
</script>
<style scoped>
.page-num-link {
    cursor: pointer;
}
.selected {
    font-weight: bold;
}
</style>