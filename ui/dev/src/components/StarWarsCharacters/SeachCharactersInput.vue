<template>
  <div>
    <q-input
      ref="searchInput"
      debounce="500"
      outlined
      label="Name"
      v-model="search"
      :disable="disable"
      :has-errors="true"
      @blur="$emit('blur-input')"
      @focus="$emit('focus-input')"
    >
      <template v-slot:append>
        <q-avatar>
          <q-icon name="search" size="20px" color="primary" />
        </q-avatar>
      </template>
    </q-input>
    <message-holder
      v-if="search.length === 0"
      message="Enter Search phrase"
    />
  </div>
</template>

<script>
import MessageHolder from "../MessageHolder.vue";
export default {
  components: {
    MessageHolder
  },
  data() {
    return {
      search: '',
    }
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    search(value) {
      this.$emit('search', value)
    }
  },
  methods: {
    focusInput() {
      this.$refs.searchInput.focus();
    }
  }
}
</script>
