<template>
  <div>
    <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
    <v-col cols="12" md="12">
      <v-btn color="primary" @click="$emit('step-receiver', step)">Continue</v-btn>
    </v-col>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class BadgetsStep extends Vue {
  @Prop({ type: Object, required: true })
  step;
}
</script>

<style lang="scss" scoped>
</style>
