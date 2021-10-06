<template>
  <div>
    <City v-for="(city, index) of cities" :key="index" :city="city" />
  </div>
</template>

<script>
import City from "@/components/City";
export default {
  components: {
    City
  },
  props: {
    cities: Array,
  }
}
</script>