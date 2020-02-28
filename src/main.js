import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import vuetify from '@/plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false
let app = '';

const firebaseConfig = {
  apiKey: "AIzaSyAZKLbaNmL12aK4cqpe8X8TKtsbTR5mps0",
  authDomain: "autenticacion-28478.firebaseapp.com",
  databaseURL: "https://autenticacion-28478.firebaseio.com",
  projectId: "autenticacion-28478",
  storageBucket: "autenticacion-28478.appspot.com",
  messagingSenderId: "123569914477",
  appId: "1:123569914477:web:198bb64e813f0002587564",
  measurementId: "G-FCP57ZNR51"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router: router,
      render: h => h(App)
    }).$mount('#app')
  }
})
