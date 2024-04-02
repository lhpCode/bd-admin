<template>
  <div class="my-menu">
    <el-menu-item :index="props.menuItem.key" :key="props.menuItem.key">
      //#hook_1
    </el-menu-item>
  </div>
</template>

//#end;
<script>
return {
  slot: {
    hook_1: {
      element: function () {
        return ` <SvgIcon :iconName="props.menuItem.icon" :styleIcon="styleIcon" />
      <template #title>
        <span> {{ $t(props.menuItem.label) }}</span>
      </template>`;
      },
      antdv: function () {
        return `<template #icon>
        <SvgIcon :iconName="props.menuItem.icon" :styleIcon="styleIcon" />
      </template>
      <span> {{ $t(props.menuItem.label) }}</span>`;
      },
    },
  },
};
</script>
