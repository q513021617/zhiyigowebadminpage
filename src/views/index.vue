<template>
  <div id="app" >

       <nav class="main-header navbar navbar-expand navbar-white navbar-light">
     
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
            </li>

            <li class="nav-item has-treeview menu-open">
                <a href="/" class="nav-link active">首页</a>
            </li>

            <li class="nav-item d-none d-sm-inline-block">
                <a href="#" class="nav-link">Contact</a>
            </li>
        </ul>

  
        <form class="form-inline ml-3">
            <div class="input-group input-group-sm">
                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="搜索内容。。。。。">
                <div class="input-group-append">
                    <button class="btn btn-navbar" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </form>


       
       
    </nav>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
  
        <a href="#" class="brand-link">
            <img src="/images/logo.gif" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                 style="opacity: .8;">
            <span class="brand-text font-weight-light">后台管理</span>
        </a>

   
        <div class="sidebar">
  
            <div class="webUser-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img src="/images/avator.jpg" class="img-circle elevation-2" alt="User Image" width="90px" height="90px">
                </div>
                <div class="info">
                    <a href="#" class="d-block">{{user.username}}</a>
                </div>
            </div>

  
            <nav class="mt-2">
                <ul id="navul" class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                   
                    <li class="nav-item has-treeview " v-for="mitem in menulist" v-bind:key="mitem.id">
                       <router-link :to="mitem.url" class="nav-link">
                  
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                {{mitem.name}}

                            </p>
                       </router-link>

                    </li>

                      
                    <li class="nav-item has-treeview">
                         <a @click="quitlogin" class="nav-link">
                            <i class="nav-icon fas fa-table"></i>
                            <p>
                                退出登录

                            </p>
                        </a>

                    </li>

                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>

   


    <router-view/>




<mainfooter></mainfooter>
  </div>
</template>
<script>

import mainfooter from '@/components/footer.vue'
import cookieOption from '@/tools/cookie'
import httpmethods from '@/tools/http'
import {queryMenuList} from '@/api/menu'
import {queryUserDetail} from '@/api/user'
export default {
 data() {
    return {
            menulist:[],
            user:{}
    }
    },
  components: {
    mainfooter
  },methods:{
       queryAllMenu:async function () {
                var _this=this;
                let {data}=await queryMenuList();
                _this.menulist=data;
                _this.$forceUpdate();
            },
            quitlogin:function(){
                    cookieOption.delCookie("userdata");
                     location.href="/#/login";
                     this.$router.push("/login")
            },
            queryuserbyid:async function(id){
                    var _this=this;
                 let {data}= await queryUserDetail(id);
                     console.log("--------queryuserbyid----------");
                    console.log(data);
                    if(!data){
                        _this.quitlogin();
                        return;
                    }
                    _this.$store.commit('setUserinfo',data);
                    _this.user=data;
                    _this.$forceUpdate();
            }
  },created: function () {

      var _this=this;
      var usercookiedata = cookieOption.getCookie("userdata");
      
            console.log("usercookiedata");
            console.log(usercookiedata);
            if(usercookiedata == undefined || usercookiedata.length == 0){
                
                    location.href="/#/login";
            }
            if(!(usercookiedata == undefined || usercookiedata.length == 0)){
                
                this.queryuserbyid(usercookiedata);
               
                let userobj=_this.$store.state.userinfo;
                console.log("id: "+userobj.id+" username: "+userobj.username+" password: "+userobj.password
                            +" phone: "+userobj.phone+" email: "+userobj.email);
            }
           
            this.queryAllMenu();
        }

}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.webUser-panel{
    flex-direction: column;
}
</style>