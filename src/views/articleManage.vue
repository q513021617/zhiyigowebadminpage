<template>
  
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="usermanager">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">本站数据</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">首页</a></li>
              <li class="breadcrumb-item active">用户管理</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{userCount}}</h3>

                <p>注册人数</p>
              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>53</h3>

                <p>登录人数</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
       

          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>65</h3>

                <p>访问人数</p>
              </div>
              <div class="icon">
                <i class="ion ion-pie-graph"></i>
              </div>
              <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="card" style="width: 100%;height: auto;">
            <div class="card-header">
              <h1 class="card-title" style="font-weight: bold;">用户列表</h1>
            </div>
            <button @click="addArticle" class="btn btn-primary" data-toggle="modal"  data-target="#infomodal" >新增文章</button>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="articlelist" class="table table-bordered">
                <thead>
                <tr>
                  <th style="width: 10px">#</th>
                  <th>文章名</th>
           
                  <th style="width:30%">操作</th>
                </tr>
                </thead>
                <tbody>

                <tr v-if="articlelist.length<=0">
                  <td colspan="5">暂时无文章信息</td>
                </tr>

                <tr v-for="item in articlelist" v-bind:key="item.id">
            <td>{{item.id}}</td><td>{{item.title}}</td>

                  <td>
                  <button type="submit" class="btn btn-danger" data-toggle="modal"  data-target="#infomodal" @click="delAricle(item.id)">删除</button>
                     <button type="submit" class="btn btn-info" data-toggle="modal"  data-target="#infomodal" @click="queryAricle(item.id)">查看详细信息</button>
                  </td>

                </tr>


                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
               <Pagehelper
                 v-bind:tatolpage="tatolpage"
                 v-bind:curpage="curpage"
                 v-on:queryAllBypagechild="queryAllArticleBypage"
                 ref = "pagehp"
                 ></Pagehelper>
          </div>

        </div>

      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

     <Infomodal
     v-bind:inputtitle="inputtitle"
     v-bind:isinputlist="false"
     v-bind:info="info"
     v-bind:oktext="oktext"
     v-on:closeInfoModel="closeInfoModelP"
     v-on:okmethod="okmethodP"
     v-bind:isArticle="showlist"
     v-bind:infolist="infolist"
     v-bind:isShowMsg="isShowMsg"
     v-if="showmodel"
     ></Infomodal>

  <ToastsContainerTopRight
     v-bind:ToastTitle="ToastTitle"
     v-bind:ToastSubtitle="ToastSubtitle"
     v-bind:Toasttext="Toasttext"
     v-if="showtoast"
     v-on:closeInfoToast="closeInfoToastP"
     ></ToastsContainerTopRight>

  </div>
  <!-- /.content-wrapper -->

</template>

<script>
function Info(tag,name,value) {
    this.tag=tag;
    this.name=name;
    this.value=value;

  }
  function Article() {
    this.id=0;
    this.title="";
    this.articleContent='';
  }
