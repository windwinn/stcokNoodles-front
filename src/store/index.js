import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    jobTypes: [],
    loader: false,
  },
  mutations: {
    setJobTypes(state, value) {
      state.jobTypes = value
    },
    setLoader(state, value) {
      state.loader = value
    }
  },
  actions: {
    setJobTypes({ commit }, value) {
        commit("setJobTypes", value);
    },
    setLoader({ commit }, value) {
        commit("setLoader", value);
    }
  },
  modules: {
  },
  getters: {
    jobTypes: (state) => state.jobTypes,
    loader: (state) => state.loader,
  }
})
