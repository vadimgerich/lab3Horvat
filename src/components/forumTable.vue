<template>
    <div>
        <p v-if="newwList.length==0" class="alert">
            Новини відсутні
        </p>
        
        <table v-if="newwList.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('title')">  Назва </th>
                <th v-on:click="sort('describe')"> Опис  </th>
                <th v-on:click="sort('text')">  Текст </th>
                <th v-on:click="sort('date')"> Дата </th>
                <th v-on:click="sort('count')"> Кількість </th>
                <th></th>
            </tr>
            <newwTableRow v-for="(neww,index) in newwList" 
                v-bind:key="neww._id" 
                v-bind="{neww,index}"
                @remove="remove"
                @update="update" 
            >             
            </newwTableRow>
        </table>
    </div> 
</template>

<script>
import тnewwTableRow from "./newwTableRow";
import { mapGetters, mapMutations} from 'vuex';


export default {
    name:"newwTable",      
    data(){
        return{         
          
        }
    },
    components:{
        newwTableRow
    },
    computed:{
       ...mapGetters({
           neww:"filtredNewws"
       }) 
    },    
    methods:{
        ...mapMutations({
            sort:"sortNewws"
        })
    }    
}
</script>

<style scoped>
    .alert{
        background: yellow;
        color: crimson;
    }

    table, table td{
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
    }
</style>