<template>
    <div class="container">
        <div class="row" @click.stop="test">
            <!--<time-list :time-lists="[1,2,3]"></time-list>-->
            <h1>{{ msg }}</h1>
            <time-table></time-table>
        </div>
    </div>
</template>

<script>
    import TimeList from './TimeList.vue';
    import TimeTable from './TimeTable.vue';
    export default {
        name: 'HelloWorld',
        components: {
            TimeTable,
            TimeList
        },
        data:()=> {
            return {
                msg: 'Welcome to time mark app',
                selectTime:[],
                tdDown:false,
            }
        },
        methods:{
            test:()=>{
                // console.log(11)
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
