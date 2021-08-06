<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="usermanager">
    <!-- Content Header (Page header) -->
    <pageHeader title="游戏管理"></pageHeader>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="card" style="width: 100%; height: auto">
            <div class="card-header">
              <h1 class="card-title" style="font-weight: bold">游戏列表</h1>
            </div>
            <button
              @click="addGame"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#infomodal"
            >
              新增游戏
            </button>
            <!-- /.card-header -->
            <el-table :data="gamelist" style="width: 100%">
              <el-table-column prop="id" label="序号" width="180">
              </el-table-column>
              <el-table-column prop="picUrl" label="封面" width="180">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.picUrl"
                    fit="fit"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="gameName" label="游戏名" >
              </el-table-column>

              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    @click="queryGame(scope.row.id)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    @click="deGameById(scope.row.id)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              :page-size="20"
              :pager-count="pagesize"
              layout="prev, pager, next"
              :total="tatolpage"
              @current-change="queryAllGameBypage"

            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <el-dialog title="游戏编辑" :visible.sync="showGame" fullscreen>
      <el-form ref="form" :model="game" label-width="80px">
        <el-form-item label="游戏名">
          <el-input v-model="game.gameName"></el-input>
        </el-form-item>
        <el-form-item label="游戏rom地址">
          <el-input v-model="game.romUrl"></el-input>
          <input type="file" @change="gameUpload" />
        </el-form-item>
        <el-form-item label="游戏封面">
          <el-input v-model="game.picUrl"></el-input>
          <input type="file" @change="imgUpload" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showGame = false">取 消</el-button>
        <el-button type="primary" @click="saveGame()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import httpmethods from "@/tools/http";
import Infomodal from "@/components/infomodal.vue";
import pageHeader from "@/components/pageHeader.vue";
import Vue from "vue";
import ToastsContainerTopRight from "@/components/toastsContainerTopRight.vue";
import Pagehelper from "@/components/pagehelper.vue";

import { uploadQinuImage } from "@/api/aricle";
import {
  queryGameDetail,
  queryGameList,
  saveGame,
  delGame,
} from "@/api/game";
export default {
  name: "articleManage",

  data() {
    return {
      userCount: 52,

      gamelist: [],

      buttonstatus: "display: none;",
      ind: "",
      game: { id: 0, gameName: "", romUrl: "", picUrl: ""},

      showGame: false,
      updateDataType: "",
      pagesize: 20,
      tatolpage: 5,
      curpage: 0,
    };
  },
  methods: {
    gameUpload(e) {
      let that = this;

      let files = e.target.files;
      //   debugger
      files = files[0];
      uploadQinuImage(files).then((res) => {
        this.game.romUrl = res.path;
        console.log(this.game.romUrl)
      });
    },
    imgUpload(e) {
      let that = this;

      let files = e.target.files;
      //   debugger
      files = files[0];
      uploadQinuImage(files).then((res) => {
        this.game.picUrl = res.path;
      });
    },
    queryAllGameBypage: function (page) {
      var _this = this;
      this.curpage=page<=0?0:page-1;
      queryGameList(this.curpage, _this.pagesize).then((res) => {
        let tempdata = res.data.data.content;
        _this.gamelist = tempdata.slice(0, tempdata.length);
        debugger
        _this.tatolpage = res.data.data.totalElements;
      });
    },
    deGameById: function (id) {
      delGame(id).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.queryAllGameBypage(0);
      });
    },
    queryGame: function (id) {
      var _this = this;

      queryGameDetail(id).then((res) => {
        this.game = res.data.data;
        // debugger
        _this.updateDataType = "update";
        _this.showGame = true;
      });
    },

    saveGame: function () {
      var _this = this;

      console.log(this.game);
      if (_this.updateDataType == "add") {
        this.game.id = null;
      }

      saveGame(this.game).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.showGame = false;
        this.queryAllGameBypage(0);
      });
    },
    addGame: function () {
      this.updateDataType = "add";
      this.game = { id: 0, title: "", pic: "", lrc: "", url: "", author: "" };
      this.showGame = true;
    },
  },
  mounted: function () {
    this.queryAllGameBypage(0);
  },
  components: {
    Infomodal,
    ToastsContainerTopRight,
    Pagehelper,
    pageHeader,
  },
};
</script>

<style>
</style>