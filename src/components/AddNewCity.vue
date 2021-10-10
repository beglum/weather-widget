<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            single
            label="New city name"
            v-model="name"
            :loading="isFetching"
            :color="newCityStatusColor"
            :error-messages="errorMessage"
            @keydown="onInput"
          >
            <template v-slot:append-outer>
              <v-btn :disabled="!isCityFounded" icon @click="addNewCity">
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
import { debounce } from 'vue-debounce'

import fetchActions from "@/mixins/fetchActions";
import { eventBus } from "@/main";

export default {
  name: "AddNewCity",
  mixins: [fetchActions],
  data: () => ({
    name: '',
    isFetching: false,
    status: 1,
    newCityData: {},
    enums: {
      SEARCH_DEFAULT: 1,
      SEARCH_SUCCESS: 2,
      SEARCH_ERROR: 3,
    },
    errorMessage: '',
  }),
  computed: {
    newCityStatusColor() {
      switch (this.status) {
        case this.enums.SEARCH_SUCCESS:
          return 'green';
        case this.enums.SEARCH_ERROR:
          return 'red';
        default:
          return 'primary';
      }
    },
    isCityFounded() {
      return this.status === this.enums.SEARCH_SUCCESS;
    },
  },
  methods: {
    getNewCity: debounce((vm) => {
      vm.fetchWeatherApi({q: vm.name})
        .then(res => {
          if (res.cod === 200) {
            vm.status = vm.enums.SEARCH_SUCCESS;
            vm.newCityData = res;
          } else {
            vm.searchError(res);
          }
        })
        .catch(e => vm.searchError(e))
        .finally(() => vm.stopFetching())
    }, '600ms'),
    onInput(event) {
      // Если не нажат Enter, то мы ищем информацию по городу
      if (event.keyCode !== 13 && this.name) {
        this.startFetching();
        return
      }

      // При Enter мы сохраняем выбранный город
      if (!this.isFetching && this.isCityFounded) {
        this.addNewCity();
      }

      this.status = this.enums.SEARCH_DEFAULT;
    },
    addNewCity() {
      this.name = '';
      eventBus.$emit('addNewCity', this.newCityData);
    },
    startFetching() {
      this.isFetching = true;
      this.errorMessage = '';
      this.getNewCity(this);
    },
    stopFetching() {
      this.isFetching = false;
    },
    searchError(error) {
      this.status = this.enums.SEARCH_ERROR;
      this.errorMessage = error.message;
      console.error('[FIND CITY ERROR]: ' + error.message);
    }
  }
}
</script>

<style scoped>

</style>