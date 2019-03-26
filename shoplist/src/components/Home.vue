<template lang="html">

  <section class="home">
        <img src="@/assets/shopping-cart.png" id="img_header">
        <h1 class="text-center">Toutes vos listes</h1>
        <hr>
        <h6>Dernière liste ajoutée</h6>
        <h3 @click="goToList()">{{ lastListName }}</h3>
  </section>

</template>

<script lang="js">

  import router from '../router.js';

  export default  {
    name: 'home',
    props: [],
    mounted() {
      if (localStorage.getItem('shoppingList') && localStorage.getItem('shoppingLists')) {
        try {
          this.list = JSON.parse(localStorage.getItem('shoppingList'));
          this.lists = JSON.parse(localStorage.getItem('shoppingLists'));

          let lastId = this.list[this.list.length - 1].idList;
          
          for(let i = 0; i < this.lists.length; i++){
            if(this.lists[i].id == lastId){
              this.lastListName = this.lists[i].name;
              this.lastListId = this.lists[i].id;
            }
          }

        } catch(e) {
          localStorage.removeItem('shoppingList');
          localStorage.removeItem('shoppingLists');
        }
      }
    },
    data() {
      return {
        list: [],
        lists: [],
        lastListName: '',
        lastListId: 0
      }
    },
    methods: {
      goToList: function(){
        router.push("/list/" + this.lastListId + "/" + this.lastListName);
      }
    }
}
</script>

<style scoped>
    #img_header{
        width: 10%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>
