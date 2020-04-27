<template>
    <div>
        <div class="turn-message">{{turn}}님의 턴 입니다.</div>

        <table>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" @click="onClickTd(rowIndex, cellIndex)">
                    {{cellData}}
                </td>
            </tr>
        </table>

        <div class="winner-message" v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import store, {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from "./store";

    export default {
        store: store,
        computed: {
            ...mapState(['winner', 'turn', 'tableData']),
        },
        methods: {
            onClickTd(rowIndex, cellIndex) {
                if (this.tableData[rowIndex][cellIndex]) return;

                this.$store.commit(CLICK_CELL, {
                    row: rowIndex,
                    cell: cellIndex
                });

                if (this.isWin(rowIndex, cellIndex)) {
                    this.$store.commit(SET_WINNER);
                    this.$store.commit(RESET_GAME);
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
                        this.$store.commit(NO_WINNER);
                        this.$store.commit(RESET_GAME);
                    } else {
                        this.$store.commit(CHANGE_TURN);
                    }
                }
            },
            isWin(rowIndex, cellIndex) {
                if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn &&
                    this.tableData[rowIndex][2] === this.turn) {
                    return true;
                }
                if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn &&
                    this.tableData[2][cellIndex] === this.turn) {
                    return true;
                }
                if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn &&
                    this.tableData[2][2] === this.turn) {
                    return true;
                }
                if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn &&
                    this.tableData[2][0] === this.turn) {
                    return true;
                }
            }
        }
    };
</script>

<style scoped>
    .turn-message,
    .winner-message {
        font-size: 30px;
    }

    table {
        border-collapse: collapse;
    }

    td {
        border: 3px solid black;
        width: 100px;
        height: 100px;
        text-align: center;
        font-size: 75px;
    }
</style>
