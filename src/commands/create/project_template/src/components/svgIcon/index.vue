<template>
  <svg v-if="getId(props.iconName)" :style="props.styleIcon" aria-hidden="true">
    <use :fill="textColor" :href="props.iconName" />
  </svg>
  <component v-else :is="props.iconName" :style="props.styleIcon" />
</template>
<style lang="scss" scoped></style>
