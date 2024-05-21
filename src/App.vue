<template>
  <div id="main-pannel">
    <div id="left-side-bar">
      <LeftSideBar :sideBarOptions="sideBarOptions" v-model:selectedSideBar="selectedSideBar" />
    </div>
    <div id="main-tab">
      <UploadFiles v-if="selectedSideBar === sideBarOptions.IMPORT" />
      <TransactionsTab v-if="selectedSideBar === sideBarOptions.TRANSACTIONS" />
      <AnalyticsTab v-if="selectedSideBar === sideBarOptions.VIEWS" />
    </div>
  </div>
</template>

<script setup>
import LeftSideBar from './components/LeftSideBar.vue'
import UploadFiles from './components/uploadView/UploadFilesTab.vue'
import TransactionsTab from './components/transactionsView/TransactionsTab.vue'
import AnalyticsTab from './components/analyticsView/AnalyticsTab.vue'

import { ref } from 'vue'

const sideBarOptions = {
  INVISIBLE: 0,
  IMPORT: 1,
  TRANSACTIONS: 2,
  ANALYTICS: 3
}

const selectedSideBar = ref(sideBarOptions.TRANSACTIONS)

// function changeSideBarOption(option) {
//   selectedSideBar.value = option
// }
</script>

<style>
#main-pannel {
  display: flex;
}

#left-side-bar {
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 20px;
  flex-grow: 1;
}

#main-tab {
  flex-grow: 10;
  display: flex;
}

.main-view {
  flex-grow: 10;
}
</style>
