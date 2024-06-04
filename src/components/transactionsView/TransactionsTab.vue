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
    <RulesBar 
      v-if="selectedSideBar === sideBarOptions.RULES" 
      v-model:pattern="pattern" 
      v-model:transactions="transactionsFiltered"
      class="transactions-menu-item" 
    />
  </div>
  <TransactionsTable 
    :patternMatchedTransactionIds="matchedTransactionsIds"
    v-model:transactions="transactionsFiltered" 
  />
  <!-- <div id="transactions-table-tab">
  </div> -->
</template>

<script setup>
import SourceBar from './SourceBar.vue'
import TransactionsTable from './TransactionsTable.vue'
import RulesBar from './RulesBar.vue'
import {mockedGetAllSourcesResponse, transactions} from '../../mockApi'

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

const sourceBarFileOrder = ref(mockedGetAllSourcesResponse)

const checkedFiles = computed(() => {
  const checked = []

  for (let bank in sourceBarFileOrder.value) {
    for (let sourceType in (sourceBarFileOrder.value)[bank]) {
      for (let bankFile of (sourceBarFileOrder.value)[bank][sourceType])
        if (bankFile.show === true) {
          checked.push(bankFile.sourceID)
        }
    }
  }

  return checked
})

const selectedSideBar = ref(sideBarOptions.FILES)

const transactionsFiltered = computed(() => {
  const filteredTransactions = transactions.filter(trn => checkedFiles.value.includes(trn.sourceId))
  return filteredTransactions
})

const pattern = ref('')

const matchedTransactionsIds = computed(() => {
  const regex = RegExp('^' + pattern.value)
  let matched = []

  if (pattern.value !== '') {
    matched = transactionsFiltered.value.filter(trn => regex.test(trn.description))
  }

  return matched.map(trn => trn.id)
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

.transactions-side-bar-item img {
  height: 100%;
}

#transactions-menu {
  padding: 0px;
  background-color: #8d9eb3;
}

.transactions-menu-item {
  width: fit-content;
  padding: 0 5px;
  /* margin: 0 */
  /* background-color: #3f4a57; */
}

/* #transactions-side-bar button {
  display: block;
} */

/* #transactions-table-tab {
  flex-grow: 12;
} */
</style>
