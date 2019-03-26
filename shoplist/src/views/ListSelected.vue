<template>
  <div class="container-fluid">
    <ListComponent></ListComponent>        
    </div>
</template>

<script>

import ListComponent from '@/components/List.vue';

export default {
  name: 'home',
  components:{
    ListComponent
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