<template>
  <q-page padding style="max-width: 500px;margin: 0 auto;">
      <q-input debounce="300" outlined v-model="search" label="Name" @blur="toggle = false" @focus="toggle = true">
        <template v-slot:append>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>
        </template>
      </q-input>

      <div class="text-center q-mt-md">
        <p v-if="message || search.length > 0">{{ message }}</p>
        <p v-else>Enter search phrase</p>
      </div>

      <transition name="fade">
        <q-list v-if="toggle">
          <q-item @mousedown.prevent dark v-for="(character, index) in characters" :key="index" style="background-color: #2C3843;border-radius: 3px;margin: 2.5px 0;">
            <q-item-section>
              <span v-html="highLightSearch(character.name)"></span>
            </q-item-section>
          </q-item>
        </q-list>
      </transition>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      characters: [],
      message: '',
      toggle: false,
    }
  },
  watch: {
    search(value) {
      this.message = '';
      this.characters = [];

      if ( value.length === 0 ) {
        return;
      }

      axios.get('https://swapi.py4e.com/api/people/?search=' + value)
        .then((response) => {
          if ( response.data.count > 0 ) {
            response.data.results.forEach((result) => {
              this.characters.push(result);
            })
          } else {
            this.message = 'Nothing found'
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  methods: {
    getCharacter(value) {
      axios.get('https://swapi.py4e.com/api/people/?search=' + value)
        .then((response) => {
          if ( response.data.count > 0 ) {
            response.data.results.forEach((result) => {
              this.characters.push(result);
            })
          } else {
            this.message = 'Nothing found'
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },

    highLightSearch(name) {
      return name.replace(this.search, '<strong>' + this.search + '</strong>')
    }
  }
}
</script>
