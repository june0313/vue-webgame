import Vue from 'vue';
import VueRouter from 'vue-router';
import NumberBaseball from "../3-1.숫자야구/NumberBaseball";
import ResponseCheck from "../4.반응속도체크2/ResponseCheck";
import RockScissorsPaper from "../5.가위바위보2/RockScissorsPaper";
import LottoGenerator from "../6.로또2/LottoGenerator";
import GameMatcher from "./CameMatcher";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/number-baseball', component: NumberBaseball
        },
        {
            path: '/response-check', component: ResponseCheck
        },
        {
            path: '/rock-scissors-paper', component: RockScissorsPaper
        },
        {
            path: '/lotto-generator', component: LottoGenerator
        },
        {
            path: "/game/:name", component: GameMatcher
        }
    ],
});
