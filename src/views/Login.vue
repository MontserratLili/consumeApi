<template>
  <div id="Usuarios" class="container">
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card-title class="purple white--text">
          <router-link to="/custom" class="white--text">Custom</router-link>
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-text-field
          v-model="mail"
          label="e-mail"
          placeholder="e-mail"
        ></v-text-field>
        <v-text-field
          v-model="contrasena"
          label="Contraseña"
          placeholder="contraseña"
        ></v-text-field>
        <v-btn color="primary" small @click="iniciarSesion()"
          >Iniciar Sesion
        </v-btn>
        <v-btn color="primary" small @click="listarUsuarios()"
          >Listar Usuarios
        </v-btn>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-list>
          <v-text-field
            v-model="email"
            type="text"
            class="form-control"
            placeholder="email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            @keyup.enter="crearUsuario"
            type="text"
            name="password"
            placeholder="password"
            class="form-control"
          ></v-text-field>
          <v-btn
            color="primary"
            small
            @click="crearUsuario"
            value="Añadir"
            class="btn btn-success"
            >escribir
          </v-btn>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tr v-for="(usuario, index) in usuarios" :key="index">
          <td>{{ usuario.id }}</td>
          <td>
            <span v-if="formActualizar && idActualizar == index">
              <input
                v-model="nombreActualizar"
                type="text"
                class="form-control"
              />
            </span>
            <span v-else>
              {{ usuario.email }}
            </span>
          </td>
          <td>
            <span v-if="formActualizar && idActualizar == index">
              <input
                v-model="passwordActualizar"
                type="text"
                class="form-control"
              />
            </span>
            <span v-else>
              {{ usuario.password }}
            </span>
          </td>
          <td>
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on" class="mx-2" fab>
                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <span v-if="formActualizar && idActualizar == index">
                      <span @click="guardarAct(index)">Guardar</span>
                    </span>
                    <span v-else>
                      <span @click="verFormAct(index)">Actualizar</span>
                      <br />
                      <span @click="borrarUsuario(index)">Borrar</span>
                    </span>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </td>
        </tr>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      data: "",
      mail: "lauraliligm@gmail.com",
      contrasena: "1234567",
      email: "",
      password: "",
      id: "",
      usuario: "",
      formActualizar: false,
      idActualizar: -1,
      nombreActualizar: "",
      passwordActualizar: "",
      usuarios: [],
      visible: ""
    };
  },
  mounted() {
    const todos = JSON.parse(this.$localStorage.get("usuarios"));
    if (todos) {
      this.usuarios = todos;
    }
  },
  methods: {
    iniciarSesion() {
      console.log(this.mail);
      console.log(this.contrasena);

      var a = firebase
        .auth()
        .signInWithEmailAndPassword(this.mail, this.contrasena)
        .then(
          succes => {
            console.log(succes);
            //this.$router.replace("/home");
          },
          error => {
            console.log("error" + error);
          }
        ); /*
            if(a.succes){
                 this.$router.replace('/home');
            }*/
      console.log(a);
    },
    //ya lo hace con firebase
    crearUsuario() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          console.log(errorCode);
          var errorMessage = error.message;
          console.log(errorMessage);
          // ...
        });

      this.usuarios.push({
        id: this.id + 1,
        email: this.email,
        password: this.password
      });
      console.log(this.usuarios);
      this.$localStorage.set("usuarios", JSON.stringify(this.usuarios));
      this.email = "";
      this.password = "";
    },
    verFormAct(usuario) {
      /*
      //var newPassword = getASecureRandomPassword();
      var newPassword = this.usuarios[usuario].password;
      firebase.updatePassword(newPassword).then(function() {
      // Update successful.
      }).catch(function(error) {
      // An error happened.
        console.log(error);
      });*/

      this.idActualizar = usuario;
      this.nombreActualizar = this.usuarios[usuario].email;
      this.passwordActualizar = this.usuarios[usuario].password;
      this.formActualizar = true;
      this.$localStorage.set("usuarios", JSON.stringify(this.usuarios));
    },
    borrarUsuario(usuario) {
      this.usuarios.splice(usuario, 1);
      this.$localStorage.set("usuarios", JSON.stringify(this.usuarios));

      var user = firebase.auth().currentUser;

      user
        .delete()
        .then(function() {
          // User deleted.
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
    },
    guardarAct(usuario) {
      this.formActualizar = false;
      this.usuarios[usuario].email = this.nombreActualizar;
      this.usuarios[usuario].password = this.passwordActualizar;
      this.$localStorage.set("usuarios", JSON.stringify(this.usuarios));

      var user = firebase.auth().currentUser;
      console.log(user + "ok");
      //var user = usuario;
      //var newPassword = this.usuarios[usuario].password;
      // console.log(newPassword)
      user
        .updatePassword(this.usuarios[usuario].password)
        .then(function() {
          // Update successful.
          console.log(this.usuarios[usuario].password + "actualice");
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
    },
    listarUsuarios() {
      var user = firebase.auth().currentUser;
      
      if (user != null) {
        user.providerData.forEach(function(profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
    }
  }
};
</script>
<style scoped></style>
