<template>
  <v-card class="mb-5">
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <search-city
            :is-clean-field="true"
            :is-label-on-top="true"
            @submit-new-city="addNewCity"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { eventBus } from "@/main";
import { mdiKeyboardReturn } from '@mdi/js'
import SearchCity from "./wrapping/SearchCity";

export default {
  name: "AddNewCity",
  components: {
    SearchCity,
  },
  data: () => ({
    name: '',
    icons: {
      mdiKeyboardReturn,
    }
  }),
  methods: {
    addNewCity(city) {
      this.name = '';
      eventBus.$emit('addNewCity', city);
    },
  }
};
</script>

<style scoped>

</style>