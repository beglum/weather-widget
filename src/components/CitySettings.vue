<template>
  <v-card-text>
    <v-row>
      <v-col cols="12">
        <v-text-field
          single-line
          label="City name"
          :value="city.name"
        >
          <template v-slot:append-outer>
            <v-btn icon @click="deleteCity">
              <v-icon>mdi-bucket</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>

export default {
  name: "CitySettings",
  data: () => ({
    newCityName: '',
    isNameChanged: true,
  }),
  props: {
    city: Object,
  },
  computed: {
    cityName: {
      get() {
        return this.isNameChanged ? this.newCityName : this.city.name;
      },
      set(value) {
        if (this.newCityName === this.city.name) {
          this.isNameChanged = false;
          return
        }

        this.isNameChanged = true;
        this.newCityName = value;
      }
    },
  },
  methods: {
    deleteCity() {
      console.log('delete city')
    }
  },
}
</script>

<style scoped>

</style>