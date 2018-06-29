<template>
    <base-page>
        <template slot="title">
            <h3>Time Trace
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 viewBox="0 0 58 58" class="chart-icon" xml:space="preserve" @click="goChart">
<g>
	<path style="fill:#F0785A;" d="M31,26.962h26.924C56.94,12.541,45.421,1.022,31,0.038V26.962z"/>
	<path style="fill:#F0C419;" d="M50.386,48.615c4.343-4.71,7.151-10.858,7.614-17.653H32.733L50.386,48.615z"/>
	<path style="fill:#556080;" d="M27,28.134V0.038C11.918,1.067,0,13.619,0,28.962C0,36.25,2.695,42.905,7.134,48L27,28.134z"/>
	<path style="fill:#71C285;" d="M28.414,32.376L9.962,50.828c5.095,4.439,11.75,7.134,19.038,7.134
		c6.99,0,13.396-2.479,18.401-6.599L28.414,32.376z"/>
</g>
</svg>
            </h3>
            <p v-if="selected() > 0"><span>已选择{{selected()}}小时</span></p>

        </template>

        <time-table></time-table>
        <time-tag></time-tag>
    </base-page>


</template>

<script>
    import TimeList from './TimeList.vue';
    import TimeTable from './TimeTable.vue';
    import TimeTag from './TimeTag.vue';
    import Calendar from '../calendar/calendar.vue';
    import BasePage from "./BasePage.vue";

    export default {
        name: 'TimeIndex',
        components: {
            BasePage,
            TimeTable,
            TimeList,
            TimeTag,
            Calendar,
        },
        data: function () {
            return {
                msg: 'TimeTrace',
                selectTime: [],
                tdDown: false,
            }
        },
        methods: {

            selected: function () {
                let houre = 0;
                this.$store.state.tds.map((tr) => {
                    tr.map((td) => {
                        if (td.selected) {
                            houre += 0.5
                        }
                    })
                });
                return houre
            },
            goChart() {
                this.$router.push('/chart')
            }
        },
        beforeCreate: function () {

            if (localStorage.token === undefined || localStorage.token === null) {
                this.$router.push('/login');
            } else {
                this.$store.dispatch('loadTd');
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

    .title {
        position: fixed;
        left: 0;
        right: 0;
    }

    .row {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    /*transition*/
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s ease-in-out;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
        transform: translateY(-10px);

    }

    .chart-icon {
        width: 5%;
        position: absolute;
        right: 8%;
        max-width: 32px;
    }
</style>
