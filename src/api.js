// import 'dotenv/config'
import axios from 'axios';

// const url = process.env.BACKEND_URL
// const url = 'http://10.3.3.9:8088'
const url = 'http://127.0.0.1:8000'

async function getAllSources() {
    const response = await axios.get(url+'/sources')

    return response
}

async function setupSourcesToSidePannel (sources) {
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

async function getTransactionsFromSourceID (id) {
    const response = await axios.get(url+`/sources/${id}/transactions`)
    return response
}


async function tryRule (rule) {
    const response = await axios.post(url+'/rules/try', rule)
    // const response = await axios.post(url+'/rules/try', {
    //     "scope": "global",
    //     "sources": null,
    //     "pattern": "^.*Parcela (\\d{2})\\s+[dD]e\\s+(\\d{2})",
    //     "effects": {
    //         "currentInstallments": "$1",
    //         "totalInstallments": "$2"
    //     }
    // })
    // console.log(response.request);
    const data = await response.data
    return data
}


export {getAllSources, setupSourcesToSidePannel, getTransactionsFromSourceID, tryRule}