<template>
  <p
    v-if="message"
    class="message-holder-text text-center q-mt-md"
  >
    <span>{{ message }}</span>
  </p>
</template>

<style lang="sass" scoped>
.message-holder-text
  font-size: 14px
</style>

<script>
export default {
  props: [
    'message'
  ]
}
</script>
