import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import Movie from './modules/movie'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        movie:Movie
    }
})
export default store;

