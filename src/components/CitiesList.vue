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

      :class="{
        'dragging': city.id === draggableElementId,
      }"

      :city="city"
      :isMain="!index"
      :isUpdating="isUpdating"

      @toggle-update="toggleUpdate"
      @dragStart="dragStart"
      @dragEnd="dragEnd"
    />
    <AddNewCity v-if="isUpdating" />
  </v-main>
</template>

<script>
import City from "@/components/City";
import AddNewCity from "./AddNewCity";
export default {
  components: {
    AddNewCity,
    City
  },
  data: () => ({
    isUpdating: false,
    componentInstance: this,
    draggableElementId: -1,
  }),
  props: {
    cities: Array,
  },
  methods: {
    toggleUpdate() {
      console.log('test');
      this.isUpdating = !this.isUpdating;
    },
    dragStart(el, id) {
      console.log(el)
      this.draggableElementId = id;
    },
    dragEnd() {
      console.log('end')
    },
    someDummyMethod() {
      console.log('Hello from someDummyMethod');
    }
  },
}
</script>

<style lang="scss">
.dragging {
  opacity: 0.3;
}
</style>