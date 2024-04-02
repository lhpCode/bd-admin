<template>
  <div>
    <div>admin用户和test用户可见页面</div>
    <div>admin用户可以使用新增按钮和编辑按钮</div>
    <div>test用户只能使用编辑按钮</div>
    <div>
      <!-- 使用方法一 -->
      <el-button type="primary" @click="add" v-auth="`system:user:add`">
        新增
      </el-button>
      <!-- 使用方法二 -->
      <el-button type="primary" @click="edit" v-auth:system:user:edit>
        编辑
      </el-button>
    </div>
    <Table :dataSource="dataSource" :colums="columns" />
    <EditUser v-model:form="form" v-model:state="state" />
    <!-- <SvgIcon /> -->
  </div>
</template>
