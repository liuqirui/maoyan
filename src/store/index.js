
import axios from 'axios';

import Vue from 'vue';
import Vuex from 'vuex';
//影院管理的store
import Cia from "./modules/cinemastore.js"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        cia:Cia,
    }
})
export default store;

