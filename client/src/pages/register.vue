<template>
  <v-main class="welcome-content">
    <v-container text-center>
      <!-- REGISTER -->
      <v-row class="register" wrap justify="center">
        <v-col lg="6" md="6" sm="10" cols="12">
          <v-card class="elevation-0">
            <v-toolbar dark color="primary" class="elevation-0">
              <v-toolbar-title>Registrarse</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  prepend-icon="person"
                  name="firstname"
                  label="Nombre"
                  type="text"
                  v-model="firstname"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="person"
                  name="lastname"
                  label="Apellidos"
                  type="text"
                  v-model="lastname"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  type="text"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Contraseña"
                  autocomplete="new-password"
                  hint="At least 8 characters"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  counter
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <router-link
                class="info--text"
                style="padding-right: 10px"
                to="login"
                >Volver a Inicio de Sesión</router-link
              >
              <v-btn
                depressed
                rounded
                color="info"
                @click="submit"
                :disabled="!valid"
                >Registrarse</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      e1: true,
      valid: true,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      nameRules: [
        (v) => !!v || 'This field is required',
        () => !'' || 'This field is required'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => !(v.length < 8) || 'At least 8 characters',
        (v) => !(v.length > 25) || 'Maximum 25 characters'
      ]
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let credentials = {
          username: this.email,
          password: this.password
        }
        let body = {
          firstname: this.firstname,
          lastname: this.lastname
        }
        this.signUp({ body, credentials }).then((response) => {
          setTimeout(() => {
            let snackbar = {
              show: true,
              color: 'success',
              text: response.data.message
            }
            this.$store.commit('root/SNACKBAR', snackbar)
            this.$router.push({
              name: 'index' //si uso path: "/mainpage" el params (props) no funciona -- params: { user: response.data.user } --
            })
          }, 2000)
        })
      }
    },
    ...mapActions('user', ['signUp'])
  },
  events: {}
}
</script>

<style scoped>
.welcome-content {
  width: 100%;
  min-height: 100%;
  height: 100%;
  position: fixed;
  align-items: center;
  align-content: center;
  justify-content: center;
}
</style>
