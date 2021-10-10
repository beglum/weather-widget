<template>
  <v-card-text>
    <v-row>
      <v-col cols="12">
        <v-text-field
          single-line

          label="New city name"
          v-model="cityName"

          :loading="searchCityData.isFetching"
          :color="searchCityStatusColor"
          :error-messages="searchCityData.errorMessage"
          @keydown.enter="onSubmit"
        >
          <template v-slot:prepend>
            <v-icon class="handle">{{ icons.mdiDragHorizontalVariant }}</v-icon>
          </template>
          <template v-slot:append-outer>
            <v-btn v-if="isNameChanged" :disabled="!searchCityIsFounded" icon @click="changeCity">
              <v-icon color="primary">{{ icons.mdiKeyboardReturn }}</v-icon>
            </v-btn>

            <v-btn v-else icon @click="deleteCity">
              <v-icon>{{ icons.mdiBucket }}</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import searchCityController from "@/mixins/searchCityController";
import { eventBus } from "@/main";
import { mdiBucket, mdiKeyboardReturn, mdiDragHorizontalVariant } from '@mdi/js'

export default {
  name: "Settings",
  mixins: [searchCityController],
  data: () => ({
    newCityName: '',
    isNameChanged: false,
    icons: {
      mdiBucket,
      mdiKeyboardReturn,
      mdiDragHorizontalVariant,
    }
  }),
  props: {
    city: Object,
  },
  watch: {
    newCityName(newVal) {
      this.searchCity(newVal);
    },
  },
  computed: {
    cityName: {
      get() {
        return this.isNameChanged ? this.newCityName : this.city.name;
      },
      set(value) {
        this.isNameChanged = true;
        this.newCityName = value;
      }
    },
  },
  methods: {
    deleteCity() {
      eventBus.$emit('deleteCity', this.city);
    },
    onSubmit() {
      if (this.searchCityIsFounded) {
        this.changeCity();
      }
    },
    changeCity() {
      this.isNameChanged = false;
      eventBus.$emit('changeCity', {
        oldCityId: this.city.id,
        newCityData: this.searchCityData.city
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