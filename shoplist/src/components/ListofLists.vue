<template lang="html">

  <section class="listOfLists">
    <img src="@/assets/liste.jpg" id="img-head">
    <h1 class="text-left">Mes listes de courses</h1>
    <hr>
    <div id="add-list">
      <input class="form-control col-md-4" type="text" v-model="name" placeholder="Nouvelle liste" @keyup.enter="createList()">
      <button class="btn btn-primary" @click="createList()">Ajouter</button>
    </div>
    <hr>
    <input class="form-control" type="text" v-model="searchWord" placeholder="Recherche..." id="search">
    <div v-if="searchWord">
      <ul>
        <li v-for="possibility in getFilteredPossibilities" :key="possibility.id" @click="goToList(possibility.id,possibility.name)">{{ possibility.name }}</li>
      </ul>
    </div>
    <hr>
    <div id="list-of-lists">
      <div class="card" v-for="(item, index) in lists" :key="index">
        <div class="card-body">
          <img src="@/assets/garbage.png" height="25px" class="garbage-icon" @click="removeList(index)">
          <h5 @click="goToList(item.id, item.name)">{{item.name}}</h5>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  import router from '../router.js';

  export default  {
    name: 'listOfLists',
    props: [],
    mounted() {
      if (localStorage.getItem('shoppingLists')) {
        try {
          this.lists = JSON.parse(localStorage.getItem('shoppingLists'));
        } catch(e) {
          localStorage.removeItem('shoppingLists');
        }
      }
    },
    data() {
      return {
        searchWord: '',
        lists:[],
        name:'',
        id: 0
      }
    },
    methods: {
      createList: function(){
        if(this.name){
          if(this.lists.length > 0){
            this.id = this.lists[this.lists.length - 1].id + 1;
            this.lists.push({id: this.id, name: this.name});
          }else{
            this.id = 1;
            this.lists.push({id: this.id, name: this.name});
          }
        }
        const parsed = JSON.stringify(this.lists);
        localStorage.setItem('shoppingLists', parsed);
      },
      removeList: function(index){
        this.lists.splice(index);
         const parsed = JSON.stringify(this.lists);
        localStorage.setItem('shoppingLists', parsed);
      },
      goToList: function(id,name){
        router.push("/list/" + id + "/" + name);
      }
    },
    computed: {
      getFilteredPossibilities: function(){
        return this.lists.filter(possibility => possibility.name.includes(this.searchWord));
      }
    }
}
</script>

<style scoped>
  .form-control{
    display: inline;
    margin-right: 1%;
  }

  #add-list{
    width: 70%;
    display: block;
    margin-left: auto;
  }

  h5{
    display: inline;
  }

  .btn-delete{
    margin-left : 1%;
    display: inline;
  }

  #img-head{
    margin-left: auto;
    margin-right: auto;
    width: 5%;
    display: block;
  }

  li{
        list-style-type: none;
        background-color: #576574;
        color: #c8d6e5;
        font-weight: bold;
  }

  .garbage-icon{
    margin-right: 2%;
  }
</style>
