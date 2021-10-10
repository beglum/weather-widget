<template>
  <v-card class="mb-5">
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            single
            label="New city name"
            v-model="name"
            :loading="searchCityData.isFetching"
            :color="searchCityStatusColor"
            :error-messages="searchCityData.errorMessage"
            @keydown.enter="onSubmit"
          >
            <template v-slot:append-outer>
              <v-btn :disabled="!searchCityIsFounded" icon @click="addNewCity">
                <v-icon color="primary">mdi-keyboard-return</v-icon>
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
  watch: {
    name(newVal) {
      if (newVal) {
        this.searchCity(newVal);
      }
    },
  },
  methods: {
    onSubmit() {
      if (this.searchCityIsFounded) {
        this.addNewCity();
      }
    },
    addNewCity() {
      this.name = '';
      eventBus.$emit('addNewCity', this.searchCityData.city);
    },
  }
}
</script>

<style scoped>

</style>