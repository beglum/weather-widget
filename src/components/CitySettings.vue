<template>
  <v-card-text>
    <v-row>
      <v-col cols="12">
        <search-city
          :city-name="this.city.name"

          @submit-new-city="changeCity"
          @changed="isNameChanged = true"
        >
          <template v-slot:prepend-icon>
            <v-icon class="handle">{{ icons.mdiDragHorizontalVariant }}</v-icon>
          </template>
          <template v-slot:covering-button v-if="!isNameChanged">
            <v-btn icon @click="deleteCity">
              <v-icon>{{ icons.mdiBucket }}</v-icon>
            </v-btn>
          </template>
        </search-city>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import { eventBus } from "@/main";
import { mdiBucket, mdiDragHorizontalVariant } from '@mdi/js'
import SearchCity from "./wrapping/SearchCity";

export default {
  name: "Settings",
  components: {
    SearchCity,
  },
  data: () => ({
    newCityName: '',
    isNameChanged: false,
    icons: {
      mdiBucket,
      mdiDragHorizontalVariant,
    }
  }),
  props: {
    city: Object,
  },
  methods: {
    deleteCity() {
      eventBus.$emit('deleteCity', this.city);
    },
    changeCity(city) {
      this.isNameChanged = false;
      eventBus.$emit('changeCity', {
        oldCityId: this.city.id,
        newCityData: city
      });
    },
  },
}
</script>

<style lang="scss" scoped>
  .handle {
    cursor: grab;

    &:active  {
      cursor: grabbing;
    }
  }
</style>