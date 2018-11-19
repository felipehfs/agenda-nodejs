<template>
  <v-app>
    <v-navigation-drawer v-model="drawer"
            clipped app>
            <v-list dense>
                <v-list-tile @click="exit">
                    <v-list-tile-action>
                        <v-icon>power_settings_new</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar v-show="user" fixed clipped-left app>
            <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>
        <v-content app>
          <v-container>
              <div>
                  <router-view></router-view>
              </div>
          </v-container>
        </v-content>
        <v-footer v-show="user" app fixed>
        </v-footer>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import {userKey} from '@/config/global'

export default {
  name: 'App',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    exit(){
      localStorage.removeItem(userKey)
      this.$store.commit('SET_USER', null)
      axios.defaults.headers.common['Authorization'] = undefined
      this.drawer = false
      this.$router.push({path:'/'})
    }
  },
  data () {
    return {
      drawer: false,
    }
  }
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
}
</style>
