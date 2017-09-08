import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

<<<<<<< HEAD
import Match from './modules/match'
=======
import Movie from './modules/movie'

import Cia from "./modules/cinemastore.js"
import screens from "./modules/screens.js" 
>>>>>>> 41389faf4101e58ed33e839f7a8723d6427d7879

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
<<<<<<< HEAD
       match:Match
=======
        movie:Movie,
        cia:Cia,
        screens
>>>>>>> 41389faf4101e58ed33e839f7a8723d6427d7879
    }
})
export default store;

