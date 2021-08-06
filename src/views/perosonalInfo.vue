<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="usermanager">
    <!-- Content Header (Page header) -->
    <pageHeader title="个人信息管理"></pageHeader>
    <!-- /.content-header -->
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <div class="card" style="width: 100%; height: auto">
            <div class="card-header">
              <h1 class="card-title" style="font-weight: bold">个人信息管理</h1>
            </div>

            <!-- /.card-header -->
            <el-form ref="form" :model="user" label-width="80px">
                <el-form-item label="头像url">                
                    <el-avatar :size="100" :src="user.avatar"></el-avatar>
                    <input type="file" @change="imgUpload" />
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="user.username"></el-input>
              </el-form-item>
     
              <el-form-item label="角色">
                <el-input v-model="user.role"></el-input>
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="user.phone"></el-input>
              </el-form-item>

              
            </el-form>

            <button
              @click="saveUserInfo"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#infomodal"
            >
              保存
            </button>

          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import pageHeader from "@/components/pageHeader.vue";
import {saveUser,queryUserDetail,delUserById} from '@/api/user'
import { uploadQinuImage } from "@/api/aricle";
export default {


  data() {
    return {
      userCount: 52,

      buttonstatus: "display: none;",
      ind: "",
      user: { id: 0, username: "", password: "", role: "", phone: "",sex:'',email:'',avatar:'',created:'',updated:'',token:''},

      showBook: false,
      updateDataType: "",
      pagesize: 20,
      tatolpage: 5,
      curpage: 1,
    };
  },
  methods: {
    
    imgUpload(e) {
      let that = this;

      let files = e.target.files;
    //   debugger;
      files = files[0];
      uploadQinuImage(files).then((res) => {
        this.user.avatar = res.path;
      });
    },
    async queryUserDetail(id){
        let {data}=await queryUserDetail(id);
        // debugger
        this.user=data
    },
    async saveUserInfo(){
        await saveUser(this.user)
        this.$notify({
          title: '成功',
          message: '用户保存成功!',
          type: 'success'
        });
    }    
    
  },
  components:{
      pageHeader
  },

  created: function () {
      let userinfo=localStorage.getItem("userData");
    this.queryUserDetail(JSON.parse(userinfo).id);
        
  }
};
</script>

<style>
</style>