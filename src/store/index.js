
import axios from 'axios';

import Vue from 'vue';
import Vuex from 'vuex';
//影院管理的store
import Cia from "./modules/cinemastore.js"
import screens from "./modules/screens.js" //放映厅的 store -谭亮

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        cia:Cia,
        screens
    }
})
export default store;

