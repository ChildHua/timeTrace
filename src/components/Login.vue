<template>
    <div class="container " style="top: 20%;width: 100%;position: absolute;">
        <h2 style="margin-bottom: 50px"><span>Time Trace</span></h2>
        <div class="row">
            <div class="input-div">
                <span class="glyphicon glyphicon-envelope input-i" aria-hidden="true"></span>
                <input class="input-style" v-model="email"/>
            </div>


            <div class="input-div">
                <span class="glyphicon glyphicon-lock input-i" aria-hidden="true"></span>
                <input class="input-style" v-model="password"/>
            </div>
            <button class="btn btn-info btn-block login-btn" @click="login"> sign in</button>
        </div>

        <!--<p>login page</p>-->
    </div>
</template>

<script>
    let server = 'http://tt.webapp/api';

    export default {
        name: "login",
        data() {
            return {
                email:null,
                password:null
            }
        },
        methods:{
            login:function () {
                this.$axios.post(this.$store.state.serverURL+'/auth/login',{email:this.email,password:this.password})
                    .then((r)=>{
                        if (r.status === 201){
                            this.$store.dispatch('logined',r.data.token);
                            this.$router.push('/')
                        }
                    })
                    .catch((r)=>{
                        console.log(r)
                    })
            }
        },
        beforeCreate:function () {
            if (localStorage.token){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .input-div {
        border-bottom: 1px red solid;
        width: 80%;
        margin: auto;
        margin-bottom: 30px;
    }

    .input-i {
        float: left
    }

    .input-style {
        width: 80%;
        border: 0;
    }
    .login-btn{
        width: 80%;
        margin: auto;
    }
</style>