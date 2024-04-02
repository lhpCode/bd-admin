<template>
  <el-menu
    :class="{ 'a-menu': props.isCollapse }"
    :collapse-transition="false"
    :collapse="props.isCollapse"
    active-text-color="#ffffff"
    :text-color="textColor"
    :background-color="backgroundColor"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :show-timeout="0"
    :hide-timeout="0"
    @select="select"
  >
    <slot />
  </el-menu>
</template>
