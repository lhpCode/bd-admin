<template>
  <div class="tab-bar flex-align">
    <div class="icon flex-align">//#slot_1</div>
    <div class="scroll" id="scroll">
      <div class="tab-bar">
        <a
          class="tab"
          :class="{
            select: router.currentRoute.value.fullPath === tabKey.path,
          }"
          v-for="tabKey in systemStore.tabBarList"
          :key="tabKey.path"
          @click="goRouter(tabKey.path)"
        >
          {{ $t(tabKey.name) }}
          <div
            v-if="tabKey.path !== '/home'"
            class="close flex-center"
            @click.stop="systemStore.delTabbar(tabKey.path)"
          >
            //#slot_3
          </div>
        </a>
      </div>
    </div>
    <div class="icon flex-align">//#slot_2</div>
  </div>
</template>

//#end;
<script>
return {
  slot: {
    slot_1: {
      element: function () {
        return ` <SvgIcon @click="clickScroll(-10)" iconName="ArrowLeftBold" />`;
      },
      antdv: function () {
        return ` <SvgIcon @click="clickScroll(-10)" iconName="LeftOutlined" />`;
      },
    },
    slot_2: {
      element: function () {
        return `<SvgIcon @click="clickScroll(10)" iconName="ArrowRightBold" />`;
      },
      antdv: function () {
        return `<SvgIcon @click="clickScroll(10)" iconName="RightOutlined" />`;
      },
    },
    slot_3: {
      element: function () {
        return `<SvgIcon :styleIcon="styleIcon" iconName="Close" />`;
      },
      antdv: function () {
        return `<SvgIcon :styleIcon="styleIcon" iconName="CloseOutlined" />`;
      },
    },
  },
};
</script>
