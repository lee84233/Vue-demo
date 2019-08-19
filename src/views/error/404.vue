<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg"></i></div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">页面不存在</h2>
      <p class="weui-msg__desc">错误的页面地址或您没有权限查看页面</p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <router-link to="/login" class="weui-btn weui-btn_primary">去登录</router-link>
        <router-link to="/home" class="weui-btn weui-btn_default">返回首页</router-link>
      </p>
    </div>
    <div class="weui-msg__extra-area">
      <div class="weui-footer">
        <p class="weui-footer__links">
          <a href="javascript:void(0);" class="weui-footer__link">底部链接文本</a>
        </p>
        <p class="weui-footer__text">李小城(842337932@qq.com) 2018-02-12</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error_404'
};
</script>
