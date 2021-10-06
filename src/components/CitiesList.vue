<template>
  <v-main>
    <v-toolbar dense flat v-if="isUpdating">
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
      @toggle-update="toggleUpdate"
    />
  </v-main>
</template>

<script>
import City from "@/components/City";
export default {
  components: {
    City
  },
  data: () => ({
    isUpdating: false,
  }),
  props: {
    cities: Array,
  },
  methods: {
    toggleUpdate() {
      console.log('test');
      this.isUpdating = !this.isUpdating;
    }
  },
}
</script>