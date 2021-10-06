<template>
  <v-app>
    <div class="weather-widget">
      <CitiesList v-if="isLoaded" :cities="cities" />
    </div>
  </v-app>
</template>

<script>
import localStorage, {CITIES} from "@/mixins/localStorage";
import fetchActions from "@/mixins/fetchActions";

import CitiesList from "@/components/CitiesList";

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
    console.log('1');
    this.initOtherFiles();
    //window.localStorage.clear();
    this.loadLocalStorage();
    if (!this.cities.length) {
      this.getUserCoords();
    }
    this.updateWeatherData();
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
      this[CITIES].push({
        ...data,
        updated: Date.now(),
      });
    },
    updateCity(city, data) {
      for (let key in data) {
        city[key] = data[key];
      }
    },

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
    },

    /**
     * Возвращает данные простого объекта в виде query string.
     * Не поддерживает вложенные объекты.
     * @param queryObject {object}
     * @returns {string}
     */
    toQueryString(queryObject) {
      return '?' + Object.keys(queryObject).reduce((acc, key) => {
        acc.push(`${key}=${queryObject[key]}`);
        return acc;
      }, []).join('&');
    }
  },
}
</script>

<style>
.weather-widget {
  background: antiquewhite;
}
</style>
