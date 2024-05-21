<template>
  <button @click="changeSideBarOption(sideBarOptions.IMPORT)">Import</button>
  <button @click="changeSideBarOption(sideBarOptions.TRANSACTIONS)">Transactions</button>
  <button @click="changeSideBarOption(sideBarOptions.ANALYTICS)">Analytics</button>
</template>

<script setup>
const selectedSideBar = defineModel('selectedSideBar')

const props = defineProps({
  sideBarOptions: {
    type: Object,
    required: true
  }
})

function changeSideBarOption(option) {
  selectedSideBar.value = selectedSideBar.value !== option ? option : props.sideBarOptions.INVISIBLE
}
</script>

<style>

</style>
