// import 'dotenv/config'
import axios from 'axios'

// const url = process.env.BACKEND_URL
// const url = 'http://10.3.3.9:8088'
const url = 'http://127.0.0.1:8000'

let schemas = {
  sources: [
    'id',
    'type',
    'bankName',
    'startDate',
    'endDate',
    'fileName',
    'fileHash',
    'accountNumber',
    'referenceMonth',
    'billValue'
  ],
  transactions: [
    'sourceId',
    'id',
    'date',
    'type',
    'description',
    'place',
    'category',
    'value',
    'currentInstallments',
    'totalInstallments'
  ],
  rules: [null, null, null, null]
}

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
      show: false
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

export {
  schemas,
  getAllSources,
  setupSourcesToSidePannel,
  getTransactionsFromSourceID,
  tryRule,
  createRule,
  getMonthlyBalance,
  getBillsValuesByBank,
  getExpensesByCategory
}
