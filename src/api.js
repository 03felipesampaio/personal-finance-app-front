// import 'dotenv/config'
import axios from 'axios'

// const url = process.env.BACKEND_URL
// const url = 'http://10.3.3.9:8088'
const url = 'http://127.0.0.1:8000'

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

export { getAllSources, setupSourcesToSidePannel, getTransactionsFromSourceID, tryRule }
