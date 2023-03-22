<template>
    <div>
        <b-table :items="memberList" :fields="fields" striped responsive="sm">
            <template #cell(show_details)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                상세정보 {{ row.detailsShowing ? '닫기' : '보기'}}
                </b-button>
            </template>

            <template #row-details="row"> 
                <b-card>
                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>회원 유형: </b></b-col>
                        <b-col>{{ row.item.role}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>아이디: </b></b-col>
                        <b-col>{{ row.item.memberId }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>이름: </b></b-col>
                        <b-col>{{ row.item.memberName}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>별명: </b></b-col>
                        <b-col>{{ row.item.memberNickname}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>전화번호: </b></b-col>
                        <b-col>{{ row.item.memberPhone }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>이메일: </b></b-col>
                        <b-col>{{ row.item.memberEmail }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>성별: </b></b-col>
                        <b-col>{{ row.item.memberGender }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>기업소개: </b></b-col>
                        <b-col>{{ row.item.memberInfo}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>생년월일/창립일: </b></b-col>
                        <b-col>{{ row.item.memberBirth}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>주소: </b></b-col>
                        <b-col>{{ row.item.memberAddr }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>경도: </b></b-col>
                        <b-col>{{ row.item.memberCoordX }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>위도: </b></b-col>
                        <b-col>{{ row.item.memberCoordY}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>사업자등록번호: </b></b-col>
                        <b-col>{{ row.item.memberRegNum}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>회원 승인 여부: </b></b-col>
                        <b-col>{{ row.item.memberVerified }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>구직/채용 분야: </b></b-col>
                        <b-col>{{ row.item.workAreaId }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col sm="3" class="text-sm-right"><b>작업: </b></b-col>
                        <b-col>
                            <b-button @click="deleteMember(row.item.memberId)">
                                회원 탈퇴
                            </b-button>&nbsp;
                            <b-button
                                v-if="row.item.role === 'ROLE_COMPANY'"
                                :disabled="row.item.memberVerified"
                                @click="verifyMember(row.item.memberId)">
                                회원 승인
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
            verifyMemberResult: {
                success: null
            },
            deleteMemberResult: {
                success: null
            },
            fields: [
                {
                    key: 'memberId',
                    label: '회원 아이디',
                    sortable: true
                },
                {
                    key: 'memberName',
                    label: '회원 이름',
                    sortable: true
                },
                {
                    key: 'memberNickname',
                    label: '회원 별명',
                    sortable: true
                },
                                {
                    key: 'memberEmail',
                    label: '회원 이메일',
                    sortable: true
                },
                {
                    key: 'memberGender',
                    label: '회원 성별',
                    sortable: true
                },
                {
                    key: 'memberPhone',
                    label: '회원 연락처',
                    sortable: true
                },
                {
                    key: 'memberType',
                    label: '회원 종류',
                    sortable: true
                },
                {
                    key: 'memberVerified',
                    label: '회원 승인 여부',
                    sortable: true
                },
                {
                    key: 'show_details',
                    label: '상세 정보'
                }
            ]
        }
    },
    computed: {
        memberListRaw() {
            return this.$store.getters['admin/memberManage'].memberList;
        },
        memberList() {
            return this.$store.getters['admin/memberManage'].memberList
                .map(item => {
                    return {
                        ...item,
                        _showDetails: false,
                        memberBirth: dayjs.unix(item.memberBirth / 1000).format("YYYY년 MM월 DD일"),
                        memberVerified: item.role === 'ROLE_COMPANY' ? item.memberVerified : '-',
                        memberGender: item.memberGender === 'F' ? '여성' : item.memberGender === 'M' ? '남성' : '-',
                        memberType: item.memberType === 'N' ? '구직' : item.memberType === 'C' ? '기업' :  '관리'
                    };
                });
        },
        total() {
            return this.$store.getters['admin/memberManage'].total;
        },
        queryOption() {
            return this.$store.getters['admin/memberManage'].queryOption;
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
            if (Object.keys(this.memberList).length !== 0) {
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
            if (Object.keys(this.memberList).length !== 0) {
                const option = this.queryOption;
                pageCount = Math.ceil(this.total / option.size);
            }

            if (page > 0 && page <= pageCount) {
                this.$store.commit('admin/setMemberOption', { ...this.queryOption, page })
            }
        },
        verifyMember(memberId) {
            const memberInfo = this.memberListRaw.find((item) => {
                return item.memberId === memberId;
            })
            memberInfo.memberVerified = true;

            this.$store.dispatch('auth/authRequest', {
            requestCallback: () => {
                this.$store.dispatch('admin/requestEditMember', { memberInfo, resultRef: this.verifyMemberResult });
            },
            failedCallback: (error) => {
                console.error('실패');
                console.error(error);
            }
            });
        },
        deleteMember(memberId) {
            if (!confirm("정말로 회원 정보를 삭제하시겠습니까? 이 작업은 돌이킬 수 없습니다.")) {
                return;
            }

            this.$store.dispatch('auth/authRequest', {
            requestCallback: () => {
                this.$store.dispatch('admin/requestDeleteMember', { memberId, resultRef: this.deleteMemberResult });
            },
            failedCallback: (error) => {
                console.error('실패');
                console.error(error);
            }
            });
        },
        loadMemberList() {
            this.$store.dispatch('auth/authRequest', {
            requestCallback: () => {
                this.$store.dispatch('admin/requestMemberList');
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
        queryOption() {
            this.loadMemberList();
        },
        'verifyMemberResult.success': {
            handler(val) {
                if (val === true) {
                    this.loadMemberList();
                    this.verifyMemberResult.success = null;
                } else if (val === false) {
                    alert('회원 승인에 실패했습니다.')
                }
            }
        }
    },
    created() {
        this.loadMemberList();
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