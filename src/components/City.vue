<template>
  <div :class="'test'">
    <div>{{city.name}}, {{city.sys.country}}</div>
    <img :src="cloudIcon" />
    <div>{{fixTemp}}</div>
    <div>{{weatherDescription}}</div>
    <Arrow
      style="width: 24px;"
      :style="'transform: rotate('+ city.wind.deg +'deg)'"
    />
    <div>{{city.wind.speed}}m/s</div>
    <div>{{city.main.pressure}}hPa</div>
    <div>Humidity: {{city.main.humidity}}%</div>
    <div>Visibility: {{visibility}}km</div>
<!--    <v-img
      height="50"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <v-progress-linear
      color="deep-purple"
      height="10"
      indeterminate
    ></v-progress-linear>-->
<!--    <pre>{{ rawData }}</pre>-->
  </div>
</template>

<script>
import Arrow from '@/components/svg/arrow';
export default {
  components: {Arrow},
  props: {
    city: Object,
  },
  computed: {
    cloudIcon() {
      return 'https://openweathermap.org/img/wn/' + this.city.weather[0].icon + '.png';
    },
    fixTemp() {
      return this.city.main.temp.toFixed(1);
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
    rawData() {
      return JSON.stringify(this.city, null, 2);
    }
  },
}
</script>