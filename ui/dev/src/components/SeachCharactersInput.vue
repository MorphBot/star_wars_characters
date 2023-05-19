<template>
  <q-input debounce="300" outlined v-model="search" label="Name" @blur="toggle = false" @focus="toggle = true">
    <template v-slot:append>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
      </q-avatar>
    </template>
  </q-input>
</template>
