// import 'dotenv/config'
import axios from 'axios';

// const url = process.env.BACKEND_URL
const url = 'http://10.3.3.9:8088'

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

// console.log( getAllSources() );


// console.log( setupSourcesToSidePannel(  getAllSources() ));

export {getAllSources, setupSourcesToSidePannel, getTransactionsFromSourceID}
// const hey = 'hey'
// export {hey}