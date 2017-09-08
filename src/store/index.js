import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

import Movie from './modules/movie'

import Cia from "./modules/cinemastore.js"
import screens from "./modules/screens.js" 

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        movie:Movie,
        cia:Cia,
        screens
    }
})
export default store;

