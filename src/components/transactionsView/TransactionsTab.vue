<template>
  <div id="transactions-side-bar">
    <div class="transactions-side-bar-item" @click="changeSideBarOption(sideBarOptions.FILES)">
      <!-- <a href="https://www.flaticon.com/br/icones-gratis/pasta" title="pasta ícones">Pasta ícones criados por maswan - Flaticon</a> -->
      <img src="../icons/file-and-folder.png" alt="Filter files" />
    </div>
    <div class="transactions-side-bar-item" @click="changeSideBarOption(sideBarOptions.FILTERS)">
      <!-- <a href="https://www.flaticon.com/br/icones-gratis/filtro" title="filtro ícones">Filtro ícones criados por berkahicon - Flaticon</a> -->
      <img src="../icons/filtro.png" alt="Filters" />
    </div>
    <div class="transactions-side-bar-item" @click="changeSideBarOption(sideBarOptions.RULES)">
      <!-- <a href="https://www.flaticon.com/br/icones-gratis/regras" title="regras ícones">Regras ícones criados por Muhammad_Usman - Flaticon</a> -->
      <img src="../icons/pros-e-contras.png" alt="Rules" />
    </div>
    <!-- <button @click="changeSideBarOption(sideBarOptions.FILES)">Source Files</button>
    <button @click="changeSideBarOption(sideBarOptions.FILTERS)">Filters</button>
    <button @click="changeSideBarOption(sideBarOptions.RULES)">Rules</button> -->
  </div>
  <div id="transactions-menu">
    <SourceBar
      v-if="selectedSideBar === sideBarOptions.FILES"
      v-model:sourceBarFileOrder="sourceBarFileOrder"
      class="transactions-menu-item"
    />
    <RulesBar v-if="selectedSideBar === sideBarOptions.RULES" class="transactions-menu-item" />
  </div>
  <div id="transactions-table-tab">
    <TransactionsTable :checkedFiles="checkedFiles" v-model:transactions="transactionsFiltered" />
  </div>
</template>

<script setup>
import SourceBar from './SourceBar.vue'
import TransactionsTable from './TransactionsTable.vue'
import RulesBar from './RulesBar.vue'

import { computed, ref } from 'vue'

const sideBarOptions = {
  INVISIBLE: 0,
  FILES: 1,
  FILTERS: 2,
  RULES: 3
}

function changeSideBarOption(option) {
  selectedSideBar.value = selectedSideBar.value !== option ? option : sideBarOptions.INVISIBLE
}

const checkedFiles = computed(() => {
  const checked = []

  for (let bank of sourceBarFileOrder.value) {
    for (let bankFile of bank.bankFiles) {
      if (bankFile.show === true) {
        checked.push(bankFile.id)
      }
    }
  }

  return checked
})

const selectedSideBar = ref(sideBarOptions.FILES)

const transactions = ref([
  { fileId: 1, id: 0, place: 'Some 1', description: 'Some Desc', value: 54.3 },
  { fileId: 1, id: 1, place: 'Some 1', description: 'Some Desc', value: 54.3 },
  { fileId: 2, id: 2, place: 'Some 2', description: 'Some Desc', value: 54.3 },
  { fileId: 2, id: 3, place: 'Some 2', description: 'Some Desc', value: 54.3 },
  { fileId: 3, id: 4, place: 'Some 3', description: 'Some Desc', value: 54.3 },
  { fileId: 3, id: 5, place: 'Some 3', description: 'Some Desc', value: 54.3 },
  { fileId: 4, id: 6, place: 'Some 4', description: 'Some Desc', value: 54.3 },
  { fileId: 4, id: 7, place: 'Some 4', description: 'Some Desc', value: 54.3 }
])

const sourceBarFileOrder = ref([
  {
    bankName: 'Inter',
    bankFiles: [
      {
        fileName: 'ABC.ofx',
        show: true,
        id: 1
      },
      {
        fileName: 'CBA.ofx',
        show: false,
        id: 2
      }
    ]
  },
  {
    bankName: 'Nubank',
    bankFiles: [
      {
        fileName: 'ABC.pdf',
        show: false,
        id: 3
      },
      {
        fileName: 'CBA.pdf',
        show: true,
        id: 4
      }
    ]
  }
])

const transactionsFiltered = computed(() => {
  const filteredTransactions = []

  for (let trn of transactions.value) {
    if (checkedFiles.value.includes(trn.fileId)) {
      filteredTransactions.push(trn)
    }
  }

  return filteredTransactions
})
// defineProps()
</script>

<style>
#transactions-side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  height: 100%;
  width: 60px;
  /* flex-grow: 1; */

  background-color: #3f4a57;
}

.transactions-side-bar-item {
  background-color: #ffe66d;

  width: 40px;
  height: 40px;
  padding: 3px;

  border: solid 1px;
  border-radius: 15px;
}

#transactions-menu {
  padding: 10px;
}

.transactions-menu-item {
  width: 150px;
}

/* #transactions-side-bar button {
  display: block;
} */

#transactions-table-tab {
  flex-grow: 12;
}
</style>
