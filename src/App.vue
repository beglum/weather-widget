<template>
  <v-app>
    <CitiesList v-if="isLoaded" :cities="cities" />
  </v-app>
</template>

<script>
import localStorage, {CITIES} from "@/mixins/localStorage";
import fetchActions from "@/mixins/fetchActions";

import CitiesList from "@/components/CitiesList";

import { eventBus } from "@/main";

export default {
  name: 'App',
  mixins: [localStorage, fetchActions],
  data: () => ({
    timeToUpdate: 60,
    isFetching: true,
    isLoaded: false,
    cities: []
  }),
  components: {
    CitiesList,
  },
  watch: {
    cities: {
      handler() {
        this.saveStorage(CITIES);
      },
      deep: true,
    }
  },
  created() {
    this.initOtherFiles();
    //window.localStorage.clear();
    this.loadLocalStorage();
    if (!this[CITIES].length) {
      this.getUserCoords();
    }
    this.updateWeatherData();

    eventBus.$on('addNewCity', data => {
      this.createNewCity(data);
    })

    eventBus.$on('changeCity', data => {
      try {
        let oldCity = this[CITIES].find(city => city.id === data.oldCityId);
        this.updateCity(oldCity, data.newCityData);
      } catch (e) {
        console.error('CHANGE CITY ERROR: ', e)
      }
    })

    eventBus.$on('deleteCity', city => {
      let index = this[CITIES].indexOf(city);
      this[CITIES].splice(index, 1);
    })
  },
  mounted() {
    this.isLoaded = true;
  },
  methods: {
    getUserCoords: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        let payload = {
          lat: res.coords.latitude,
          lon: res.coords.longitude,
        };

        this.fetchWeatherApi(payload)
          .then(data => {
            this.createNewCity(data);
          })
          .catch(e => console.log(e));
      })
    },
    updateWeatherData() {
      const currentTime = Date.now();
      this[CITIES].forEach(city => {
        if (currentTime - city.updated >= this.timeToUpdate * 1000) {
          this.fetchWeatherApi({q: city.name})
            .then(data => {
              data.updated = currentTime;
              this.updateCity(city, data);
            })
            .catch(e => console.log(e));
        }
      });
    },
    createNewCity(data) {
      data.updated = Date.now();
      data.uid = Math.random() * 1000;
      this[CITIES].push(data);
    },
    updateCity(city, data) {
      for (let key in data) {
        city[key] = data[key];
      }
    },

    /**
     * Инициализируем автоматический импорт необходимых шрифтов
     */
    initOtherFiles() {
      let googleFonts = document.createElement('link');
      googleFonts.setAttribute(
        'href',
        'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900'
      );
      document.head.appendChild(googleFonts);

      let materialIcons = document.createElement('link');
      materialIcons.setAttribute(
        'href',
        'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'
      );
      document.head.appendChild(materialIcons);
    }
  },
}
</script>

<style scoped lang="scss">
::v-deep .v-application--wrap {
  width: 250px;
  max-width: 250px;
  min-height: fit-content;
}
</style>
