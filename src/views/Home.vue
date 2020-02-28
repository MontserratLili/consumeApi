<template>
  <div class="home">
    <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
        <v-card-title class="blue white--text">
          <span class="headline">Menu</span>
          <v-spacer></v-spacer>
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn class="blue white--text" dark icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <router-link to="./custom">{{ title1 }}</router-link><br>
              <router-link to="./login">{{ title2 }}</router-link><br>
              <router-link to="./home">{{ title3 }}</router-link><br>
              <router-link to="./consumeapi">{{ title4 }}</router-link><br>
              <v-btn class="blue white--text" dark text @click="terminarSesion()">
                Terminar Sesión
              </v-btn>
            </v-list>
          </v-menu>
        </v-card-title>
      </v-col>
  </v-row>
  </div>
  
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => ({
      title1: 'Custom',
      title2: 'Login',
      title3: 'Home',
      title4: 'ConsumeApi',
    }),
    methods: {
        terminarSesion () {
            firebase.auth().signOut().then( () => {
                this.$router.replace('/custom')
            })
        }
    }
}
</script>

<style scoped>
</style>