<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="usermanager">
    <!-- Content Header (Page header) -->
    <pageHeader title="音乐管理"></pageHeader>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="card" style="width: 100%; height: auto">
            <div class="card-header">
              <h1 class="card-title" style="font-weight: bold">音乐列表</h1>
            </div>
            <button
              @click="addMusic"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#infomodal"
            >
              新增音乐
            </button>
            <!-- /.card-header -->
            <el-table :data="musiclist" style="width: 100%">
              <el-table-column prop="id" label="序号" width="180">
              </el-table-column>
              <el-table-column prop="pic" label="封面" width="180">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.pic"
                    fit="fit"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="歌曲名" >
              </el-table-column>
              <el-table-column prop="author" label="作者" width="180">
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    @click="queryMusic(scope.row.id)"
                    type="text"
                    size="small"
                    >查看</el-button
                  >
                  <el-button
                    @click="deMusicById(scope.row.id)"
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
              :current-change="queryAllMusicBypage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <el-dialog title="音乐编辑" :visible.sync="showMusic" fullscreen>
      <el-form ref="form" :model="music" label-width="80px">
        <el-form-item label="歌曲名">
          <el-input v-model="music.title"></el-input>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="music.author"></el-input>
        </el-form-item>
        <el-form-item label="音乐地址">
          <el-input v-model="music.url"></el-input>
          <input type="file" @change="musicUpload" />
        </el-form-item>
        <el-form-item label="歌曲封面地址">
          <el-input v-model="music.pic"></el-input>
          <input type="file" @change="imgUpload" />
        </el-form-item>
        <el-form-item label="歌词">
          <el-input v-model="music.lrc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showMusic = false">取 消</el-button>
        <el-button type="primary" @click="saveMusic()">确 定</el-button>
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
  queryMusicDetail,
  queryMusicList,
  saveMusic,
  delMusic,
} from "@/api/music";
export default {
  name: "articleManage",

  data() {
    return {
      userCount: 52,

      musiclist: [],

      buttonstatus: "display: none;",
      ind: "",
      music: { id: 0, title: "", pic: "", lrc: "", url: "", author: "" },

      showMusic: false,
      updateDataType: "",
      pagesize: 20,
      tatolpage: 5,
      curpage: 1,
    };
  },
  methods: {
    musicUpload(e) {
      let that = this;

      let files = e.target.files;
      //   debugger
      files = files[0];
      uploadQinuImage(files).then((res) => {
        this.music.url = res.path;
      });
    },
    imgUpload(e) {
      let that = this;

      let files = e.target.files;
      //   debugger
      files = files[0];
      uploadQinuImage(files).then((res) => {
        this.music.pic = res.path;
      });
    },
    queryAllMusicBypage: function (page) {
      var _this = this;

      queryMusicList(page, _this.pagesize).then((res) => {
        let tempdata = res.data.data.content;
        _this.musiclist = tempdata.slice(0, tempdata.length);
      });
    },
    deMusicById: function (id) {
      delMusic(id).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.queryAllMusicBypage(0);
      });
    },
    queryMusic: function (id) {
      var _this = this;

      queryMusicDetail(id).then((res) => {
        this.music = res.data.data;
        // debugger
        _this.updateDataType = "update";
        _this.showMusic = true;
      });
    },

    saveMusic:async function () {
      var _this = this;

      console.log(this.music);
      if (_this.updateDataType == "add") {
        this.music.id = null;
      }

     let {data}= await saveMusic(this.music);
      this.$message({
          message: "保存成功",
          type: "success",
        });

        this.showMusic = false;
        this.queryAllMusicBypage(0);
    },
    addMusic: function () {
      this.updateDataType = "add";
      this.music = { id: 0, title: "", pic: "", lrc: "", url: "", author: "" };
      this.showMusic = true;
    },
  },
  mounted: function () {
    this.queryAllMusicBypage(0);
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