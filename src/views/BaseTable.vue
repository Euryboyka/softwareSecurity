<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 软件安全信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="softwareInfo.name" placeholder="软件名称" class="handle-input mr10"></el-input>
        <el-input v-model="softwareInfo.version" placeholder="版本号" class="handle-input mr10"></el-input>
        <el-input v-model="softwareInfo.develeper" placeholder="开发商" class="handle-input mr10"></el-input>
        <el-input v-model="softwareInfo.location" placeholder="安装位置" class="handle-input mr10"></el-input>
        <el-input v-model="softwareInfo.date" placeholder="安装时间" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="uploadSingleSoftwareInfo">添加软件</el-button>
        <span></span>
        <el-button type="primary" @click="VInfoShow" style="float: right">信息展示</el-button>
      </div>
      <el-table :data="responseDateList" border class="table" ref="multipleTable"
                header-cell-class-name="table-header">
        <el-table-column prop="name" label="软件名称" align="center"></el-table-column>
        <el-table-column prop="version" label="版本号" align="center">
        </el-table-column>
        <el-table-column prop="develeper" label="开发商" align="center">
        </el-table-column>
        <el-table-column prop="location" label="安装位置" align="center"></el-table-column>

        <el-table-column prop="date" label="安装时间" align="center"></el-table-column>

        <el-table-column prop="safeLevel" label="安全状态" align="center">
          <template #default="scope">
            <p v-if="scope.row.safeLevel == '暂无'"><i class="el-icon-s-help green"></i></p>
            <p v-if="scope.row.safeLevel == '低危'"><i class="el-icon-s-help green"></i></p>
            <p v-if="scope.row.safeLevel == '高危'"><i class="el-icon-s-help red"></i></p>
            <p v-if="scope.row.safeLevel == '超危'"><i class="el-icon-s-help red"></i></p>
            <p v-if="scope.row.safeLevel == '中危'"><i class="el-icon-s-help orange"></i></p>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-lx-copy" @click="handleEdit(scope.$index, scope.row)">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      <div class="pagination">-->
<!--        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"-->
<!--                       :page-size="query.pageSize" :total="pageTotal"-->
<!--                       @current-change="handlePageChange"></el-pagination>-->
<!--      </div>-->
    </div>

    <!-- 编辑弹出框 -->
    <!--        <el-dialog title="编辑" v-model="editVisible" width="30%">-->
    <!--            <el-form label-width="70px">-->
    <!--                <el-form-item label="用户名">-->
    <!--                    <el-input v-model="form.name"></el-input>-->
    <!--                </el-form-item>-->
    <!--                <el-form-item label="地址">-->
    <!--                    <el-input v-model="form.address"></el-input>-->
    <!--                </el-form-item>-->
    <!--            </el-form>-->
    <!--            <template #footer>-->
    <!--                <span class="dialog-footer">-->
    <!--                    <el-button @click="editVisible = false">取 消</el-button>-->
    <!--                    <el-button type="primary" @click="saveEdit">确 定</el-button>-->
    <!--                </span>-->
    <!--            </template>-->
    <!--        </el-dialog>-->
    <el-dialog title="详细信息" v-model="editVisible" width="95%">
      <el-table :data="userCNNVDInfo" border class="table" ref="multipleTable"
                header-cell-class-name="table-header">
        <el-table-column prop="name" label="漏洞名" align="center"></el-table-column>
        <el-table-column prop="riskLevel" label="危险等级" align="center"></el-table-column>
        <el-table-column prop="threatType" label="威胁方式" align="center"></el-table-column>
        <el-table-column prop="releaseTime" label="发现时间" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        <el-table-column prop="develeper" label="所属厂商" align="center"></el-table-column>
        <el-table-column label="更多信息" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-lx-copy" @click="showDetails(scope.$index, scope.row)">查看
            </el-button>
          </template>
        </el-table-column>


      </el-table>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                  <!--                    <el-button type="primary" @click="">确 定</el-button>-->
                </span>
      </template>
    </el-dialog>

    <el-dialog title="详细信息" v-model="editVisible1" width="90%">
      <span class="el-table__empty-block"><h2>漏洞简介 :</h2> {{ CNNVDDetails.bugIntroduction }}</span><br/>
      <span class="el-table__empty-block"><h2>漏洞公告 :</h2>{{ CNNVDDetails.bugNotice }}</span><br/>
      <span class="el-table__empty-block"><h2>参考网址 :</h2>{{ CNNVDDetails.websiteReference }}</span><br/>
      <span class="el-table__empty-block"><h2>受影响实体 :</h2>{{ CNNVDDetails.affectEntity }}</span><br/>
      <span class="el-table__empty-block"><h2>补丁 :</h2>{{ CNNVDDetails.patch }}</span><br/>
      <span class="el-table__empty-block"><h2>cve编号 :</h2>{{ CNNVDDetails.cveid }}</span><br/>
      <span class="el-table__empty-block"><h2>cve漏洞库信息链接 :</h2>{{ CNNVDDetails.cvelink }}</span><br/>
      <span class="el-table__empty-block"><h2>CNNVD编号 :</h2>{{ CNNVDDetails.cnnvdid }}</span><br/>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible1 = false">取 消</el-button>
                  <!--                    <el-button type="primary" @click="">确 定</el-button>-->
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {fetchData, getSingleInfo, getVulerableInfo, getUserCNNVDList,uploadSingleSoftware} from "../api/index";
import createStore from "../store/index";

