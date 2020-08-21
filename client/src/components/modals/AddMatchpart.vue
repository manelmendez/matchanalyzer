<template>
  <v-dialog v-model="show" persistent max-width="50%">
    <v-card>
      <v-card-title class="headline">Añadir Parte</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="9" class="text-center">
            <v-select
              outlined
              shaped
              v-model="formation"
              :items="formacionesF7"
              item-text="name"
              item-value="name"
              label="Elegir formación"
            >
              <template v-slot:item="{ item }">
                <v-row>
                  <v-col cols="2" class="text-center" align-self="center">
                    {{ item.name }}
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col>
                    <v-img
                      :src="item.image"
                      :contain="true"
                      aspect-ratio="4"
                    ></v-img>
                  </v-col>
                </v-row>
              </template>
            </v-select>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              shaped
              label="Duración"
              class="centered-input ml-2"
              type="number"
              v-model="duration"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancelar</v-btn>
        <v-btn
          color="primary"
          :disabled="formation == '' || duration == undefined"
          @click="add"
          >Añadir</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      formacionesF7: [
        {
          name: '3-2-1',
          image: require('/assets/images/formaciones/3-2-1.png')
        },
        {
          name: '2-3-1',
          image: require('/assets/images/formaciones/2-3-1.png')
        },
        {
          name: '3-1-2',
          image: require('/assets/images/formaciones/3-1-2.png')
        },
        {
          name: '3-3',
          image: require('/assets/images/formaciones/3-3.png')
        },
        {
          name: '4-2',
          image: require('/assets/images/formaciones/4-2.png')
        }
      ],
      formation: '',
      duration: null
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    add() {
      this.$emit('confirm', { formation: this.formation, time: this.duration })
    }
  }
}
</script>

<style scoped></style>
