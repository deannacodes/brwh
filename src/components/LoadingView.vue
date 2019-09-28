<template>
  <div class="compare-page">
    <div class="compare-content">{{ loadingMessage }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CompatibilityView",
  data() {
    return {
      loadingMessage: "Processing Repository Data"
    };
  },
  computed: mapState({
    menu: "menu"
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
