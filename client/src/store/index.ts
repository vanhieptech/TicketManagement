// example store index
import { GetterTree, ActionTree, MutationTree } from 'vuex'
// import auth from '@nuxtjs/auth'
export const state = () => ({
  things: [] as string[],
  name: 'Me',
  // auth
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: (state) => state.name,
  // isAuthenticated: (state) => {
  //   return state.auth.loggedIn
  // },

  // loggedInUser: (state) => {
  //   return state.auth.user
  // }
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
}

export const actions: ActionTree<RootState, RootState> = {
  fetchThings({ commit }) {
    const things = this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
}
