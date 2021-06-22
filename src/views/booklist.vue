<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="usermanager">
    <!-- Content Header (Page header) -->
    <pageHeader title="书籍管理"></pageHeader>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="card" style="width: 100%; height: auto">
            <div class="card-header">
              <h1 class="card-title" style="font-weight: bold">书籍列表</h1>
            </div>
            <button
              @click="addArticle"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#infomodal"
            >
              新增文章
            </button>
            <!-- /.card-header -->
            <el-table :data="booklist" style="width: 100%">
              <el-table-column prop="id" label="序号" width="180">
              </el-table-column>
              <el-table-column prop="bookname" label="书名" width="180">
              </el-table-column>
            <el-table-column prop="author" label="作者" width="180">
              </el-table-column>
              <el-table-column prop="bookdes" label="介绍">
              </el-table-column>
              <el-table-column label="操作"  width="180">
                  <template slot-scope="scope">
                   <el-button
                  @click="queryAricle(scope.row.id)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
                <el-button
                  @click="delAricle(scope.row.id)"
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
              :current-change="queryAllBooksBypage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <el-dialog title="电子书编辑" :visible.sync="showBook" fullscreen>
      <el-form ref="form" :model="book" label-width="80px">
        <el-form-item label="书名">
          <el-input v-model="book.bookname"></el-input>
        </el-form-item>
        <el-form-item label="图书介绍">
          <el-input v-model="book.bookdes"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="book.author"></el-input>
        </el-form-item>
        <el-form-item label="电子书地址">
            <el-input v-model="book.bookUrl"></el-input>
          <input type="file" @change="bookUpload"/>     
        </el-form-item>
        <el-form-item label="电子书封面地址">
            <el-input v-model="book.imgurl"></el-input>
          <input type="file" @change="imgUpload"/> 
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showBook = false">取 消</el-button>
        <el-button type="primary" @click="saveArticle()">确 定</el-button>
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
import { queryBookDetail, queryBookList, saveBook, delBook } from "@/api/book";
export default {
  name: "articleManage",

  data() {
    return {
      userCount: 52,

      booklist: [],

      buttonstatus: "display: none;",
      ind: "",
      book: { id: 0, bookname: "", imgurl: "", bookdes: "", bookUrl: "" },
 
      showBook: false,
      updateDataType: "",
      pagesize: 20,
      tatolpage: 5,
      curpage: 1,
    };
  },
  methods: {
    bookUpload(e) {
      let that = this;
    
      let files = e.target.files;
      debugger
      files=files[0]
      uploadQinuImage(files).then((res) => {
       
        this.book.bookUrl=res.path;
      });
    },
    imgUpload(e) {
      let that = this;
    
      let files = e.target.files;
      debugger
      files=files[0]
      uploadQinuImage(files).then((res) => {
       
        this.book.imgurl=res.path;
      });
    },
    queryAllBooksBypage: function (page) {
      var _this = this;

      queryBookList(page, _this.pagesize).then((res) => {
          let tempdata=res.data.data.content;
         _this.booklist=tempdata.slice(0,tempdata.length)

      });
    },
    delAricle: function (id) {
      delBook(id).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.queryAllBooksBypage(0)
      });
    },
    queryAricle: function (id) {
      var _this = this;

      queryBookDetail(id).then((res) => {

        this.book = res.data.data;
        // debugger
        _this.updateDataType = "update";
        _this.showBook = true;
      });
    },

    saveArticle: function () {
      var _this = this;

      console.log(this.book);
      if (_this.updateDataType == "add") {
        this.book.id = null;
      }

      saveBook(this.book).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.showBook = false;
        this.queryAllBooksBypage(0)
      });

    },
    addArticle: function () {
      this.updateDataType = "add";
      this.book = {id: 0, bookname: "", imgurl: "", bookdes: "", bookUrl: ""};
      this.showBook = true;
    },
  },
  mounted: function () {
    this.queryAllBooksBypage(0);
  },
  components: {
    Infomodal,
    ToastsContainerTopRight,
    Pagehelper,
    pageHeader
  },
};
</script>

<style>
</style>