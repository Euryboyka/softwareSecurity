<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" class="container">
                <div class="grid-content bg-purple">
                    <div class="user-info-list" align="center">用户健康数据管理</div>
                </div>
                <!--                <div class="grid-content bg-purple">-->

                <!--                </div>-->
                <div>
                    <!--                <i class="el-icon-user-solid"></i>-->
                    <!--                <div style="float: left">-->
                    <!--                    计算机ID搜索：-->
                    <!--                    <el-input-->
                    <!--                            placeholder="请输入部门名称"-->
                    <!--                            prefix-icon="el-icon-search"-->
                    <!--                            class="handle-input mr10">-->
                    <!--                    </el-input>-->
                    <!--                </div>-->
                    <div style="float: right">
                        部门搜索：
                        <el-input
                                placeholder="请输入部门名称"
                                prefix-icon="el-icon-search"
                                class="handle-input mr10">
                        </el-input>
                        <el-button icon="el-icon-search" circle class="margin1"></el-button>
                        <br>
                        员工搜索：
                        <el-input
                                placeholder="请输入员工ID"
                                prefix-icon="el-icon-search"
                                class="handle-input mr10">
                        </el-input>
                        <el-button icon="el-icon-search" circle class="margin2"></el-button>
                        <br>
                        电脑搜索：
                        <el-input
                                placeholder="请输入计算机ID"
                                prefix-icon="el-icon-search"
                                class="handle-input mr10">
                        </el-input>
                        <el-button icon="el-icon-search" circle class="margin2"></el-button>
                    </div>
                </div>
                <el-table :data="tableData" border class="table" ref="multipleTable"
                          header-cell-class-name="table-header">
                    <el-table-column prop="id" label="计算机ID" align="center"></el-table-column>
                    <el-table-column prop="owner" label="所属员工" align="center">
                    </el-table-column>
                    <el-table-column prop="group" label="所属部门" align="center"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
                            <el-button type="text" icon="el-icon-lx-copy"
                                       @click="handleEdit(scope.$index, scope.row)">查看详情和编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12" class="container">
                <div class="grid-content bg-purple">
                    <div class="user-info-list" align="center">待处理用户提交漏洞</div>
                </div>
                <el-table :data="tableData2" border class="table" ref="multipleTable"
                          header-cell-class-name="table-header">
                    <el-table-column prop="id" label="提交时间" align="center" width="100"></el-table-column>
                    <el-table-column prop="owner" label="提交员工ID" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="group" label="所属部门" align="center" width="100"></el-table-column>
                    <el-table-column label="查看详情"  align="center">
                        <template #default="scope">
                            <el-button type="text" icon="el-icon-lx-copy"
                                       @click="handleEdit(scope.$index, scope.row)">查看漏洞详情
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否确认为漏洞"  align="center">
                        <template #default="scope">
                            <el-button type="success" icon="el-icon-check" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {computed, ref} from 'vue'

    export default {
        name: "admin",
        setup() {
            const tableData = [{
                id: '00:FF:D1:A9:71:09',
                owner: 'admin',
                group: '部门A'
            }]
            const tableData2 = [{
                id: '2021-12-11',
                owner: 'admin',
                group: '部门A'
            }]
            return {
                tableData,
                tableData2
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #99a9bf;
    }

    .ziticolor {
        background-color: #e5e9f2;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
        margin-right: 5px;
        margin-left: 5px;
        /*margin-bottom: 5px ;*/
        /*margin-top: 5px;*/
        /*margin-left: 5px;*/
        /*margin-right: 5px;*/
    }

    .margin1 {
        margin-right: 5px;
        margin-left: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
        color: #2d8cf0;
    }

    .margin2 {
        margin-right: 5px;
        margin-left: 5px;

        margin-bottom: 5px;
        color: #2d8cf0;
    }

    .container {
        padding: 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .user-info-list {
        font-size: 16px;
        color: #eef1f6;
        line-height: 30px;
    }
</style>