<template>
  <q-list class="q-mt-md">
    <q-item
      @mousedown.prevent
      dark
      v-for="(character, index) in characters"
      :key="index"
      class="bg-navy rounded-borders q-mb-xs"
    >
      <q-item-section>
        <span v-html="highLightSearch(character.name)"></span>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: [
    'characters',
    'search'
  ],
  methods: {
    highLightSearch(name) {
      const search = this.search.trim();
      const highLight = new RegExp(search,'gi');

      return name.replace(highLight, `<strong>$&</strong>`);
    }
  }
}
</script>
