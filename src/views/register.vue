<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">用户注册</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input type="password" placeholder="password" v-model="param.password2"
                              @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="">
                    <el-select placeholder="请选择部门" style="width:290px" content="width=80px">
                        <el-option
                                v-for="(item,index) in dropParams"
                                :key="index"
                                :label="item"
                                :value="item"
                        />
                    </el-select>

                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm    ()">提交注册</el-button>
                </div>
                <p class="login-tips">Tips : 请填写用户名和密码</p>

            </el-form>
        </div>
    </div>
</template>

<script>
    import {ref, reactive} from "vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {ElMessage} from "element-plus";
    import {verify} from "../api";
    import {register} from "../api";

    export default {
        setup: function () {
            const dropParams = ['部门1', '部门2', '部门3', '部门4','请选择部门']
            const router = useRouter();
            const param = reactive({
                username: "",
                password: "",
                password2: ""
            });
            const requestParam = reactive({
                name: "",
                password: "",
                level: "1"
            })
            const rules = {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                ],
                password2: [
                    {
                        required: true,
                        message: "请再次输入密码",
                        trigger: "blur"
                    }
                ]
            };
            const login = ref(null);
            const re = reactive({
                value: ""
            })
            const registerUser = async () => {
                await register(requestParam).then((res) => {
                    re.value = res
                })
            }

            const submitForm = async function () {
                console.log("param.password" + param.password)
                console.log("param.password2" + param.password2)
                if (param.name == ""){
                    ElMessage.error("请输入用户名")
                    return false
                }
                if (param.password !== param.password2) {
                    console.log("hahahahahahahahha")
                    ElMessage.error("两次密码输入不一样，请重新输入")
                    param.password2 = ""
                    param.username = ""
                    param.password = ""
                    return false
                }
                requestParam.name = param.username
                requestParam.password = param.password
                console.log(JSON.stringify(requestParam))
                await registerUser()

                // console.log("login.vue  74"+isExist.value)
                // console.log(param.username,param.password)
                // console.log("login.vue 60" + login + "login.vue 60")
                console.log("re:  " + re.value)

                login.value.validate((valid) => {
                    console.log("valid:" + valid)
                    if (valid && re.value == "注册成功") {
                        ElMessage.success("注册成功");
                        localStorage.setItem("ms_username", param.username);
                        router.push("/login");
                    } else {
                        ElMessage.error("登录失败，账号或密码错误");
                        return false;
                    }
                });
            };

            const store = useStore();
            store.commit("clearTags");

            return {
                dropParams,
                param,
                rules,
                login,
                submitForm,
                registerUser
            };
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #1252ec;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #9c2525;
    }
</style>