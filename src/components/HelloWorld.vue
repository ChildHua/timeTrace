<template>
    <div class="container">
        <div class="row" @click.self="init">
            <div class="title">
                <h3>{{ title() }}</h3>
                <p><span>已选择{{selected()}}小时</span></p>
            </div>
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
        data: () => {
            return {
                msg: 'TimeTrace',
                selectTime: [],
                tdDown: false,
            }
        },
        methods: {
            init: function () {
                this.$store.commit('init');
            },
            title: function () {
                let date = new Date();
                return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
            },
            selected:function () {
                let houre = 0;
                this.$store.state.tds.map((tr)=>{
                    tr.map((td)=>{
                        if (td.selected){
                            houre += 0.5
                        }
                    })
                });
                return houre
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

    .title{
        position: fixed;
        left: 0;
        right: 0;
    }
    .row{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

</style>
