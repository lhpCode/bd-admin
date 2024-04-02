<template>
  <div class="login-from">
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="loginForm"
      label-width="auto"
      style="max-width: 600px"
    >
      <el-form-item prop="name">
        <el-input
          v-model="loginForm.name"
          style="width: 240px"
          placeholder="Email or Account"
        >
          <template #prefix>
            <SvgIcon iconName="#account" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          style="width: 240px"
          placeholder="password"
          type="password"
          show-password
        >
          <template #prefix>
            <SvgIcon iconName="#mima" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="forget">Forget Password?</div>
    <el-button
      :disabled="loadingFlag"
      class="btn"
      type="primary"
      round
      @click="submitForm(ruleFormRef)"
    >
      <span v-if="!loadingFlag">Sign in</span>
      <SvgIcon
        v-else
        color="#fff"
        :styleIcon="styleIcon"
        class="loading"
        iconName="#jiazai"
      />
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.login-from {
  margin: 20px auto;
  width: 240px;
  .forget {
    text-align: center;
    color: #87cbf8;
    font-size: 14px;
    cursor: pointer;
  }
  .btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
