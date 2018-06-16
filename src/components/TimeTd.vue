<template>
    <td :class="props.class" :style="{backgroundColor:props.tagColor}"  @mousedown.left="$emit('emit-down',[props.x,props.y])" @mouseup.left="$emit('emit-up',[props.x,props.y])"
        @mouseover="$emit('emit-over',[props.x,props.y])">
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

        },
        computed:{
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