<template>
  <div id="app">
    <div id="nav" class="text-center bg-primary ">
      <router-link to="/" class="text-light display-4">Accueil</router-link> | 
      <router-link to="/lists" class="text-light display-4">Mes listes</router-link> | 
      <router-link to="/about" class="text-light display-4">A propos</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
</style>