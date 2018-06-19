<template>
    <div>
        <div class="col-xs-4 col-sm-4 tag">
            <button class="btn btn-default btn-lg btn-block"
                    :style="{'background-color':tag.color}"
                    @click="markTag(tag)"
                    v-for="(tag,key) in tags">
                {{tag.name}}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "time-tag",
        data:function () {
          return {
              tags:this.$store.state.timeTags
          }
        },
        methods:{
            markTag:function (tag) {
                this.$store.commit('markTag',tag)
            }
        }
    }
</script>

<style scoped>
    .tag {
        position: fixed;
        right: 5px;
        top: 80px;
    }
</style>