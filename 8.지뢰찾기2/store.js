import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELLl";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

const plantMine = (row, cell, mine) => {
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
        data.push(rowData);
    }

    const candidate = Array(row * cell).fill(0).map((arr, i) => i);

    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    for (let i = 0; i < shuffle.length; i++) {
        const ver = Math.floor(shuffle[i] / cell);
        const hor = shuffle[i] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}

export default new Vuex.Store({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true,
        result: '',
        openedCount: 0,
    },
    mutations: {
        [START_GAME](state, {row, cell, mine}) {
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
            state.result = "";
        },
        [OPEN_CELL](state, {row, cell}) {
            const checked = [];
            let openedCount = 0;
            function checkAround(row, cell) {
                const outOfBounds = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                if (outOfBounds) {
                    return;
                }

                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
                    return;
                }

                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }

                let around = [];

                if (state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][cell - 1],
                        state.tableData[row - 1][cell],
                        state.tableData[row - 1][cell + 1]
                    ]);
                }

                around = around.concat([
                    state.tableData[row][cell - 1],
                    state.tableData[row][cell + 1],
                ])

                if (state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][cell - 1],
                        state.tableData[row + 1][cell],
                        state.tableData[row + 1][cell + 1]
                    ]);
                }

                const aroundMineCount = around.filter(value => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(value)).length;
                if (aroundMineCount === 0 && row > -1) {
                    const near = [];

                    if (row - 1 > -1) {
                        near.push({row: row - 1, cell: cell - 1});
                        near.push({row: row - 1, cell: cell});
                        near.push({row: row - 1, cell: cell + 1});
                    }

                    near.push({row: row, cell: cell - 1});
                    near.push({row: row, cell: cell + 1});

                    if (row + 1 < state.tableData.length) {
                        near.push({row: row + 1, cell: cell - 1});
                        near.push({row: row + 1, cell: cell});
                        near.push({row: row + 1, cell: cell + 1});
                    }

                    near.forEach(position => {
                        if (state.tableData[position.row][position.cell] !== CODE.OPENED) {
                            checkAround(position.row, position.cell);
                        }
                    });
                }

                if (state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount++;
                }
                Vue.set(state.tableData[row], cell, aroundMineCount);
            }
            checkAround(row, cell);
            state.openedCount += openedCount;

            if (state.data.row * state.data.cell - state.data.mine === state.openedCount) {
                state.halted = true;
                state.result = `${state.timer}초 만에 승리하였습니다!`;
            }
        },
        [CLICK_MINE](state, {row, cell}) {
            state.timer = 0;
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.MINE) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },
})