<template>
    <div>
        <div id="computer" v-bind:style="computedStyleObject"></div>
        <div>
            <button v-on:click="onClickButton('ROCK')">바위</button>
            <button v-on:click="onClickButton('SCISSOR')">가위</button>
            <button v-on:click="onClickButton('PAPER')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
    </div>
</template>

<script>
    const rspCoords = {
        ROCK: '0',
        SCISSOR: '-142px',
        PAPER: '-284px'
    }

    const scores = {
        SCISSOR: 1,
        ROCK: 0,
        PAPER: -1
    }

    const computerChoice = (imageCoord) => {
        return Object.entries(rspCoords).find(function (v) {
            return v[1] === imageCoord;
        })[0];
    }

    let interval = null;

    export default {
        data() {
            return {
                imageCoord: rspCoords.ROCK,
                result: '',
                score: 0
            };
        },
        computed: {
            computedStyleObject() {
                return {background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imageCoord} 0`}
            }
        },
        methods: {
            changeHand() {
                interval = setInterval(() => {
                    if (this.imageCoord === rspCoords.ROCK) {
                        this.imageCoord = rspCoords.SCISSOR;
                    } else if (this.imageCoord === rspCoords.SCISSOR) {
                        this.imageCoord = rspCoords.PAPER;
                    } else if (this.imageCoord === rspCoords.PAPER) {
                        this.imageCoord = rspCoords.ROCK;
                    }
                }, 100)
            },
            onClickButton(choice) {
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imageCoord)]
                const diff = myScore - cpuScore;

                if (diff === 0) {
                    this.result = '비겼습니다.';
                } else if ([-1, 2].includes(diff)) {
                    this.result = '이겼습니다.';
                    this.score += 1;
                } else {
                    this.result = '졌습니다.';
                    this.score -= 1;
                }
                setTimeout(() => {
                    this.changeHand();
                }, 1500)
            }
        },
        created() {
            console.log('created');
        },
        mounted() {
            interval = setInterval(() => {
                if (this.imageCoord === rspCoords.ROCK) {
                    this.imageCoord = rspCoords.SCISSOR;
                } else if (this.imageCoord === rspCoords.SCISSOR) {
                    this.imageCoord = rspCoords.PAPER;
                } else if (this.imageCoord === rspCoords.PAPER) {
                    this.imageCoord = rspCoords.ROCK;
                }
            }, 100)
        },
        beforeUpdate() {
            console.log('before updated')
        },
        updated() {
            console.log('updated');
        },
        beforeDestroy() {
            clearInterval(interval);
        },
        destroyed() {
            console.log('destroyed');
        }
    };
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>