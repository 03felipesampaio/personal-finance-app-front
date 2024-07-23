<script setup>
import { ref, watch } from 'vue';
import { createFilter, applyFilter, getFilters } from '../../api'

const props = defineProps(['transactionsFields'])
// TODO Make the filtered transactions as a model insteado of emiting
// Also, when a transaction is changed, the filters must run again
const emit = defineEmits(['filter', 'removeFilter'])
const currentFilter = ref(null)

const filterNames = ref(await getFilters())

watch(currentFilter, async (newFilterName) => {
    if (newFilterName === null) return;

    const data = await applyFilter(newFilterName)
    emit('filter', data)
})

function getOptions(dataType) {
    // const newOptions = 
    const operations = [
        {
            option: 'equals',
            optionShow: 'Equals',
            dataTypes: ['numeric', 'date', 'string'],
            fields: [
                {
                    name: 'value',
                    nullable: false,
                    default: null,
                    value: null
                }
            ]
        },
        {
            option: 'gt',
            optionShow: 'Greater than',
            dataTypes: ['numeric', 'date'],
            fields: [
                {
                    name: 'value',
                    nullable: false,
                    default: null,
                    value: null
                }
            ]
        },
        {
            option: 'lt',
            optionShow: 'Less than',
            dataTypes: ['numeric', 'date'],
            fields: [
                {
                    name: 'value',
                    nullable: false,
                    default: null,
                    value: null
                }
            ]
        },
        // {
        //     option: 'range',
        //     optionShow: 'Range',
        //     dataTypes: ['numeric', 'date'],
        //     fields: [
        //         {
        //             name: 'start',
        //             nullable: true,
        //             default: null,
        //             value: null
        //         },
        //         {
        //             name: 'end',
        //             nullable: true,
        //             default: null,
        //             value: null
        //         }
        //     ]
        // },
        {
            option: 'isNull',
            optionShow: 'Is null',
            dataTypes: ['numeric', 'date', 'string'],
            fields: [
                {
                    name: 'value',
                    nullable: false,
                    default: false,
                    value: null
                }
            ]
        },
        {
            option: 'starts',
            optionShow: 'Starts with',
            dataTypes: ['string'],
            fields: [
                {
                    name: 'value',
                    nullable: false,
                    default: null,
                    value: null
                }
            ]
        },
        {
            option: 'ends',
            optionShow: 'Ends with',
            dataTypes: ['string'],
            fields: [
                {
                    name: 'value',
                    nullable: false,
                    default: null,
                    value: null
                }
            ]
        },
        {
            option: 'contains',
            optionShow: 'Contains',
            dataTypes: ['string'],
            fields: [
                {
                    name: 'value',
                    nullable: false,
                    default: false,
                    value: null
                }
            ]
        }
    ]

    return operations.filter(op => op.dataTypes.includes(dataType))
}


const filter = ref({
    name: '',
    restrictions: [
        {
            column: 'value',
            operation: getOptions('numeric').find(opt => opt.option === 'equals')
        }
    ]
})

function addRestriction() {
    filter.value.restrictions.push({
        column: 'value',
        operation: getOptions('numeric').find(opt => opt.option === 'equals')
    })
}

function removeRestriction(restriction) {
    filter.value.restrictions.splice(filter.value.restrictions.indexOf(restriction), 1)
}

function changeColumn(restriction) {
    // console.log(props.transactionsFields);
    restriction.operation = getOptions(props.transactionsFields.find(f => f.name === restriction.column).type)[0]
}

// function changeOperation(restriction, newOperation) {
//     // restriction.restriction = getOptions(props.transactionsFields.find(f => f.name === restriction.column).type).find(opt => opt.option === newOperation)
//     // @change="changeOperation(rest, $event.target.value)"
//     return
// }

function clearRestrictions() {
    filter.value.restrictions = []
}

async function sendFilter() {
    const payloadFilter = {
        name: filter.value.name,
        restrictions: filter.value.restrictions.map(rest => {
            return {
                col_name: rest.column,
                operation: rest.operation.option,
                negative: false,
                includes_null: false,
                value: rest.operation.fields[0].value
            }
        })
    }

    await createFilter(payloadFilter)
    filterNames.value = await getFilters()
    return filter
}

</script>

<template>
    <div class="main-pannel-item" id="filters-bar">
        <h3>Filters Bar</h3>
        <select id="filter-selection" v-model="currentFilter">
            <option v-for="name in filterNames" :key="name" :value="name">{{ name }}</option>
        </select>
        <button @click="$emit('removeFilter')">Clear filter</button>
        <div id="add-filters-menu">
            <h4>Add filters</h4>
            <input type="text" v-model="filter.name" />
            <div id="restrictions">
                <div class="restriction" v-for="(rest, i) in filter.restrictions" :key="i">
                    <select class="column-option-effect" v-model="rest.column" @change="changeColumn(rest)">
                        <option v-for="field in transactionsFields" :value="field.name" :key="field.name">
                            {{ field.showName }}
                        </option>
                    </select>
                    <select v-model="rest.operation">
                        <option
                            v-for="(operation) in getOptions(transactionsFields.find(f => f.name === rest.column).type)"
                            :key="operation.option" :value="operation">
                            {{ operation.optionShow }}
                        </option>
                    </select>
                    <input v-for="field in rest.operation.fields" type="text" :key="field" :placeholder="field.name"
                        v-model="field.value" />
                    <button @click="removeRestriction(rest)">x</button>
                </div>
            </div>
            <button @click="addRestriction">+</button>
        </div>
        <button @click="clearRestrictions">Clear</button>
        <button @click="sendFilter">Add</button>
        <!-- {{ filter }} -->
    </div>
</template>