<template>
  <v-main>
    <v-toolbar
      dense
      flat
      class="mb-3"
      v-if="isUpdating"
    >
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleUpdate">
        <v-icon>mdi-cog-off</v-icon>
      </v-btn>
    </v-toolbar>
    <draggable
      handle=".handle"

      :list="cities"
      v-bind="dragOptions"
    >
      <transition-group>
        <City
          v-for="(city, index) of cities"
          :key="city.uid"

          :city="city"
          :isMain="!index"
          :isUpdating="isUpdating"
        />
      </transition-group>
    </draggable>
    <AddNewCity
      v-if="isUpdating || cities.length === 0"
    />
  </v-main>
</template>

<script>
import City from "@/components/City";
import AddNewCity from "@/components/AddNewCity";
import draggable from 'vuedraggable';
import { eventBus } from "@/main";
export default {
  components: {
    AddNewCity,
    City,
    draggable,
  },
  data: () => ({
    isUpdating: false,
    dragOptions: {
      animation: 200,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost',
    }
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

<style lang="scss" scoped>
.ghost {
  opacity: .5;
}
</style>