// import 'dotenv/config'
import axios from 'axios'

// const url = process.env.BACKEND_URL
// const url = 'http://10.3.3.9:8088'
const url = 'http://127.0.0.1:8000'

let schemas = {
  sources: [
    {
      name: 'id',
      showName: 'ID',
      type: 'numeric',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'type',
      showName: 'Type',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'bankName',
      showName: 'Bank name',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'startDate',
      showName: 'Start date',
      type: 'date',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'endDate',
      showName: 'End date',
      type: 'date',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'fileName',
      showName: 'File name',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'fileHash',
      showName: 'File hash',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'accountNumber',
      showName: 'Account number',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'referenceMonth',
      showName: 'Reference month',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'billValue',
      showName: 'Bill value',
      type: 'numeric',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
  ],
  transactions: [
    {
      name: 'sourceId',
      showName: 'Source ID',
      type: 'numeric',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'id',
      showName: 'ID',
      type: 'numeric',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'date',
      showName: 'Date',
      type: 'date',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'type',
      showName: 'Type',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'description',
      showName: 'Description',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'place',
      showName: 'Place',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'category',
      showName: 'Category',
      type: 'string',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'value',
      showName: 'Value',
      type: 'numeric',
      nullable: false,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'currentInstallments',
      showName: 'Current Installments',
      type: 'numeric',
      nullable: true,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    },
    {
      name: 'totalInstallments',
      showName: 'Total Installments',
      type: 'numeric',
      nullable: true,
      showOnTable: true,
      showOnRuleOptions: true,
      showOnFilterOptions: true
    }
  ]
};


// let schemas = {}

// async function getSchemasFromBackEnd() {
//   const response = await axios.get(url + '/setup')
//   const data = await response.data

//   schemas = data

//   return response
// }

// ;(async () => {
//   await getSchemasFromBackEnd()
// })()

async function getAllSources() {
  const response = await axios.get(url + '/sources')

  return response
}

async function setupSourcesToSidePannel(sources) {
  const fileTree = {}

  for (let source of sources) {
    if (!(source.bankName in fileTree)) {
      fileTree[source.bankName] = {}
    }

    if (!(source.type in fileTree[source.bankName])) {
      fileTree[source.bankName][source.type] = []
    }

    fileTree[source.bankName][source.type].push({
      sourceID: source.id,
      fileName: source.fileName,
      show: true
    })
  }

  return fileTree
}

async function getTransactionsFromSourceID(id) {
  const response = await axios.get(url + `/sources/${id}/transactions`)
  return response
}

async function tryRule(rule) {
  let response = null
  let data = null

  try {
    response = await axios.post(url + '/rules/try', rule)
    data = await response.data
  } catch (error) {
    if (error.response.status === 422) {
      throw new Error('Invalid pattern')
    }

    data = []
  }

  return data
}

async function createRule(rule) {
  let response = null
  let data = null

  try {
    response = await axios.post(url + '/rules', rule)
    data = await response.data
  } catch (error) {
    if (error.response.status === 422) {
      throw new Error('Invalid pattern')
    }

    data = []
  }

  return data
}

// Analytics
async function getMonthlyBalance() {
  let response = null
  let data = null

  response = await axios.get(url + '/analytics/ballance')
  data = await response.data

  return data
}

async function getBillsValuesByBank() {
  let response = null
  let data = null

  response = await axios.get(url + '/analytics/bills')
  data = await response.data

  return data
}

async function getExpensesByCategory() {
  let response = null
  let data = null

  response = await axios.get(url + '/analytics/expenses/category')
  data = await response.data

  return data
}


async function filterTransactions(payload) {
  let response = null
  let data = null

  response = await axios.post(url + '/filters', payload)
  data = await response.data

  return data
}

export {
  schemas,
  getAllSources,
  setupSourcesToSidePannel,
  getTransactionsFromSourceID,
  tryRule,
  createRule,
  getMonthlyBalance,
  getBillsValuesByBank,
  getExpensesByCategory,
  filterTransactions
}
