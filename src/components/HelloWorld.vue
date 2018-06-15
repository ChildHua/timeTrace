<template>
    <div class="container">
        <div class="row" @click.self="init">
            <!--<time-list :time-lists="[1,2,3]"></time-list>-->
            <h1>{{ msg }}</h1>
            <time-table></time-table>
            <time-tag></time-tag>
        </div>
    </div>
</template>

<script>
    import TimeList from './TimeList.vue';
    import TimeTable from './TimeTable.vue';
    import TimeTag from './TimeTag.vue';
    export default {
        name: 'HelloWorld',
        components: {
            TimeTable,
            TimeList,
            TimeTag
        },
        data:()=> {
            return {
                msg: 'Welcome to time mark app',
                selectTime:[],
                tdDown:false,
            }
        },
        methods:{
            init:function (){
                console.log(2);
                this.$store.commit('init');
            }
        }
    }
    document.body.onselectstart = function () {
        return false;
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
