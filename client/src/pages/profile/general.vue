<template>
  <v-container fluid>
    <v-row class="my-10" justify="center" align="center">
      <v-col cols="12" md="6" justify="center" align="center">
        <v-avatar size="150">
          <img :src="user.avatar" />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-card>
          <v-card-text>
            <v-btn
              icon
              color="gray"
              class="edit-icon"
              v-if="editing == false"
              @click="editing = true"
            >
              <v-icon small>edit</v-icon>
            </v-btn>
            <v-col>
              <label><b>Nombre</b></label>
              <div v-if="!editing">{{ user.firstname }}</div>
              <v-text-field
                v-else
                dense
                v-model="user.firstname"
              ></v-text-field>
            </v-col>
            <v-col>
              <label><b>Apellidos</b></label>
              <div v-if="!editing">{{ user.lastname }}</div>
              <v-text-field v-else dense v-model="user.lastname"></v-text-field>
            </v-col>
            <v-col>
              <label><b>Email</b></label>
              <div v-if="!editing">{{ user.email }}</div>
              <v-text-field v-else dense v-model="user.email"></v-text-field>
            </v-col>
            <v-col>
              <label><b>Rol</b></label>
              <div>{{ user.role }}</div>
            </v-col>
            <v-col>
              <label><b>Fecha de registro</b></label>
              <div>
                {{
                  this.$moment(user.signupDate).format('DD/MM/YYYY hh:mm:ss')
                }}
              </div>
            </v-col>
          </v-card-text>
          <v-card-actions v-if="editing == true">
            <v-spacer></v-spacer>
            <v-btn color="white" text @click="editing = false">
              Cancelar
            </v-btn>
            <v-btn color="primary" @click="editing = false"> Guardar </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      editing: false
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  }
}
</script>

<style>
img {
  border: 2px solid rgb(221, 221, 221);
}
.edit-icon {
  position: absolute;
  right: 2px;
  top: 2px;
  cursor: pointer;
}
</style>
