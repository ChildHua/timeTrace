<template>
    <td :class="props.class" @click.stop  @mousedown.stop.left="$emit('emit-down',[props.x,props.y])" @mouseup.stop.left="$emit('emit-up',[props.x,props.y])"
        @mouseover.stop="$emit('emit-over',[props.x,props.y])">
        <slot>

        </slot>
    </td>
</template>

<script>
    export default {
        name: "time-td",
        props: [
            'props'
        ],
        data() {
            return {
                tClass: 'white',
                isSelect: false,
            }
        },
        methods: {
            selectTd: function (e) {
            },
            startTd: e=>console.log(e),
            stopTd:e=>{
                console.log(e)
            }
        }
    }
</script>

<style scoped>
    .white {
        background-color: white;
    }

    .red {
        background-color: red;
    }
</style>