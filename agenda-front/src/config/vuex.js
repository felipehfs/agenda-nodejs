import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {BASEAPIURL} from './global'
Vue.use(Vuex)

export const store = new Vuex.Store({
    actions: {
        async loadContacts({commit}) {
            try{
                const data = await axios.get(`${BASEAPIURL}/contacts`)
                commit('SET_CONTACTS',  {data}  )
            } catch(err) {
                console.log(err)
            }
                
        }
    },
    mutations: {
        SET_CONTACTS(state, payload) {
            state.contacts = payload.data.data.data
        },
        SET_UPDATING(state, payload) {
            if (payload){
                state.updating = payload
            } else {
                state.updating = !state.updating
            }
        },
        SET_ID(state, payload) {
            if(payload) {
                state._id = payload
                return
            }
            state._id = null
        },
        SET_USER(state, payload) {
            state.user = payload
        }
    },
    state: {
        contacts: [],
        updating: false,
        user: null,
        _id: null
    },
    getters: {
        contacts: store => store.contacts,
        updating: store => store.updating,
        _id: store => store._id,
        user: store => store.user
    }
})