<template>
    <div>
        <div class="turn-message">{{turn}}님의 턴 입니다.</div>
        <table-component v-bind:table-data="tableData"/>
        <div class="turn-message" v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import TableComponent from "./TableComponent";

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
        methods: {},
    };
</script>

<style scoped>
    .turn-message {
        font-size: 30px;
    }
</style>
