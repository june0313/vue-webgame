<template>
    <div>
        <div class="turn-message">{{turn}}님의 턴 입니다.</div>
        <table-component v-bind:table-data="tableData"/>
        <div class="turn-message" v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import TableComponent from "./TableComponent";
    import EventBus from './EventBus';

    export default {
        components: {TableComponent},
        data() {
            return {
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                turn: 'O',
                winner: '',
            };
        },
        methods: {
            onClickTd(rowIndex, cellIndex) {
                this.$set(this.tableData[rowIndex], cellIndex, this.turn);

                if (this.isWin(rowIndex, cellIndex)) {
                    this.winner = this.turn;
                    this.turn = 'O';
                    this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                } else {
                    let all = true;
                    this.tableData.forEach(row => {
                        row.forEach(cell => {
                            if (!cell) {
                                all = false;
                            }
                        });
                    });

                    if (all) {
                        this.winner = '';
                        this.turn = 'O';
                        this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                    } else {
                        this.turn = this.turn === 'O' ? 'X' : 'O';
                    }
                }
            },
            isWin(rowIndex, cellIndex) {
                if (this.tableData[rowIndex][0] === this.turn &&
                    this.tableData[rowIndex][1] === this.turn &&
                    this.tableData[rowIndex][2] === this.turn) {
                    return true;
                }
                if (this.tableData[0][cellIndex] === this.turn &&
                    this.tableData[1][cellIndex] === this.turn &&
                    this.tableData[2][cellIndex] === this.turn) {
                    return true;
                }
                if (this.tableData[0][0] === this.turn &&
                    this.tableData[1][1] === this.turn &&
                    this.tableData[2][2] === this.turn) {
                    return true;
                }
                if (this.tableData[0][2] === this.turn &&
                    this.tableData[1][1] === this.turn &&
                    this.tableData[2][0] === this.turn) {
                    return true;
                }
            }
        },
        created() {
            EventBus.$on('clickTd', this.onClickTd);
        }
    };
</script>

<style scoped>
    .turn-message {
        font-size: 30px;
    }
</style>
