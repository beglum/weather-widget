<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col class="text-h6" cols="9">{{city.name}}, {{city.sys.country}}</v-col>
        <v-col cols="3" v-if="isMain">
          <v-btn icon @click="toggleUpdate">
            <v-icon>{{ icons.mdiCog }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="4">
          <v-img
            :src="cloudIcon"
            :alt="weatherDescription"
            width="50"
          ></v-img>
        </v-col>
        <v-col
          class="text-h4"
          cols="8"
        >
          {{fixTemp}}
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-subtitle>{{weatherDescription}}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-subtitle>
        <v-icon
          left
          :style="'transform: rotate('+ city.wind.deg +'deg)'"
        >{{ icons.mdiNavigation }}</v-icon>
        <span>{{city.wind.speed}}m/s</span>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <v-icon left>{{ icons.mdiSpeedometer }}</v-icon>
        <span>{{city.main.pressure}}hPa</span>
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-subtitle>Humidity: {{city.main.humidity}}%</v-list-item-subtitle>
      <v-list-item-subtitle>Visibility: {{visibility}}km</v-list-item-subtitle>
    </v-list-item>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import { mdiSpeedometer, mdiNavigation, mdiCog } from '@mdi/js'

export default {
  name: "Data",
  data: () => ({
    icons: {
      mdiSpeedometer,
      mdiNavigation,
      mdiCog
    }
  }),
  props: {
    city: Object,
    isMain: Boolean,
  },
  computed: {
    cloudIcon() {
      return 'https://openweathermap.org/img/wn/' + this.city.weather[0].icon + '.png';
    },
    fixTemp() {
      return this.city.main.temp.toFixed(1) + '°C';
    },
    weatherDescription() {
      let feelsLike = 'Feels like ' + this.city.main.feels_like.toFixed(1) + '°C';
      let description = this.city.weather.reduce((acc, part) => {
        let fixDescription = part.description.charAt(0).toUpperCase() + part.description.slice(1);
        acc.push(fixDescription);

        return acc;
      }, []).join('. ');

      return `${feelsLike}. ${description}`;
    },
    visibility() {
      return (this.city.visibility / 1000).toFixed(1);
    },
  },
  methods: {
    toggleUpdate() {
      eventBus.$emit('toggle-update');
    }
  }
}
</script>

<style scoped>

</style>