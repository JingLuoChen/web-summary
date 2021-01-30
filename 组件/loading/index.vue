<template>
  <div style="margin: 50px;">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="title">查询中</div>
  </div>

</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped lang="less">
  .loading {
    width: 60px;
    height: 40px;
    margin: 20px auto;
    span {
      display: inline-block;
      width: 8px;
      height: 100%;
      border-radius: 4px;
      background: #2d8cf0;
      animation: load 1s ease infinite;
    }
  }
  .title {
    text-align: center;
    font-size: 14px;
    color: #2d8cf0;
  }

  @keyframes load {
    0%,
    100% {
      height: 40px;
      background: #2d8cf0;
    }
    50% {
      height: 70px;
      margin: -15px 0;
      background: lightblue;
    }
  }
  .loading span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .loading span:nth-child(3) {
    animation-delay: 0.4s;
  }
  .loading span:nth-child(4) {
    animation-delay: 0.6s;
  }
  .loading span:nth-child(5) {
    animation-delay: 0.8s;
  }
</style>