// import {} from "./Dashboard";
export default {
  name: "basetable",
  setup() {
    console.log(createStore.state.computerId, "createStore.state.computerId")

    const responseDate = ref([]);
    const userCNNVDInfo = ref([]);
    const thisRow = ref([]);
    const responseDateList = ref([]);
    const CNNVDDetails = ref([]);
    const query = reactive({
      address: "",
      name: "",
      pageIndex: 1,
      pageSize: 10,
    });
    const softwareInfo = reactive({
      name:"",
      version:"",
      develeper:"",
      location:"",
      date:"",
      safeLevel:"无"
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      fetchData(query).then((res) => {
        tableData.value = res.list;
        pageTotal.value = res.pageTotal || 50;
      });
    };
    getData();

    const getVulnerableInfo = () => {
      getVulerableInfo(createStore.state.computerId).then((res) => {
        responseDateList.value = JSON.parse(JSON.stringify(res))
        console.log(responseDateList.value)
      })
    }
    const VInfoShow = () => {
      console.log("###############", createStore.state.computerId)

      if (createStore.state.computerId == "用户机Id为空，请输入") {
        alert("用户机Id为空，请输入")
        return
      }
      console.log(createStore.state.computerId)
      getVulnerableInfo()
    }
    // 查询单个软件操作
    // const InputInfo = () => {
    //     getSingleInfo(softwareName.value).then((res)=>{
    //         responseDate.value = data.value = JSON.parse(JSON.stringify(res));
    //         responseDateList.value.push(responseDate.value);
    //         console.log(responseDate.value)
    //     })
    // };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            ElMessage.success("删除成功");
            tableData.value.splice(index, 1);
          })
          .catch(() => {
          });
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    const editVisible1 = ref(false);
    let form = reactive({
      name: "",
      address: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      console.log(row.name)
      getUserCNNVDList(row.name).then((res) => {
        userCNNVDInfo.value = JSON.parse(JSON.stringify(res))
      })
      console.log(userCNNVDInfo.value)
      editVisible.value = true;
    };

    const showDetails = (index, row) => {
      console.log(row)
      CNNVDDetails.value = row
      editVisible1.value = true
    }


    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };


    const getRow = (row) => {
      thisRow.value = row;
    }

    const uploadSingleSoftwareInfo = () => {
      console.log(softwareInfo)
      console.log(createStore.state.computerId)
      uploadSingleSoftware(softwareInfo,createStore.state.computerId).then((res)=>{
        // if (res=="success")ElMessage.success("success");
        // else alert("上传失败");
      })
      softwareInfo.name="";
      softwareInfo.date="";
      softwareInfo.location="";
      softwareInfo.version="";
      softwareInfo.develeper="";
    }
    return {
      CNNVDDetails,
      query,
      tableData,
      pageTotal,
      editVisible,
      editVisible1,
      form,
      softwareInfo,
      responseDate,
      responseDateList,
      userCNNVDInfo,
      thisRow,
      // InputInfo,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
      getVulnerableInfo,
      VInfoShow,
      showDetails,
      getRow,
      uploadSingleSoftwareInfo
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 150px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
  font-size: 50px;
}
.orange {
  color: orange;
  font-size: 50px;
}
.green {
  color: #00a854;
  font-size: 50px;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.el-table__empty-block {
  display: block;
  margin: auto;
  height: 160px;
  line-height: 30px;
}
</style>
