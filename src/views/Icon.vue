<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-emoji"></i> 漏洞库信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="data" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                style="width: 100%">
        <el-table-column align="center" width="250" label="漏洞名" prop="name"></el-table-column>
        <el-table-column align="center" width="160" label="CNNVDID" prop="cnnvdid"></el-table-column>
        <el-table-column align="center" width="100" label="发布时间" prop="releaseTime"></el-table-column>
        <el-table-column align="center" width="50" label="危险等级" prop="riskLevel"></el-table-column>
        <el-table-column align="center" width="140" label="CVEID" prop="cveid"></el-table-column>
        <el-table-column align="center" label="CVE链接" prop="cvelink"></el-table-column>
        <el-table-column align="center" width="50" label="详情">
          <template #default="scope">
            <!--                       <p>{{scope}}</p>-->
            <el-button type="text" @click="routerToDetail(scope.row)">查看</el-button>
          </template>
          <!--                    <template #default="scope">
                                  <el-button type="text" @click="">查看信息
                                  </el-button>
                              </template>-->
        </el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                       :page-size="query.pageSize" :total="pageTotal"
                       @current-change="handlePageChange"></el-pagination>
      </div>
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

import {computed, ref, reactive} from "vue";
import {getCNNVDInfo,getCNNVDpagetotal} from "../api";

import {useRouter} from "vue-router";

export default {
  name: "icon",
  setup() {
    const router = useRouter();
    const param = reactive(
        {
          offset: '1'
        }
    )
    const query = reactive({
      address: "",
      name: "",
      pageIndex: 1,
      pageSize: 50,
    });
    const tableData = ref([]);
    const pageTotal = ref(0)
    const data = ref([])

    const getpagetotal = () => {
      getCNNVDpagetotal().then((res) => {
        pageTotal.value = JSON.parse(JSON.stringify(res))
      })
    }
    getpagetotal()
    const queryCNNVDInfoByPage = () => {
      getCNNVDInfo(query.pageIndex - 1).then((res) => {
        // console.log("jaajja"+res)

        data.value = JSON.parse(JSON.stringify(res))
        // console.log(data.value)
        // forEach( d in data){
        //     console.log(d)
        // }
        console.log(data.value)

      })
    }
    queryCNNVDInfoByPage()
    const routerToDetail = (param) => {
      console.log("878787878787/78787878787878")
      console.log(param)
      router.push({
        path: '/donate',
        query: param

      })
    }
    const handlePageChange = (val) => {
      query.pageIndex = val;
      console.log(val)
      queryCNNVDInfoByPage()
    };
    const getData = () => {
      fetchData(query).then((res) => {
        tableData.value = res.list;
        pageTotal.value = res.pageTotal || 50;
      });
    };

    return {
      param,
      router,
      data,
      pageTotal,
      query,
      tableData,
      queryCNNVDInfoByPage,
      routerToDetail,
      handlePageChange,
      getData,
      getpagetotal
    };
  }
};
</script>

<style scoped>
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