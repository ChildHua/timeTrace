<template>
    <div class="container center" style="">
        <img src="../assets/logo.png">
        <div class="row">
            <div class="col-xs-12 col-sm-12">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="exampleInputEmail1" class="col-xs-2 col-sm-2 control-label">Email</label>
                        <div class="col-xs-10 col-sm-10">
                            <input type="email" class="form-control" placeholder="Email"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1" class="col-xs-2 col-sm-2 control-label">Password</label>
                        <div class="col-xs-10 col-sm-10">
                            <input type="password" class="form-control" id="exampleInputPassword1"
                                   placeholder="Password">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!--<p>login page</p>-->
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>

    .center{
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>