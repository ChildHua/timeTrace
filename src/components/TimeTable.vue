<template>
    <!--<p>取消选择</p>-->
    <div class="col-md-6">
        <table class="table table-bordered" style="float: right;">
            <tbody>
            <tr v-for="timeTr in tds">
                <td is="time-td" :props="td" v-for="td in timeTr" @emit-down="start" @emit-over="over"
                    @emit-up="end">
                    {{[td.x,td.y]}}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import TimeTd from './TimeTd.vue';

    export default {
        components: {TimeTd},
        name: "TimeTable",
        props: [],
        data: function(){
            return {
                tds: this.$store.state.tds,
                startIndex: [0, 0],
                endIndex: [0, 0],
                k: false
            }
        },
        methods: {
            start: function (index) {
                this.$store.state.k = true
                this.$store.commit('setXScope',index);
                this.$store.commit('renderSelect',index);
            },
            over: function (index) {
                this.$store.commit('renderSelect',index);
            },
            end: function (index) {
                this.$store.commit('renderSelect',index);
                this.$store.state.k = false
            }
        }
    }
</script>

<style scoped>

</style>