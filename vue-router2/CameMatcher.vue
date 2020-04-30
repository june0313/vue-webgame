<template>
    <div v-if="currentGame === 'number-baseball'">
        <number-baseball></number-baseball>
    </div>
    <div v-else-if="currentGame === 'response-check'">
        <response-check></response-check>
    </div>
    <div v-else>일치하는 게임이 없습니다.</div>
</template>

<script>
    import NumberBaseball from "../3-1.숫자야구/NumberBaseball";
    import ResponseCheck from "../4.반응속도체크2/ResponseCheck";

    export default {
        name: "CameMatcher",
        components: {
            NumberBaseball,
            ResponseCheck,
        },
        mounted() {
            console.log(this.$router);
            console.log(this.$route);
        },
        computed: {
            currentGame() {
                return this.$route.params.name;
            }
        }
    }
</script>

<style scoped>

</style>