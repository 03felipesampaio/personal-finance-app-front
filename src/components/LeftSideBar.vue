<template>
  <div id="left-side-bar">
    <div class="side-bar-item" @click="changeSideBarOption(sideBarOptions.IMPORT)">
      <!-- <a href="https://www.flaticon.com/free-icons/upload" title="upload icons">Upload icons created by Ilham Fitrotul Hayat - Flaticon</a> -->
      <img src="./icons/upload.png" alt="Upload or import files" />
    </div>
    <div class="side-bar-item" @click="changeSideBarOption(sideBarOptions.TRANSACTIONS)">
      <!-- <a href="https://www.flaticon.com/br/icones-gratis/planilha" title="planilha ícones">Planilha ícones criados por Circlon Tech - Flaticon</a> -->
      <img src="./icons/planilha.png" alt="Transactions" />
    </div>
    <div class="side-bar-item" @click="changeSideBarOption(sideBarOptions.ANALYTICS)">
      <!-- <a href="https://www.flaticon.com/br/icones-gratis/crescimento" title="crescimento ícones">Crescimento ícones criados por Freepik - Flaticon</a> -->
      <img src="./icons/negociacao.png" alt="Analytics" />
    </div>
    <!-- <button @click="changeSideBarOption(sideBarOptions.IMPORT)">Import</button>
    <button @click="changeSideBarOption(sideBarOptions.TRANSACTIONS)">Transactions</button>
    <button @click="changeSideBarOption(sideBarOptions.ANALYTICS)">Analytics</button> -->
  </div>
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
#left-side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  height: 100%;
  width: 60px;
  /* flex-grow: 1; */

  background-color: #292f36;
}

.side-bar-item {
  background-color: #4ecdc4;

  width: 40px;
  height: 40px;
  padding: 3px;

  border: solid 1px;
  border-radius: 15px;
}

#left-side-bar button {
  height: 40px;
  width: 40px;
}
</style>