import httpmethods from '@/tools/http'
import Infomodal from '@/components/infomodal.vue'
import Vue from 'vue'
import ToastsContainerTopRight from '@/components/toastsContainerTopRight.vue'
import Pagehelper from '@/components/pagehelper.vue'
export default {

name: 'articleManage',

 data(){
        return{
            userCount: 52,

        articlelist:[],

        buttonstatus:"display: none;",
        ind:"",

           // 模态框数据
         inputtitle:"",
        showlist:false,
          info:"",
          infolist:[],
          oktext:"",
          okmethodP:Function,
          showmodel:false,
          isShowMsg:false,
           // 提示框数据
           ToastTitle:"",
            ToastSubtitle:"",
            Toasttext:"",
          showtoast:false,

            pagesize:5,
          tatolpage:5,
          curpage:1
        }
      }, 
      methods: {

      closeInfoModelP:function (showmodel) {
        this.showmodel=showmodel;
      },
      closeInfoToastP:function () {
        this.showtoast=false;
      },
        showinfo:function(inputtitle,infolist,isinputlist,oktext,info,okmethod) {

        console.log("showinfo");
        console.log(info);
        this.inputtitle=inputtitle;
          this.showlist=isinputlist;
          this.info=info;
          this.infolist=infolist;
          this.oktext=oktext;
          this.okmethodP=okmethod;
          this.showmodel=true;
   
          // this.$forceUpdate();
       
      },showToastFuc:function(ToastTitle,ToastSubtitle,Toasttext) {
        console.log("showToast");
        
        this.ToastTitle=ToastTitle;
            this.ToastSubtitle=ToastSubtitle;
            this.Toasttext=Toasttext;
          this.showtoast=true;
        var _this=this;
          // this.$forceUpdate();
       window.setTimeout(_this.closeInfoToastP,1000);

      },
      closeInfoModelP:function (showmodel) {
        this.showmodel=showmodel;
      },
      queryAllArticleBypage:function (page){

        var _this=this;
        
         httpmethods.axios.get("/blogapi/admin/aricle/"+page+"/"+this.pagesize,{}).then(

            function (data) {

            data=data.data;
            console.log("data.content");
            console.log(data.totalPages);
            _this.userCount=66;
          _this.articlelist = data.content;
          _this.tatolpage= data.totalPages;
           _this.$refs.pagehp.refreshdata( _this.tatolpage);
          _this.$forceUpdate();

        }
        ).catch(function (error) {

          console.log(error);
                    console.log(error.response);
                });
      },
      delAricle:function (id) {

  
        let aricledata = new FormData();
        aricledata.append('id',id);
        var _this=this;
       _this.isShowMsg=true;
        this.showinfo("提示:",[],false,"确定","是否删除该文章信息?",function () {
    
        $.ajax({
          url: "/blogapi/admin/aricle/",
          type: 'DELETE',
          data:{'id':id},
          success: function(result) {
              
            console.log("删除: "+result);
            _this.showToastFuc("信息:","","删除文章成功!");
            _this.closeInfoModelP();
            setTimeout(_this.closeInfoModelP,500);
            _this.queryAllArticleBypage(0);

          }
        });


    });



  },
      queryAricle: function (id) {

        var _this=this;
    $.get("/blogapi/admin/aricle/"+id,function (data) {
      console.log(data);
      var infolist=[];


      infolist.push(new Info("文章名","title",data.title));
      infolist.push(new Info("文章内容","content",data.articleContent));


      _this.showinfo("文章信息:",infolist,true,"确定","",function () {

   

          console.log("showInfo----");
     
 
        let articleData = new FormData();
        articleData.append('id',id);
        articleData.append('title',infolist[0].value);
        articleData.append('articleContent',infolist[1].value);
    
          console.log(articleData);
          httpmethods.updateDataFuc(articleData,"/blogapi/admin/aricle/",function () {
            _this.showToastFuc("提示:","","文章数据更新完毕");
            _this.closeInfoModelP();
            _this.queryAllArticleBypage(0);
          });


      });
    });

  },addArticle: function () {

        var infolist=[];

        infolist.push(new Info("文章名","uername",""));
        infolist.push(new Info("内容","password",""));
       
        var _this=this;
        this.showinfo("文章信息:",infolist,true,"确定","",function () {
          console.log(infolist);

   
          let articledata = new FormData();
          articledata.append('title',infolist[0].value);
          articledata.append('articleContent',infolist[1].value);

          httpmethods.addDataFuc(articledata,"/blogapi/admin/aricle/",function () {
            // 
            _this.showToastFuc("信息:","","添加文章成功!");
            _this.queryAllArticleBypage(0);
            
            _this.closeInfoModelP();
          });


        });





    }
    },created: function () {
       this.queryAllArticleBypage(0);
  },
  components:{
    Infomodal,
    ToastsContainerTopRight,
    Pagehelper
  }
}
</script>

<style>

</style>