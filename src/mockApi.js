import {getAllSourcesResponse, transactions} from './mocked_data/data.js'

function setupSourcesToSidePannel (response) {
    const fileTree = {}

    for (let source of response) {
        if (!(source.bank_name in fileTree)) {
            fileTree[source.bank_name] = {}
            // fileTree[source.bank_name] = []
        }

        if (!(source.source_type in fileTree[source.bank_name])) {
            fileTree[source.bank_name][source.source_type] = []
        }

        fileTree[source.bank_name][source.source_type].push({
        // fileTree[source.bank_name].push({
            sourceID: source.source_id,
            fileName: source.file_name,
            show: false
        })
    }

    return fileTree
}

function searchForTransactionsBySourceID (sourceID) {
    const sourceTransactions = transactions.filter(trn => trn.sourceId === sourceID);
    return sourceTransactions;
}

const mockedGetAllSourcesResponse = setupSourcesToSidePannel(getAllSourcesResponse);


export {mockedGetAllSourcesResponse, searchForTransactionsBySourceID, transactions}

