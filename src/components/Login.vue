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
                <input type="password" class="input-style" v-model="password"/>
            </div>
            <button class="btn btn-info btn-block login-btn" @click="login($event)"> sign in</button>
            <button class="btn btn-info btn-block login-btn" @click="register"> sign up</button>
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
            login:function (event) {
                // console.log(event);
                event.target.disabled= true;
                setTimeout(function (event) {
                    event.target.disabled = false
                },3000,event);
                this.$axios.post(this.$store.state.serverURL+'/auth/login',{email:this.email,password:this.password})
                    .then((r)=>{
                        if (r.status === 201){
                            localStorage.token = null;
                            localStorage.user = null;
                            this.$store.dispatch('logined',r.data.token);
                            this.$router.push('/')
                        }
                    })
                    .catch(r=>{
                        alert(r.response.data.error);
                        console.log(r.response.data.error);
                        // console.log(3);
                    })
            },
            register:function () {
                this.$axios.post(this.$store.state.serverURL+'/auth/register',{email:this.email,password:this.password})
                    .then((r)=>{
                        if (r.status === 200){
                            console.log('success');
                        }
                    })
                    .catch(r=>{
                        console.log(r)
                    })
            }
        },
        beforeCreate:function () {
            if (localStorage.token!=null){
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
        margin-top: 10px;
    }
</style>