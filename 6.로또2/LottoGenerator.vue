<template>
    <div>
        <div>당첨 숫자</div>
        <div id="result">
            <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" v-bind:number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
    </div>
</template>

<script>
    import LottoBall from "./LottoBall";

    function getWinNumbers() {
        const candidate = Array(45).fill(0).map((v, i) => i + 1);
        const shuffle = [];

        while (candidate.length > 0) {
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
        }

        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

        return [...winNumbers, bonusNumber];
    }

    const timeOuts = [];

    export default {
        components: {
            'lotto-ball': LottoBall
        },
        data() {
            return {
                winNumbers: getWinNumbers(),
                winBalls: [],
                bonus: null,
                redo: false
            }
        },
        methods: {
            onClickRedo() {
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
                this.showBalls();
            },
            showBalls() {
                for (let i = 0; i < this.winNumbers.length - 1; i++) {
                    timeOuts[i] = setTimeout(() => {
                        this.winBalls.push(this.winNumbers[i])
                    }, (i + 1) * 1000);
                }

                timeOuts[6] = setTimeout(() => {
                    this.bonus = this.winNumbers[6];
                    this.redo = true;
                }, 7000);
            }
        },
        mounted() {
            this.showBalls();
        },
        beforeDestroy() {
            timeOuts.forEach(t => clearTimeout(t));
        }
    };
</script>

<style scoped>

</style>
