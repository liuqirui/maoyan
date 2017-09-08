
import axios from 'axios';

import Vue from 'vue';
import Vuex from 'vuex';

import Match from './modules/match'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
       match:Match
    }
})
export default store;

