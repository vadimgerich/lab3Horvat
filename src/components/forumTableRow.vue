// рядок що відбражає 1 книгу
<template>
    <tr>        
        <td> {{index}} </td>
        <td> {{neww.title}} </td>
        <td> {{neww.describe}} </td>
        <td> {{new Date(neww.published).toLocaleDateString()}} </td>
        <td> {{neww.text}} </td>
        <td> {{neww.count}} </td>
        <td>
            <input type="button" value="Вилучити" @click="remove(index)">
            <input type="button" value="Редагувати" @click="update(index)">
        </td>        
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"newwTableRow",
    props:{
        index:Number,
        neww:Object        
    },
    data(){   
        return{

        }
    },
    methods:{ 
        ...mapActions(["deleteNeww", "showUpdateForm"]),
        updated(){
        console.log(this.neww);
        }            
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>