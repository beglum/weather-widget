<template>
  <v-text-field
    :single="isLabelOnTop"
    :single-line="!isLabelOnTop"

    v-model="_cityName"

    :label="label"
    :loading="isFetching"
    :color="searchCityStatusColor"
    :error-messages="errorMessage"
    @keydown.enter="onSubmit"
  >
    <template v-slot:prepend>
      <slot name="prepend-icon"></slot>
    </template>
    <template v-slot:append-outer>
      <slot name="covering-button">
        <v-btn :disabled="!isFounded" icon @click="onSubmit">
          <v-icon color="primary">{{ icons.mdiKeyboardReturn }}</v-icon>
        </v-btn>
      </slot>
    </template>
  </v-text-field>
</template>

<script>
import { mdiKeyboardReturn } from '@mdi/js'
import { debounce } from 'vue-debounce'

import fetchActions from "@/mixins/fetchActions";

const SEARCH_DEFAULT = 1;
const SEARCH_SUCCESS = 2;
const SEARCH_ERROR = 3;

export default {
  name: "SearchCity",
  mixins: [fetchActions],
  data: () => ({
    isFetching: false,
    isNameChanged: false,
    newCityName: '',
    newCityObject: {},
    errorMessage: '',
    searchStatus: SEARCH_DEFAULT,
    icons: {
      mdiKeyboardReturn
    },
  }),
  props: {
    cityName: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'New city name',
    },
    isLabelOnTop: {
      type: Boolean,
      default: false,
    },
    isCleanField: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    _cityName: {
      get() {
        return this.isNameChanged ? this.newCityName : this.cityName;
      },
      set(value) {
        if (!this.isNameChanged) {
          this.$emit('changed');
          this.isNameChanged = true;
        }
        if (value) {
          this.searchCity();
        }
        this.newCityName = value;
      }
    },
    isFounded() {
      return this.searchStatus === SEARCH_SUCCESS;
    },
    searchCityStatusColor() {
      switch (this.searchStatus) {
        case SEARCH_SUCCESS:
          return 'green';
        case SEARCH_ERROR:
          return 'red';
        default:
          return 'primary';
      }
    },
  },
  methods: {
    onSubmit() {
      if (this.isFounded) {
        this.$emit('submit-new-city', this.newCityObject);
        if (this.isCleanField) {
          this._cityName = '';
        }
        this.searchStatus = SEARCH_DEFAULT;
        this.newCityObject = {};
      }
    },
    searchCity() {
      this.searchStatus = SEARCH_DEFAULT;
      this.startFetching();
    },
    startFetching() {
      this.isFetching = true;
      this.errorMessage = '';
      this.getNewCity(this);
    },
    getNewCity: debounce((vm) => {
      vm.fetchWeatherApi({ q: vm._cityName })
        .then(res => {
          if (res.cod === 200) {
            vm.searchStatus = SEARCH_SUCCESS;
            vm.newCityObject = res;
          } else {
            vm.onSearchError(res.message);
          }
        })
        .catch(e => vm.onSearchError(e))
        .finally(() => vm.onStopFetching())
    }, '600ms'),
    onStopFetching() {
      this.isFetching = false;
    },
    onSearchError(error) {
      this.searchStatus = SEARCH_ERROR;
      this.errorMessage = error;
      console.error('[FIND CITY ERROR]: ' + error);
    }
  }
}
</script>

<style scoped>

</style>