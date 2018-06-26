<template>
        <div class="container">
            <div class="row" @click.self="init">
                <div class="title">
                    <h3>Time Trace</h3>
                    <p @click="openByDrop($event)">{{calendar3.display}}</p>
                    <p v-if="selected() > 0"><span>已选择{{selected()}}小时</span></p>
                </div>
                <time-table></time-table>
                <time-tag></time-tag>
            </div>

            <transition name="fade">
                <div class="calendar-dropdown" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}"
                     v-show="calendar3.show">
                    <calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value"
                              :begin="calendar3.begin" :end="calendar3.end" @select="choseDate"></calendar>
                </div>
            </transition>
        </div>
</template>

<script>
    import TimeList from './TimeList.vue';
    import TimeTable from './TimeTable.vue';
    import TimeTag from './TimeTag.vue';
    import Calendar from '../calendar/calendar.vue';

    export default {
        name: 'TimeIndex',
        components: {
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
                calendar3: {
                    display: this.$store.state.dayIndex,
                    show: false,
                    zero: true,
                    value: this.$store.state.dayIndexArr, //默认日期
                    lunar: true, //显示农历
                },
            }
        },
        methods: {
            init: function () {
                this.$store.commit('cleanSelect');
            },
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
            choseDate: function (value) {
                this.calendar3.show = false;
                this.calendar3.value = value;
                this.calendar3.display = value.join("-");
                this.$store.state.dayIndex = this.calendar3.display;
                // this.$store.commit('getTdData', {user: 999, date: this.calendar3.display})
                this.$store.dispatch('loadTd');
            },
            openByDrop(e) {
                this.calendar3.show = true;
                this.calendar3.top = e.target.offsetTop;
                e.stopPropagation();
                window.setTimeout(() => {
                    document.addEventListener("click", (e) => {
                        this.calendar3.show = false;
                        document.removeEventListener("click", () => {
                        }, false);
                    }, false);
                }, 1000)
            },
        },
        beforeMount:function () {
            this.$store.dispatch('loadTd');
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

    /*下拉框*/
    .calendar-dropdown {
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 2px;
    }

    /*弹出框*/
    .calendar-dialog {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

    .calendar-dialog-mask {
        background: rgba(255, 255, 255, .5);
        width: 100%;
        height: 100%;
    }

    .calendar-dialog-body {
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 2px;
    }
</style>
