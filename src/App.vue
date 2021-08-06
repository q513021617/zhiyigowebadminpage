<template>
  <div class="full-page">
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
html{
    position: relative !important;
}
body{
    width: 100%;
    height: 1200px !important;
    position: absolute;
    top:0px;
}
body .full-page{
    position: absolute;
    top:0px;
}
.full-page{
    width: 100%;
    height: 100%;
}
</style>