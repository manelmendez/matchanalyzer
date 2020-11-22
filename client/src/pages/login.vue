<template>
  <v-main class="welcome-content">
    <v-container text-center>
      <!-- LOGIN -->
      <v-row class="login" wrap justify="center">
        <v-col lg="6" md="6" sm="10" cols="12">
          <v-card class="elevation-0 transparent" style="opacity: 1">
            <v-toolbar dark color="transparent" class="elevation-0">
              <v-toolbar-title>Iniciar sesión</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-form v-model="valid" ref="form" lazy-validation @submit.prevent>
              <v-card-text>
                <v-text-field
                  autocomplete="new-password"
                  prepend-icon="person"
                  ref="email"
                  label="Email"
                  placeholder="Email"
                  type="text"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  ref="password"
                  label="Contraseña"
                  hint="At least 8 characters"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  counter
                  :rules="passwordRules"
                  required
                  autocomplete="new-password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link
                  class="info--text"
                  style="padding-right: 10px"
                  to="register"
                  >Si aún no tienes cuenta</router-link
                >
                <v-btn
                  depressed
                  color="var(--v-accent-darken1)"
                  rounded
                  type="submit"
                  @click="submit"
                  :disabled="!valid"
                  >Iniciar sesión</v-btn
                >
              </v-card-actions>
            </v-form>
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
      //LOGIN
      e1: true,
      valid: true,
      email: '',
      password: '',
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
        this.signIn(credentials).then(() => {
          let snackbar = {
            show: true,
            color: 'success',
            text: 'Logueado correctamente'
          }
          this.$store.commit('root/SNACKBAR', snackbar)
          this.$router.push({
            name: 'index' //si uso path: "/mainpage" el params (props) no funciona -- params: { user: response.data.user } --
          })
        })
      }
    },
    ...mapActions('user', ['signIn'])
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
  background-image: url('../assets/images/background3.jpeg');
  background-size: cover;
}
</style>
