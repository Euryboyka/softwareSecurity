<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-emoji"></i> 详情
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        <h1>{{$route.query.cnnvdid}}</h1>
            <div class="tableTitle"><span class="midText">漏洞介绍</span></div><br>
        <p class="icon-li-content">{{$route.query.bugIntroduction}}</p><br>
        <p>{{$route.query.bugNotice}}</p><br>
        <p>{{$route.query.websiteReference}}</p><br>
        <p>{{$route.query.affectEntity}}</p><br>
        <p>{{$route.query.patch}}</p><br>
        <h1>{{cnnvdid1}}</h1><br>
        <h1>{{description}}</h1><br>
        </div>
    </div>
    <!--    <li v-for="d in data">-->
    <!--        <P></P>-->
    <!--        <h4>{{d.name}}</h4>-->
    <!--    </li>-->
</template>
<style>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
<script>

    import {computed, ref, reactive,defineComponent} from "vue";
    import {getCNNVDInfo} from "../api";
    import {useRouter,useRoute} from "vue-router";
    import router from "../router";
    import {getCurrentInstance} from "vue";
    export default defineComponent({

        name: "donate",
        props:{},
        components:{},
        setup(){

            const route = useRoute()
            const cnnvdid1 = route.params.cnnvdid
            const description = route.params.bugIntroduction
            console.log(cnnvdid1)
            return{
                cnnvdid1,
                description

            }
        }
    })


</script>

<style scoped>
    .tableTitle {
        position: relative;
        margin: 0 auto;
        width: 600px;
        height: 1px;
        background-color: #d4d4d4;
        text-align: center;
        font-size: 16px;
        color: rgba(101, 101, 101, 1);
    }
    .midText {
        position: absolute;
        left: 50%;
        background-color: #ffffff;
        padding: 0 15px;
        transform: translateX(-50%) translateY(-50%);
    }

    .example-p {
        height: 45px;
        display: flex;
        align-items: center;
    }

    .search-box {
        text-align: center;
        margin-top: 10px;
    }

    .search {
        width: 300px;
    }

    ul,
    li {
        list-style: none;
    }

    .icon-li {
        display: inline-block;
        padding: 10px;
        width: 120px;
        height: 120px;
    }

    .icon-li-content {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .icon-li-content i {
        font-size: 36px;
        color: #606266;
    }

    .icon-li-content span {
        margin-top: 10px;
        color: #787878;
    }
</style>