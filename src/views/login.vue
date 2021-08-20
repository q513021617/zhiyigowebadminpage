<template>
  <div class="adminpage">
    <div id="login-box">
      <h1>zhiyiCMS登录</h1>
      <div class="form" v-if="!isqrcode">
        <div class="item">
         <i class="el-icon-user-solid" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="username"
            v-model="username"
            id="username"
          />
        </div>

        <div class="item">
          <i class="fa fa-unlock-alt" aria-hidden="true"></i>
          <input
            class="password"
            type="password"
            placeholder="password"
            v-model="password"
            id="password"
          />
        </div>
        <button @click="login">登录</button>
        <button @click="getQrCode()">二维码登录</button>
      </div>

      <div v-if="isqrcode" class="qrcodeForm">
        <vue-qr
          qid="qrid"
          :text="text"
          :size="size"
          :bgSrc="bgSrc"
          :logoSrc="logoSrc"
          :callback="callBack"
          :logoScale="logoScale"
          :colorDark="colorDark"
          :colorLight="colorLight"
          :backgroundColor="backgroundColor"
        ></vue-qr>
      </div>

      <span id="erro"></span>
    </div>
  </div>
</template>

<script>
import httpmethods from "@/tools/http";
import { getUserNum } from "@/api/user";
import cookieOption from "@/tools/cookie";
import VueQr from "vue-qr";
export default {
  data() {
    return {
      username: "",
      password: "",
      userNum: "",
      isqrcode: false,
      text: "/api/user/loginByToken", // 二维码内容
      size: 230, // 二维码宽高尺寸, 长宽一致, 包含外边距
      bgSrc: "", // 嵌入背景图地址，
      logoSrc:
        "https://admin.zhiyigo.cn/images/logo.jpg", // 嵌入至二维码中心的 LOGO 地址
      margin: 0, // 二维码图像的外边距, 默认20px
      colorDark: "blue", // 实点的颜色
      colorLight: "#42B983", // 空白区的颜色
      backgroundColor: "#EEE", // 背景色
      logoScale: 0.15, // 中间图的尺寸，不要设太大，太大会导致扫码失败的 默认0.2
    };
  },
  methods: {
    callBack() {
      // alert("qcode")
    },
    guid: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    getQrCode() {
      this.isqrcode = true;
    },
    async getInfoByUserNum() {
      let { data } = await getUserNum(this.userNum);
      if (data.status === 200) {
        cookieOption.setCookie("userdata", data.data.id);
        localStorage.setItem("userData", JSON.stringify(data.data));
        window.localStorage.setItem('token',data.data.token)
        location.href = "/#/index/home";
      }
    },
    login:async function () {
      if (this.username == undefined || this.password == undefined) {
        $("#erro").html("用户名或者密码不能为空!");
        return;
      }
      console.log(this.username + " " + this.password);

      let {data}=await httpmethods.axios
        .post("/blogapi/webLogin", {
          password: this.password,
          email: this.username,
        });
         
          console.log(data);
        //   debugger
          if (data.status===200) {
            localStorage.setItem("userData", JSON.stringify(data.data));
            window.localStorage.setItem('token',data.data.token)
            cookieOption.setCookie("userdata", data.data.id);
            location.href = "/#/index/home";
            return;
          }

          if (data .status!==200) {
            $("#erro").html("用户名或者密码错误");
            return;
          }

    },
  },
  components: {
    VueQr,
  },
  mounted() {},
  created() {
    this.userNum = this.guid();
    this.text = this.text + "?num=" + this.userNum;

    setInterval(() => {
      this.getInfoByUserNum();
    }, 1000);
  },
};
</script>

<style scoped>
.adminpage {
  width: 100%;
  height: 100%;
  background-image: url("../assets/loginbgimages.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
}

#login-box {
  width: 30%;
  height: 300px;
  position: relative;
  top: 30%;
  margin: 0 auto;
  margin-top: 10%;
  text-align: center;
  background: #00000060;
  padding: 20px 50px;
}

#login-box h1 {
  color: #fff;
}

#login-box .form .item {
  margin-top: 15px;
}

#login-box .form .item i {
  color: #fff;
}
.qrcodeForm{
  width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
}
#login-box .form .item input {
  /* images/loginbgimages.jpg */
  width: 180px;
  font-size: 18px;
  border: 50px;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  background: #00ffff00;
  color: #fff;
}

#login-box button {
  margin-top: 15px;
  width: 180px;
  height: 30px;
  font-size: 20px;
  font-weight: 700px;
  color: #fff;
  background-image: linear-gradient(to right, #db3125 0%, #578bc3 100%);
  border: 0;
  border-radius: 15px;
}

#erro {
  position: relative;
  top: 30px;
  color: red;
  font-size: large;
  display: inline-block;
}
</style>