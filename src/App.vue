<script setup lang="ts">
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

main {
  max-width: 100vw;
  min-height: 100vh;
  /* background-color: rgb(27, 27, 27); */
  background-color: #1e1e1f;
  scrollbar-gutter: stable;
  overflow-x: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 5vh;
}
</style>
