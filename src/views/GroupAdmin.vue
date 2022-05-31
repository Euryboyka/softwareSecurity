<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!--                <el-breadcrumb-item>-->
                <!--                    <i class="el-icon-lx-calendar"></i>-->
                <!--                </el-breadcrumb-item>-->
                <el-breadcrumb-item>部门管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <i class="el-icon-user-solid"></i>-->
                <el-button type="primary">创建部门</el-button>
                <div style="float: right">
                    部门搜索：
                    <el-input
                            placeholder="请输入部门名称"
                            prefix-icon="el-icon-search"
                            class="handle-input mr10">
                    </el-input>
                </div>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      header-cell-class-name="table-header">
                <el-table-column prop="name" label="部门名称" align="center"></el-table-column>
                <el-table-column prop="level" label="安全等级" align="center">
                </el-table-column>
                <el-table-column prop="address" label="部门管理员" align="center">
                    <el-dropdown>
                          <span class="el-dropdown-link">
    点击查看部门管理员名单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <!--                            <el-dropdown-item>黄金糕</el-dropdown-item>-->
                            <!--                            <el-dropdown-item>狮子头</el-dropdown-item>-->
                            <!--                            <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                            <!--                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
                            <!--                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-table-column>
                <el-table-column prop="location" label="部门员工" align="center">
                    <el-dropdown>
                          <span class="el-dropdown-link">
    点击查看部门员工名单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <!--                            <el-dropdown-item>黄金糕</el-dropdown-item>-->
                            <!--                            <el-dropdown-item>狮子头</el-dropdown-item>-->
                            <!--                            <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                            <!--                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
                            <!--                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-table-column>
                <el-table-column prop="state" label="安全状态" align="center"></el-table-column>
                <el-table-column label="详情" width="180" align="center">
                    <template #default="scope">
                        <!--                        <el-button type="text" icon="el-icon-lx-copy" @click="handleEdit(scope.$index, scope.row)">查看-->
                        <!--                        </el-button>-->
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--            <el-table :data="responseDateList" border class="table" ref="multipleTable"-->
            <!--                      header-cell-class-name="table-header">-->
            <!--                <el-table-column prop="name" label="部门名称" align="center" width="120"></el-table-column>-->
            <!--                <el-table-column prop="version" label="部门安全等级" align="center" width="100">-->
            <!--                </el-table-column>-->
            <!--                <el-table-column prop="develeper" label="部门管理员" align="center">-->
            <!--                </el-table-column>-->
            <!--                <el-table-column prop="location" label="部门员工" align="center"></el-table-column>-->
            <!--                <el-table-column label="操作" width="180" align="center">-->
            <!--                    <template #default="scope">-->
            <!--                        <el-button type="text" icon="el-icon-lx-copy" @click="handleEdit(scope.$index, scope.row)">查看-->
            <!--                        </el-button>-->
            <!--                    </template>-->
            <!--                </el-table-column>-->
            <!--            </el-table>-->
        </div>
    </div>

</template>

<script>
    import {computed, ref} from 'vue'

    export default {
        name: "GroupAdmin",
        setup() {
            const handleEdit = (index, row) => {
                console.log(index, row);
            }
            const handleDelete = (index, row) => {
                console.log(index, row);
            }
            const tableData = [{
                date: '2016-05-02',
                name: '部门A',
                level:'4级',
                state:'低危',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '部门B',
                level:'3级',
                state:'低危',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '部门C',
                level:'2级',
                state:'低危',
                address: '上海市普陀区金沙江路 1519 弄'
            }
            // , {
            //     date: '2016-05-03',
            //     name: '部门A',
            //     address: '上海市普陀区金沙江路 1516 弄'
            // }
            ]
            return {
                tableData,
                handleEdit,
                handleDelete
            }
        }
    }
</script>

<style scoped>
    .container {
        padding: 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .handle-box {
        margin-bottom: 20px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
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

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>