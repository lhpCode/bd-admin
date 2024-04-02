<template>
  <div>a //#model_1 //#hook_1</div>
</template>
//#end;
<script>
return {
  slot: {
    hook_1: {
      element: function () {
        return ``;
      },
      antdv: function () {
        return ``;
      },
    },
  },
  model: {
    model_1: {
      i18n: {
        HOOK: function () {
          return ``;
        },
        FALSE: function () {
          return "";
        },
      },
    },
  },
};
</script>
