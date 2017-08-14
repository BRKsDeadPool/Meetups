<script>
  export default {
    methods: {
        onClose() {
            this.$emit('dismissed')
        }
    }
  }
</script>

<template>
  <v-alert error dismissible @input="onClose" :value="true">
    <slot></slot>
  </v-alert>
</template>
