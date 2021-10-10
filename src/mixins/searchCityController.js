import { debounce } from 'vue-debounce'

import fetchActions from "@/mixins/fetchActions";

const SEARCH_DEFAULT = 1;
const SEARCH_SUCCESS = 2;
const SEARCH_ERROR = 3;

export default {
  mixins: [fetchActions],
  data: () => ({
    searchCity: {
      isFetching: false,
      city: {},
      errorMessage: '',
      status: SEARCH_DEFAULT,
    }
  }),
  computed: {
    searchCityIsFounded() {
      return this.searchCity.status === SEARCH_SUCCESS;
    },
    searchCityStatusColor() {
      switch (this.searchCity.status) {
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
     * Инициализирует поиск города. При возврате объекта означает возможность создания нового города
     * @param event
     * @param cityName
     * @return false/object
     */
    searchCityOnInput(event, cityName) {
      // Если не нажат Enter, то мы ищем информацию по городу
      if (event.keyCode !== 13 && cityName) {
        this.searchCity.status = SEARCH_DEFAULT;
        this.$_searchCity_startFetching();
        return false;
      }

      // При Enter мы сохраняем выбранный город
      if (!this.searchCity.isFetching && this.searchCityIsFounded) {
        this.searchCity.status = SEARCH_DEFAULT;
        return this.searchCity.city;
      }
    },
    $_searchCity_startFetching() {
      this.searchCity.isFetching = true;
      this.searchCity.errorMessage = '';
      this.$_searchCity_getNewCity(this);
    },
    $_searchCity_getNewCity: debounce((vm) => {
      vm.fetchWeatherApi({q: vm.name})
        .then(res => {
          if (res.cod === 200) {
            vm.searchCity.status = SEARCH_SUCCESS;
            vm.searchCity.city = res;
          } else {
            vm.$_searchCity_onSearchError(res.message);
          }
        })
        .catch(e => vm.$_searchCity_onSearchError(e))
        .finally(() => vm.$_searchCity_onStopFetching())
    }, '600ms'),
    $_searchCity_onStopFetching() {
      this.searchCity.isFetching = false;
    },
    $_searchCity_onSearchError(error) {
      this.searchCity.status = SEARCH_ERROR;
      this.searchCity.errorMessage = error;
      console.error('[FIND CITY ERROR]: ' + error);
    }
  }
}