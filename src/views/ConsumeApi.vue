<template>
  <div id="consumeapi">
    <OtroComponente />
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card
          class="container text-center espacio"
          color="orange darken-2"
          dark
        >
          <h1 class="text-center">¿El número es par o impar?</h1>
        </v-card>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }" class="alinear">
            <v-btn color="primary" dark v-on="on">Conoce la respuesta</v-btn>
          </template>
          <v-card class="text-center">
            <div>
              <v-spacer></v-spacer>
              <h2 class="espacio">Respuesta</h2>
              <v-spacer></v-spacer>
            </div>
            <v-btn
              color="primary"
              @click="(show = !show), say(), hello()"
              v-if="!show"
              >Calcular</v-btn
            >
            <div class="slide-fade-leave-active text-center" v-if="!show">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <transition class="slide-fade-leave-active">
              <p v-if="data % 2 == 0">{{ data }}</p>
              <p v-else>
                {{ data }} <br />
                {{ dataPost }}
              </p>
            </transition>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="say(), hello()">Otra vez</v-btn>
              <v-btn
                color="primary"
                @click="(dialog = false), limpiar(), (show = !show)"
                >Cerrar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import OtroComponente from "./Home";

export default {
  name: "consumeapi",
  data() {
    return {
      data: "",
      dataPost: "",
      dialog: false,
      show: false
    };
  },
  //mounted() {
  methods: {
    say() {
      axios({ method: "GET", url: "http://localhost:3000/index" }).then(
        result => {
          this.data = result.data.data;
        },
        error => {
          console.error(error);
        }
      );
    },
    hello() {
      axios({ method: "POST", url: "http://localhost:3000/theend" }).then(
        result => {
          this.dataPost = result.data.data;
        },
        error => {
          console.error(error);
        }
      );
    },
    limpiar() {
      this.show = true;
      this.data = "";
      this.dataPost = "";
    }
  },
  components: {
    OtroComponente
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
  padding: 2rem;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  padding: 2rem;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
  padding: 2rem;
}
.espacio {
  padding: 2rem;
}
</style>
