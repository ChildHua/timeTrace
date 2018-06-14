<template>
    <div class="container">
        <div class="row" >
            <ul class="list-group" v-for="item in timeLists">
                <li class="list-group-item">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TimeList',
        props:['timeLists'],
        data() {
            return {
                items: [
                    'Today I do my homework',
                    'To study English well is my wish'
                ]
            }
        }
    }
</script>

