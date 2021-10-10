<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            single
            label="New city name"
            v-model="name"
            :loading="searchCity.isFetching"
            :color="searchCityStatusColor"
            :error-messages="searchCity.errorMessage"
            @keydown="onInput"
          >
            <template v-slot:append-outer>
              <v-btn :disabled="!searchCity.isFounded" icon @click="addNewCity">
                <v-icon color="primary">mdi-send</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import searchCityController from "@/mixins/searchCityController";
import { eventBus } from "@/main";

export default {
  name: "AddNewCity",
  mixins: [searchCityController],
  data: () => ({
    name: '',
  }),
  methods: {
    onInput(e) {
      let result = this.searchCityOnInput(e, this.name);

      if (result) {
        this.addNewCity(result);
      }
    },
    addNewCity(cityData) {
      this.name = '';
      eventBus.$emit('addNewCity', cityData);
    },
  }
}
</script>

<style scoped>

</style>