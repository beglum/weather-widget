<template>
  <v-card ref="cardBlock">
    <v-card-text v-if="!isUpdating" class="text-h6">
      <v-row>
        <v-col cols="9">{{city.name}}, {{city.sys.country}}</v-col>
        <v-col cols="3" v-if="isMain">
          <v-btn icon @click="$emit('toggle-update')">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text v-else>
      <v-row>
          <v-col cols="12">
            <v-text-field
              single-line
              label="City name"
              :value="city.name"
            >
              <template v-slot:append-outer>
                <v-btn icon @click="deleteCity">
                  <v-icon>mdi-bucket</v-icon>
                </v-btn>
              </template>
              <template v-slot:prepend>
                <v-btn
                  icon
                  @mousedown="dragStart"
                  @mouseup="dragEnd"
                >
                  <v-icon>mdi-drag-horizontal-variant</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
      </v-row>
    </v-card-text>

    <div v-if="!isUpdating">
      <v-card-text>
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
          >mdi-navigation</v-icon>
          <span>{{city.wind.speed}}m/s</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <span>{{city.main.pressure}}hPa</span>
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-subtitle>Humidity: {{city.main.humidity}}%</v-list-item-subtitle>
        <v-list-item-subtitle>Visibility: {{visibility}}km</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    newCityName: '',
    isNameChanged: true,
  }),
  props: {
    city: Object,
    isMain: Boolean,
    isUpdating: Boolean,
  },
  computed: {
    cityName: {
      get() {
        return this.isNameChanged ? this.newCityName : this.city.name;
      },
      set(value) {
        if (this.newCityName === this.city.name) {
          this.isNameChanged = false;
          return
        }

        this.isNameChanged = true;
        this.newCityName = value;
      }
    },
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
    dragStart() {
      this.$emit('dragStart', this.$refs.cardBlock.$el, this.city.id);
    },
    dragEnd() {
      this.$emit('dragEnd', this.city.id);
    },
    deleteCity() {
      console.log('delete city')
    }
  }
}
</script>

<style lang="scss">
.city-controller {
}
</style>