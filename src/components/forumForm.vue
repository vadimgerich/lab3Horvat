<template>
    <form v-if="visible" @submit.prevent> <!-- якщо форма видима то показати її і відмінити надсилання запиту за замовчуванням-->
        <label> Назва <input type="text" v-model="neww.title" required> </label> <br>
        <label> Опис <input type="text" v-model="neww.shortDescribe"> <inputt></label> <br>
        <label> Текст <input type="text" v-model="neww.text"> </label> <br>
        <label> Дата публікації <input type="date" v-model="neww.date"> </label> <br>
        <label> Кількість <input type="number" v-model.number="neww.count" min="0" step="0.01"> </label> <br>  
        <input type="button" @click="save()" value="Зберегти">     
    </form>
</template>

<script>
import setInput from "./setInput";
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: "newwForm",   
    data(){
        return{            
        }
    },
    components:{
        setInput
    },
    computed:{
        ...mapState({
            neww:"formNeww",
            visible:"formVisible",
            newMode:"formNewMode"
        })
    },
    methods:{
        ...mapActions(["patchNeww","postNeww"]),
        ...mapMutations(["hideForm"]),
        async save(){
            if (this.newMode)
                await this.postForum(this.neww);
            else
                await this.patchForum(this.neww);    
            this.hideForm();         
        }
    }
}
</script>
<style scoped>
    form{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white ;
    }
</style>