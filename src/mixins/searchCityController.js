import { debounce } from 'vue-debounce'

import fetchActions from "@/mixins/fetchActions";

const SEARCH_DEFAULT = 1;
const SEARCH_SUCCESS = 2;
const SEARCH_ERROR = 3;

export default {
  mixins: [fetchActions],
  data: () => ({
    searchCityData: {
      isFetching: false,
      city: {},
      errorMessage: '',
      status: SEARCH_DEFAULT,
      cityName: '',
    }
  }),
  computed: {
    searchCityIsFounded() {
      return this.searchCityData.status === SEARCH_SUCCESS;
    },
    searchCityStatusColor() {
      switch (this.searchCityData.status) {
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
    /**
     * Инициализирует поиск города
     * @param cityName
     * @return void
     */
    searchCity(cityName) {
      this.searchCityData.status = SEARCH_DEFAULT;
      this.searchCityData.cityName = cityName;
      this.$_searchCity_startFetching();
    },
    $_searchCity_startFetching() {
      this.searchCityData.isFetching = true;
      this.searchCityData.errorMessage = '';
      this.$_searchCity_getNewCity(this);
    },
    $_searchCity_getNewCity: debounce((vm) => {
      vm.fetchWeatherApi({ q: vm.searchCityData.cityName })
        .then(res => {
          if (res.cod === 200) {
            vm.searchCityData.status = SEARCH_SUCCESS;
            vm.searchCityData.city = res;
          } else {
            vm.$_searchCity_onSearchError(res.message);
          }
        })
        .catch(e => vm.$_searchCity_onSearchError(e))
        .finally(() => vm.$_searchCity_onStopFetching())
    }, '600ms'),
    $_searchCity_onStopFetching() {
      this.searchCityData.isFetching = false;
    },
    $_searchCity_onSearchError(error) {
      this.searchCityData.status = SEARCH_ERROR;
      this.searchCityData.errorMessage = error;
      console.error('[FIND CITY ERROR]: ' + error);
    }
  }
}