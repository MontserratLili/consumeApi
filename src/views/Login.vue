<template>
    <div>
        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
                <v-card-title class="purple white--text">
                    <router-link to="/custom" class="white--text">Custom</router-link>
                </v-card-title>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
                <v-text-field v-model="mail" label="e-mail" placeholder="e-mail"></v-text-field>
                <v-text-field v-model="contrasena" label="Contraseña" placeholder="contraseña"></v-text-field>
                <v-btn color="primary" small @click="iniciarSesion()" >Iniciar Sesion </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login',
    data () {
        return {
            mail:"lauraliligm@gmail.com",
            contrasena:"1234567"
            }
    },
    methods : {
        iniciarSesion () {
            console.log(this.mail)
            console.log(this.contrasena)

            var a = firebase.auth().signInWithEmailAndPassword(this.mail, this.contrasena).then(
                (succes) => {
                    console.log(succes);
                    this.$router.replace('/home');
                },
                (error) => {
                    console.log("error" + error);
                }
            );/*
            if(a.succes){
                 this.$router.replace('/home');
            }*/
            console.log(a);
        }
    }
}
</script>

<style scoped>
</style>