<template>
  <v-main>
    <v-toolbar dense flat class="mb-3" v-if="isUpdating">
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleUpdate">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-toolbar>
    <City
      v-for="(city, index) of cities"
      :key="index"

      :city="city"
      :isMain="!index"
      :isUpdating="isUpdating"
    />
    <AddNewCity v-if="isUpdating || cities.length === 0" />
  </v-main>
</template>

<script>
import City from "@/components/City";
import AddNewCity from "./AddNewCity";
import { eventBus } from "@/main";
export default {
  components: {
    AddNewCity,
    City
  },
  data: () => ({
    isUpdating: false,
  }),
  props: {
    cities: Array,
  },
  created() {
    eventBus.$on('toggle-update', () => {
      this.toggleUpdate();
    })
  },
  methods: {
    toggleUpdate() {
      this.isUpdating = !this.isUpdating;
    },
  },
}
</script>

<style lang="scss"></style>