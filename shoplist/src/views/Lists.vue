<template>
  <div class="container-fluid">
    <ListsComponent></ListsComponent>        
    </div>
</template>

<script>

import ListsComponent from '@/components/ListofLists.vue';

export default {
  name: 'listOfLists',
  components:{
    ListsComponent
  },
  data: function(){
    return{

    }
  },
  computed:{
    
  }
}
</script>

<style>
</style>