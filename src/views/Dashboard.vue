<template>
    <div>
        <el-row :gutter="22">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:270px;">
                    <div class="user-info">
                        <img src="../assets/img/img.jpg" class="user-avator" alt/>
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        本机编号:
                        <span v-html="param.computerId"></span>
<!--                        <div v-html="userComputerId"></div>-->
                        <el-button type="primary" icon="el-icon-edit" circle style="float: right;font-size: 12px"
                                   @click="editVisible=true"></el-button>

                    </div>

<!--                        <el-input></el-input>-->

                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>漏洞统计</span>
                        </div>
                    </template>
                    低风险
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    中风险
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    高风险
                    <el-progress :percentage="13.7"></el-progress>
                    超高风险
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" style="height:526px;">
                    <template #header>
                        <div class="clearfix">
                            <span>待办事项</span>
                            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                        </div>
                    </template>

                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template #default="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <div class="todo-item" :class="{
                                        'todo-item-del': scope.row.status,
                                    }">{{ scope.row.title }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户机Id">
                    <el-input v-model="param.id"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="commitComputerId">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 软件安全检测
                </el-breadcrumb-item>
                <el-breadcrumb-item>文件上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="content-title">支持拖拽</div>
            <div class="plugins-tips">

                <a href="http://element.eleme.io/#/zh-CN/component/upload" target="_blank">漏洞数据文件上传</a>
            </div>
            <el-upload class="upload-demo" drag action="http://localhost:8080/upload/analysisExcel" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">只能上传xlsx文件，暂不支持其他形式</div>
                </template>
            </el-upload>

            <div class="content-title"></div>
<!--            <div class="plugins-tips">-->
<!--                请将文件拖拽进方框中或点击上传，之后点击安全检测，最终结果会在系统信息中进行通知，请耐心等待-->
<!--                <a href="https://github.com/Agontuk/vue-cropperjs" target="_blank"></a>-->
<!--                <div class="handle-row">-->
<!--                    <el-button type="primary">开始检测</el-button>-->
<!--                </div>-->
<!--                收到计算完成通知后，再点击结果展示.浏览结果后，选择是否提交本次检测结果信息-->
<!--                <div class="handle-row">-->
<!--                    <el-button type="primary">结果展示</el-button>-->
<!--                    <el-button type="primary">数据上传</el-button>-->
<!--                </div>-->
<!--                <el-table :data="tableData2" border class="table" ref="multipleTable"-->
<!--                          header-cell-class-name="table-header" style="width: 60.2%" >-->
<!--                    <el-table-column prop="id" label="文件名称" align="center" width="100"></el-table-column>-->
<!--                    <el-table-column prop="owner" label="代码类型" align="center" width="100">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="group" label="是否为疑似漏洞代码文件" align="center" width="200"></el-table-column>-->
<!--                    <el-table-column label="相似漏洞ID"  align="center" width="200">-->
<!--                        <template #default="scope">-->
<!--                            <el-button type="text" icon="el-icon-lx-copy"-->
<!--                                       @click="handleEdit(scope.$index, scope.row)">查看漏洞详情-->
<!--                            </el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column label="选择"  align="center" width="100">-->
<!--                        <template #default="scope">-->
<!--                            <el-button type="success" icon="el-icon-check" circle></el-button>-->
<!--                            <el-button type="danger" icon="el-icon-delete" circle></el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                </el-table>-->

<!--            </div>-->

        </div>
    </div>
</template>

<script>
    import Schart from "vue-schart";
    import {reactive, ref} from "vue";
    import {getLocalIP} from "../api";
    // import getUserIP from "../utils/getIp";
    import createStore from "../store/index";
    // import Amn from "../components/amnWin1.vue";
    export default {
        name: "dashboard",
        components: {},

        setup() {
            const param = reactive({
                id:"",
                computerId : createStore.state.computerId
            })
            const editVisible = ref(false);
            const name = localStorage.getItem("ms_username");
            const role = name === "admin" ? "超级管理员" : "普通用户";
            // const myComputerId = ref({
            //     id: createStore.state.computerId
            // })
            console.log(createStore.state.computerId)
            const data = reactive([]);

            const commitComputerId = () => {
                createStore.commit("setComputerId",param.id)
                param.computerId = param.id
                console.log(createStore.state.computerId)
                // userComputerId.id = param.id
                editVisible.value = false
            }
            // const options = {
            //     type: "bar",
            //     title: {
            //         text: "最近一周各品类销售图",
            //     },
            //     xRorate: 25,
            //     labels: ["周一", "周二", "周三", "周四", "周五"],
            //     datasets: [
            //         {
            //             label: "家电",
            //             data: [234, 278, 270, 190, 230],
            //         },
            //         {
            //             label: "百货",
            //             data: [164, 178, 190, 135, 160],
            //         },
            //         {
            //             label: "食品",
            //             data: [144, 198, 150, 235, 120],
            //         },
            //     ],
            // };
            // const options2 = {
            //     type: "line",
            //     title: {
            //         text: "最近几个月各品类销售趋势图",
            //     },
            //     labels: ["6月", "7月", "8月", "9月", "10月"],
            //     datasets: [
            //         {
            //             label: "家电",
            //             data: [234, 278, 270, 190, 230],
            //         },
            //         {
            //             label: "百货",
            //             data: [164, 178, 150, 135, 160],
            //         },
            //         {
            //             label: "食品",
            //             data: [74, 118, 200, 235, 90],
            //         },
            //     ],
            // };
            // const todoList = reactive([
            //     {
            //         title: "今天要修复100个bug",
            //         status: false,
            //     },
            //     {
            //         title: "今天要修复100个bug",
            //         status: false,
            //     },
            //     {
            //         title: "今天要写100行代码加几个bug吧",
            //         status: false,
            //     },
            //     {
            //         title: "今天要修复100个bug",
            //         status: false,
            //     },
            //     {
            //         title: "今天要修复100个bug",
            //         status: true,
            //     },
            //     {
            //         title: "今天要写100行代码加几个bug吧",
            //         status: true,
            //     },
            // ]);


            // var Ip = ""
            // if(!localStorage.getItem('ipInfo')){
            //     function test(ip:any){
            //         Ip = ip
            //         localStorage.setItem('ipInfo',ip)
            //     }
            //     getUserIP(test)
            // }


            return {
                commitComputerId,
                // userComputerId,
                editVisible,
                // myComputerId,
                name,
                data,
                // options,
                // options2,
                // todoList,
                role,
                param
            };


        },

    };


</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 16px;
        color: #999;
        line-height: 30px;
    }

    .user-info-list2 {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

    .mask {
        background-color: #000;
        opacity: 0.3;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1
    }

    .pop {
        background-color: #fff;

        position: fixed;
        top: 100px;
        left: 300px;
        width: calc(100% - 600px);
        height: calc(100% - 200px);
        z-index: 2
    }

    .btn {
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid blue;
        padding: 4px 12px;
    }
    .handle-row {
        margin-top: 30px;
        margin-bottom: 20px;
    }
</style>
