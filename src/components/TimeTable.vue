<template>
    <div class="col-xs-8 col-sm-8">
        <table class="table table-bordered" style="float: right;">
            <tbody>
            <tr v-for="(timeTr,index) in tds">
                <td class="noborder">{{showTime(index)}}</td>
                <td is="time-td" :props="td" v-for="td in timeTr" @emit-down="start" @emit-over="over"
                    @emit-up="end">
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
                // this.$store.commit('renderSelect',index);
                this.$store.state.k = false
            },
            showTime:function (index) {
                index = index.toString();
                if (index.length >1){
                    return index + ':00';
                }else {
                    return '0'+ index + ':00';
                }

            }
        },
        computed:{
            selectedTime:function () {
                let time = 0;
                this.$store.state.tds.map((tr)=>{
                    tr.map((td)=>{
                        if (td.selected){
                            time += 0.5
                        }
                    })
                });
                return time;
            }
        }
    }
</script>

<style scoped>
    .noborder{
        border: 1px solid #fff;
        border-right: 1px solid #ddd;
        text-align: right;
        width:30px;
    }
</style>