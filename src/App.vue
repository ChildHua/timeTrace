<template>
    <div id="app" @click.self="init">
        <!--<img src="./assets/logo.png">-->
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data:function() {
            return {
            }
        },
        methods:{
            init:function () {
                this.$store.commit('init')
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 5px;
    }
</style>
