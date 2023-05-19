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

    <p
      v-if="loading"
      class="text-center q-mt-md"
    >
      <q-spinner
        color="primary"
        size="30px"
        :thickness="3"
      />
    </p>

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
      disableInput: false,
      loading: false
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
        this.loading = true;

        const searchResponse = await fetch('https://swapi.py4e.com/api/people/?search=' + value);

        if ( ! searchResponse.ok ) {
          this.errorHandler('Search response was not OK!', 'Something went wrong. Please contact administrators.');
          return;
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
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.searchCharactersInput.focusInput();
        })
      } catch (error) {
        this.errorHandler(error, 'Something went wrong. Please try again.')
      }
    },
    errorHandler(error, message) {
      console.error(`Error: ${error}`);
      this.characters = [];
      this.message = message;
      this.disableInput = false;
    }
  }
}
</script>
