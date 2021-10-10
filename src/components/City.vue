<template>
  <v-card class="mb-5">
    <CitySettings
      v-if="isUpdating"
      :city="city"
    />
    <CityData
      v-else
      :city="city"
      :isMain="isMain"
    />
  </v-card>
</template>

<script>
import CityData from "./CityData";
import CitySettings from "./CitySettings";
export default {
  components: {
    CitySettings,
    CityData
  },
  props: {
    city: Object,
    isMain: Boolean,
    isUpdating: Boolean,
  },
}
</script>

<style lang="scss">
</style>