//форма для запитів
<template>
    <form @submit.prevent>
        Кількість переглядів <input type="number" v-model.number="query.count"> 
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити" @click="reset()">
    </form>
</template>
<script>
export default {
    data(){
        return{
            query:this.value
        }
    },
    methods:{
        reset(){
            this.query.count = null;
            this.$emit("input",this.query);
        },
        search(){            
            this.$emit("input",this.query);
        }
    }
}
</script>