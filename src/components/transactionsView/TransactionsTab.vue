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
      :transactions-fields="schemas.transactions"
      v-model:pattern="pattern"
      v-model:transactions="transactionsFiltered"
      v-model:show-only-matched="showOnlyMatched"
      @fetch-matched-transactions="(trn) => (matchedTransactions = trn)"
      class="transactions-menu-item"
    />
  </div>
  <TransactionsTable
    :table-columns="schemas.transactions"
    :patternMatchedTransactionIds="matchedTransactions.map((trn) => trn.id)"
    v-model:transactions="transactionsFiltered"
  />
  <!-- <div id="transactions-table-tab">
  </div> -->
</template>

<script setup>
import SourceBar from './SourceBar.vue'
import TransactionsTable from './TransactionsTable.vue'
import RulesBar from './RulesBar.vue'
// import {mockedGetAllSourcesResponse, transactions} from '../../mockApi'
import {
  schemas,
  getAllSources,
  setupSourcesToSidePannel,
  getTransactionsFromSourceID
} from '../../api'

import { computed, ref, onMounted, watch } from 'vue'

// Side Bar controllers
const sideBarOptions = {
  INVISIBLE: 0,
  FILES: 1,
  FILTERS: 2,
  RULES: 3
}

const selectedSideBar = ref(sideBarOptions.FILES)

function changeSideBarOption(option) {
  selectedSideBar.value = selectedSideBar.value !== option ? option : sideBarOptions.INVISIBLE
}

// Source bar [Fetching API]
const sourceBarFileOrder = ref([])

async function getSourcesFromAPI() {
  const response = await getAllSources()
  sourceBarFileOrder.value = await setupSourcesToSidePannel(response.data)
}

onMounted(() => {
  getSourcesFromAPI()
})

// IDs from all selected files
const checkedFiles = computed(() => {
  const checked = []

  for (let bank in sourceBarFileOrder.value) {
    for (let sourceType in sourceBarFileOrder.value[bank]) {
      for (let bankFile of sourceBarFileOrder.value[bank][sourceType])
        if (bankFile.show === true) {
          checked.push(bankFile.sourceID)
        }
    }
  }

  return checked
})

// Transactions fetching and filtering
const transactions = ref([])
const matchedTransactions = ref([])

watch(checkedFiles, async () => {
  for (const checkedFile of checkedFiles.value) {
    if (transactions.value.filter((trn) => trn.sourceId === checkedFile).length === 0) {
      const newTransactionsResponse = await getTransactionsFromSourceID(checkedFile)
      transactions.value.push(...newTransactionsResponse.data)
    }
  }
})

const transactionsFiltered = computed(() => {
  let filteredTransactions = transactions.value.filter((trn) =>
    checkedFiles.value.includes(trn.sourceId)
  )

  if (showOnlyMatched.value) {
    filteredTransactions = filteredTransactions.filter((trn) =>
      matchedTransactions.value.map((match) => match.id).includes(trn.id)
    )
  }

  for (const trn in filteredTransactions) {
    if (matchedTransactions.value.map((match) => match.id).includes(filteredTransactions[trn].id)) {
      const updatedTransaction = matchedTransactions.value.filter(
        (match) => match.id === filteredTransactions[trn].id
      )[0]
      filteredTransactions[trn] = updatedTransaction
    }
  }

  return filteredTransactions
})

const pattern = ref('')
const showOnlyMatched = ref(false)

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
