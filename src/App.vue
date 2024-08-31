<script setup>
import { RouterView } from 'vue-router'
import HeaderContent from '@/components/HeaderContent.vue'
</script>

<template>
  <HeaderContent></HeaderContent>
  <RouterView />
</template>

<style>
body {
  background-color: #c3f1dd;
}
</style>
