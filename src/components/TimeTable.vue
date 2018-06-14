<template>
    <!--<p>取消选择</p>-->
    <div class="col-md-12">
        <p>{{this.$store.state.k}}</p>
        <button @click="test">test</button>
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
            },
            test:function () {
                console.log(this.$store.state)
            }
        }
    }

    let renderSelect = (index, vm) => {
        if (!vm.k) {
            return false;
        }
        vm.endIndex = index;
        let xScope = vm.startIndex[0] > vm.endIndex[0]
            ? [vm.endIndex[0], vm.startIndex[0]]
            : [vm.startIndex[0], vm.endIndex[0]];
        let yScope = vm.startIndex[1] > vm.endIndex[1]
            ? [vm.endIndex[1], vm.startIndex[1]]
            : [vm.startIndex[1], vm.endIndex[1]];
        console.log([xScope, yScope]);

        //init
        vm.tds.map((tr)=>{
           tr.map((td)=>{
               td[2]='white';
           })
        });

        for (let i = xScope[0]; i <= xScope[1]; i++) {
            for (let j = yScope[0]; j <= yScope[1]; j++) {
                if ((index[0] >= xScope[0] && index[0] <= xScope[1]) && (index[1] >= yScope[0] && index[1] <= yScope[1])) {
                    vm.tds[i][j][2] = 'red'
                    console.log(vm.tds[i][j][2]);
                } else {
                    vm.tds[i][j][2] = 'white'
                }
            }
        }
    }
</script>

<style scoped>

</style>