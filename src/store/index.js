import Vue from 'vue'
import Vuex from 'vuex'
import example from './modules/example'
import catalog from './modules/catalog'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appNavShowContent: false
  },
  mutations: {
    APP_NAV_SET_SHOW_CONTENT: (state, value) => {
      state.appNavShowContent = value
    },
    APP_NAV_TOGGLE_SHOW_CONTENT: (state) => {
      state.appNavShowContent = !state.appNavShowContent
    }
  },
  actions: {
    /** Manages the visible state of EvnAppNav and EvnContextBrowser
     ** -Toggles the state of appNavShowContent
     ** -If toggled to true, sets the state of contextBrowserShowContent to false
     **/
    APP_NAV_TOGGLE_SHOW_CONTENT: (context) => {
      context.commit('APP_NAV_TOGGLE_SHOW_CONTENT')
      if (context.state.appNavShowContent) {
        context.commit('CONTEXT_BROWSER_SET_SHOW_CONTENT', false)
      }
    }
  },
  modules: {
    example,
    catalog
  }
})
