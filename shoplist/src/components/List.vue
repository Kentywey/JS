<template>
    <div>
        <div class="container">
            <h1 class="text-center">{{ $route.params.name }}</h1>
            <hr>
            
            <h3 class="align-left">Total : {{ total }} €</h3>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Budget Maximum</span>
                </div>
                <input type="text" class="form-control" v-model="budgetMax" aria-label="Sizing example input" @onkeyup="saveBudgetMax()"  aria-describedby="inputGroup-sizing-sm">
            </div>
            <hr>
            <div class="input-group mb-4">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Article</span>
                </div>
                <input type="text" class="form-control" v-model="libelle" @keydown.enter="addArticle" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div v-if="libelle">
                <ul>
                    <li v-for="possibility in getFilteredPossibilities" :key="possibility" @click="addArticleFromAutoComplete(possibility)">{{ possibility }}</li>
                </ul>
            </div>
            <button type="button" class="btn btn btn-primary" @click="addArticle">Ajouter</button>
            <div v-for="(item, index) in list" :key="index" >
                <div class="card w-75" v-if="item.idList == $route.params.id">
                    <div class="card-body">
                        <div class="form-group form-check form-inline-position">
                            <input type="checkbox" v-model="item.checked" class="form-check-input">
                            <label class="form-check-label"> </label>
                        </div>
                        <h6 class="card-inline">{{ item.label }}</h6>&nbsp;
                        <input type="text" v-model="item.price" v-if="item.checked" class="form-control card-inline col-md-3">
                        <button class="btn btn-danger" @click="deleteProduct(index)">Supprimer</button>
                    </div>
                </div>
            </div>
                <div v-if="checkMax" class="alert alert-danger" role="alert">
                    Budget Dépassé !
                </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'List',
    components:{
    },
    data: function(){
        return{
            title: '',
            budgetMax: 0,
            checked: false,
            libelle: '',
            list:[],
            searchWord: '',
            listOfWords: [
            "pomme de terre",
            "carottes",
            "pommes",
            "banane",
            "riz",
            "flocon d'avoine"
            ]
        }
    },
    mounted() {
        if (localStorage.getItem('shoppingList')) {
            try {
                this.list = JSON.parse(localStorage.getItem('shoppingList'));
            } catch(e) {
                localStorage.removeItem('shoppingList');
            }
        }
        if (localStorage.getItem('budgetList')) {
            try {
                this.list = JSON.parse(localStorage.getItem('budgetList'));
            } catch(e) {
                localStorage.removeItem('budgetList');
            }
        }
    },
    methods:{
        deleteProduct: function(index){
            this.list.splice(index);
            const parsed = JSON.stringify(this.list);
            localStorage.setItem('shoppingList', parsed);
        },
        addArticle: function(){
            if(!this.libelle){
                return;
            }
            this.list.push({label: this.libelle,idList: this.$route.params.id, price: 0, checked: false});
            this.label = '';
            const parsed = JSON.stringify(this.list);
            localStorage.setItem('shoppingList', parsed);
        },
        addArticleFromAutoComplete: function(item){
            this.list.push({label: item,idList: this.$route.params.id, price: 0, checked: false});
            this.label = '';
            const parsed = JSON.stringify(this.list);
            localStorage.setItem('shoppingList', parsed);
        },
        checkTotal: function(){
            if(this.total > this.budgetMax){
                return this.budgetCheck = true;
            }else{
                return this.budgetCheck = false;
            }
        },
        saveToLocal: function(){
            const parsed = JSON.stringify(this.list);
            localStorage.setItem('shoppingList', parsed);
        },
        saveBudgetMax: function(){
            let budgetList = {idList: this.$route.params.id, budgetMax: this.budgetMax};
            
            const parsed = JSON.stringify(budgetList);
            localStorage.setItem('budgetList', parsed);
        }
    },
    computed:{
        total: function(){
            let total = 0;
            for(let i = 0; i < this.list.length; i++){
                if(this.list[i].idList == this.$route.params.id){
                    if (this.list[i].price !== undefined){
                        total = parseInt(total) + parseInt(this.list[i].price);
                    }     
                } 
            }
            return total;
        },
        checkMax: function(){
            let budgetCheck = false;
            if(this.total > this.budgetMax){
                budgetCheck = true;
            }else{
                budgetCheck = false;
            }
            return budgetCheck;
        },
        getFilteredPossibilities: function(){
            return this.listOfWords.filter(possibility => possibility.includes(this.libelle));
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card{
        margin: 1%;
    }

    .card-inline{
        display: inline;
    }

    .display-inline{
        display: inline;
    }

    #title{
        display: inline;
    }

    .form-inline-position{
        display: inline;
    }

    li{
        list-style-type: none;
        background-color: #576574;
        color: #c8d6e5;
    }
</style>
