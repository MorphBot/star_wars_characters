<template>
  <q-page
    padding
    class="sw-page q-mx-auto"
  >
    <search-characters-input
      ref="searchCharactersInput"
      @search="getSearchCharacter"
      @blur-input="toggle = false"
      @focus-input="toggle = true"
      :disable="disableInput"
    />

    <message-holder :message="message" />

    <characters-list
      v-if="toggle"
      :characters="characters"
      :search="searchText"
    />
  </q-page>
</template>

<script>
import CharactersList from '../components/StarWarsCharacters/CharactersList.vue'
import SearchCharactersInput from '../components/StarWarsCharacters/SeachCharactersInput.vue'
import MessageHolder from "../components/MessageHolder.vue";

export default {
  components: {
    MessageHolder,
    CharactersList,
    SearchCharactersInput
  },
  data() {
    return {
      searchText: '',
      message: '',
      characters: [],
      toggle: false,
      disableInput: false
    }
  },
  methods: {
    async getSearchCharacter(value) {
      this.characters = [];
      this.message = '';
      this.searchText = value;

      if ( 0 === value.length ) {
        return;
      }

      try {
        this.disableInput = true;

        const searchResponse = await fetch('https://swapi.py4e.com/api/people/?search=' + value);

        if (!searchResponse.ok) {
          throw new Error("Network response was not OK");
        }

        const searchJson = await searchResponse.json();

        if ( searchJson.count > 0 ) {
          searchJson.results.forEach((result) => {
            this.characters.push(result);
          })
        } else {
          this.message = 'Nothing found';
        }

        this.disableInput = false;
        this.$nextTick(() => {
          this.$refs.searchCharactersInput.focusInput();
        })
      } catch (error) {
        console.error(`Error: ${error}`);
        this.characters = [];
        this.message = 'Something wrong. Please try again.'
        this.disableInput = false;
      }
    }
  }
}
</script>
