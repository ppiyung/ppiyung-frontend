<template>
    <div>
        <b-table :items="recruitList" :fields="fields" striped responsive="sm">
            <template #cell(showDetails)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                상세정보 {{ row.detailsShowing ? '닫기' : '보기'}}
                </b-button>
            </template>

            <template #row-details="row"> 
                <b-card>
                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>공고 ID: </b></b-col>
                        <b-col>{{ row.item.recruitId}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>진행 여부: </b></b-col>
                        <b-col>{{ row.item.isOngoing }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>기업명(기업ID): </b></b-col>
                        <b-col>{{ row.item.companyName }}({{ row.item.companyId }})</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>채용 분야: </b></b-col>
                        <b-col>{{ row.item.workArea }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>공고명: </b></b-col>
                        <b-col>{{ row.item.recruitTitle }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>공고 내용: </b></b-col>
                        <b-col>{{ row.item.recruitDetail }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>공고 시작: </b></b-col>
                        <b-col>{{ row.item.recruitStartAt }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>공고 종료: </b></b-col>
                        <b-col>{{ row.item.recruitEndAt }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>작업: </b></b-col>
                        <b-col>
                            <b-button @click="setExpose(row.item.recruitId, !row.item.recruitExpose)">
                                {{row.item.recruitExpose ? '상단 배너 노출 중단'
                                    : '상단 배너 노출 시작'}}
                            </b-button> &nbsp;
                            <b-button @click="stopRecruit(row.item.recruitId)" v-if="row.item.isOngoing === '노출 중'">
                                즉시 마감
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
import dayjs from 'dayjs';

export default {
    data() {
        return {
            editRecruitResult: {
                success: null
            },
            exposeRecruitResult: {
                success: null
            },
            includeClosed: false,
            fields: [
                {
                    key: 'recruitId',
                    label: '공고 ID',
                    sortable: true
                },
                {
                    key: 'companyId',
                    label: '기업 ID',
                    sortable: true
                },
                {
                    key: 'companyName',
                    label: '기업명',
                    sortable: true
                },
                {
                    key: 'workArea',
                    label: '채용 분야',
                    sortable: true
                },
                {
                    key: 'recruitTitle',
                    label: '공고명',
                    sortable: true
                },
                {
                    key: 'recruitStartAt',
                    label: '공고 시작',
                    sortable: true
                },
                {
                    key: 'recruitEndAt',
                    label: '공고 종료',
                    sortable: true
                },
                {
                    key: 'isOngoing',
                    label: '진행중 여부',
                    sortable: true 
                },
                {
                    key: 'recruitExpose',
                    label: '상단 노출 여부',
                    sortable: true 
                },
                {
                    key: 'showDetails',
                    label: '상세정보',
                    sortable: true
                }
            ]
        }
    },
    computed: {
        recruitListRaw() {
            return this.$store.getters['admin/recruitManage'].recruitList;
        },
        recruitList() {
            return this.$store.getters['admin/recruitManage'].recruitList
                .map(item => {
                    return {
                        ...item,
                        _showDetails: false,
                        recruitStartAt: dayjs.unix(item.recruitStartAt / 1000).format("YYYY년 MM월 DD일"),
                        recruitEndAt: dayjs.unix(item.recruitEndAt / 1000).format("YYYY년 MM월 DD일"),
                        workArea: item.workAreaId === 1 ? '프론트엔드' : item.workAreaId === 2 ? '웹개발' : '알 수 없음' ,
                        isOngoing: new Date() > new Date(item.recruitStartAt) && new Date() < new Date(item.recruitEndAt) ? '노출 중' : '마감'
                    };
                });
        },
        total() {
            return this.$store.getters['admin/recruitManage'].total;
        },
        queryOption() {
            return this.$store.getters['admin/recruitManage'].queryOption;
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
            if (Object.keys(this.recruitList).length !== 0) {
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
            if (Object.keys(this.recruitList).length !== 0) {
                const option = this.queryOption;
                pageCount = Math.ceil(this.total / option.size);
            }

            if (page > 0 && page <= pageCount) {
                this.$store.commit('admin/setRecruitOption', { ...this.queryOption, page })
            }
        },
        stopRecruit(recruitId) {
            if (!confirm("공고를 정말 마감하시겠습니까? 기업회원이 공고 기간을 다시 수정해야 공고가 다시 노출됩니다.")) {
                return;
            }

            const recruitInfo = this.recruitListRaw.find((item) => {
                return item.recruitId === recruitId;
            })
            recruitInfo.recruitEndAt = new Date(new Date().setDate((new Date().getDate()-1))).toISOString();

            this.$store.dispatch('auth/authRequest', {
                requestCallback: () => {
                    this.$store.dispatch('admin/requestEditRecruit', { recruitInfo, resultRef: this.editRecruitResult });
                },
                failedCallback: (error) => {
                    console.error('실패');
                    console.error(error);
                }
            });
        },
        setExpose(recruitId, willBeExposed) {
            console.log(willBeExposed);
            if (!confirm("배너 노출 설정을 변경하시겠습니까? 이 작업은 즉시 반영됩니다.")) {
                return;
            }

            this.$store.dispatch('auth/authRequest', {
                requestCallback: () => {
                    this.$store.dispatch('admin/requestSetRecruitExpose', { willBeExposed, recruitId, resultRef: this.exposeRecruitResult });
                },
                failedCallback: (error) => {
                    console.error('실패');
                    console.error(error);
                }
            });
        },
        loadRecruitList() {
                this.$store.dispatch('auth/authRequest', {
                requestCallback: () => {
                    this.$store.dispatch('admin/requestRecruitList');
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
                this.loadRecruitList();
            },
            deep: true
        },
        'editRecruitResult.success': {
            handler(val) {
                if (val === true) {
                    this.loadRecruitList();
                    this.editRecruitResult.success = null;
                } else if (val === false) {
                    alert('공고 즉시 마감에 실패했습니다.')
                }
            }
        },
        'exposeRecruitResult.success': {
            handler(val) {
                if (val === true) {
                    this.loadRecruitList();
                    this.exposeRecruitResult.success = null;
                } else if (val === false) {
                    alert('공고 상단 노출여부 수정에 실패했습니다.')
                }
            }
        },
        inlcudeClosed(val) {
            let valueByBool;
            if (val === 'true') {
                valueByBool = true;
            } else {
                valueByBool = false;
            }

            this.$store.commit('recruit/setPageOption', {
                ...this.$store.getters['admin/recruitManage'].queryOption,
                closed: valueByBool
            });
        }
    },
    created() {
        this.loadRecruitList();
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