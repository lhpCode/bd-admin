<template>
  <div
    class="aside"
    :class="systemStore.isCollapse ? 'close-menu' : 'open-menu'"
  >
    <div class="log">
      <img class="log-image" src="/image/bd.jpg" />
      <span class="log-name" v-show="!systemStore.isCollapse"
        >bd-admin-cli</span
      >
    </div>
    <Menu :isCollapse="systemStore.isCollapse">
      <div v-for="menu in items" :key="menu.key">
        <SubMenu
          :menu="menu"
          :isCollapse="systemStore.isCollapse"
          v-if="menu.children && menu.children.length > 0"
        />
        <MenuItem v-else :menuItem="menu" />
      </div>
    </Menu>
  </div>
</template>
