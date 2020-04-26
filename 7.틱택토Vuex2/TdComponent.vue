<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import EventBus from './EventBus';

    export default {
        name: "TdComponent",
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {
            onClickTd() {
                if (this.cellData) return;
                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
            },
        }
    }
</script>

<style scoped>
    td {
        border: 3px solid black;
        width: 100px;
        height: 100px;
        text-align: center;
        font-size: 75px;
    }
</style>