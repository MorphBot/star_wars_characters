<template>
  <p
    v-if="message"
    class="text-center q-mt-md"
  >
    <span>{{ message }}</span>
  </p>
</template>

<script>
export default {
  props: [
    'message'
  ]
}
</script>
