<template>
    <td :class="selectedClass" :style="{backgroundColor:tagColor}"  @mousedown.left="$emit('emit-down',[props.x,props.y])" @mouseup.left="$emit('emit-up',[props.x,props.y])"
        @mouseover="$emit('emit-over',[props.x,props.y])">
        {{tagName}}
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
            tagColor:function () {
                let tmp=null;
                this.$store.state.timeTags.map((tag)=>{
                    if (this.props.tagId === tag.id){
                        tmp = tag.color
                    }
                });
                return tmp;
            },
            tagName:function () {
                let tmp=null;
                this.$store.state.timeTags.map((tag)=>{
                    if (this.props.tagId === tag.id){
                        tmp = tag.name
                    }
                });
                return tmp;
            },
            selectedClass:function () {
                return this.props.selected?'red':'white';
            }
        }
    }
</script>

<style scoped>
    .white {
        background-color: white;
    }

    .red {
        /*position: fixed;*/

        background: rgba(0,0,0,0.3);
        filter: blur(10px);
    }

</style>