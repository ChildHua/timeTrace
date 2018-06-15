<template>
    <div>
        <div class="col-xs-4 col-sm-4">
            <button class="btn btn-default btn-lg btn-block"
                    :style="{'background-color':tag.color}"
                    v-for="(tag,key) in this.$store.state.timeTags">
                {{tag.name}}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "time-tag"
    }
</script>

<style scoped>

</style>