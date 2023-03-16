<template>
    <div>
        <b-table :items="memberList" :fields="fields" striped responsive="sm">
            <!-- <template #cell(resumeLocation)="row">
                <b-button size="sm"  class="mr-2" @click="downloadResume(row.item.memberId)">
                다운로드
                </b-button>
            </template> -->
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
            ]
        }
    },
    computed: {
        memberList() {
            return this.$store.getters['admin/memberManage'].memberList;
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
        }
    },
    watch: {
        queryOption() {
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
   created() {
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