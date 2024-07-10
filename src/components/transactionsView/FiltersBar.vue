<script setup>
import { ref } from 'vue';

defineProps(['transactionsFields'])

function getOptions(dataType) {
    const options = {
        'numeric': [
            {
                option: 'equals',
                fields: [
                    {
                        name: 'value',
                        type: 'numeric',
                        nullable: false,
                        default: null,
                        value: null
                    }
                ]
            },
            {
                option: 'range',
                fields: [
                    {
                        name: 'start',
                        type: 'numeric',
                        nullable: false,
                        default: null,
                        value: null
                    },
                    {
                        name: 'end',
                        type: 'numeric',
                        nullable: false,
                        default: null,
                        value: null
                    }
                ]
            },
            {
                option: 'isBlank',
                fields: [
                    {
                        name: 'value',
                        type: 'boolean',
                        nullable: false,
                        default: false,
                        value: null
                    }
                ]
            }
        ],
        'datetime': [
            {
                option: 'equals',
                fields: [
                    {
                        name: 'value',
                        type: 'datetime',
                        nullable: false,
                        default: null,
                        value: null
                    }
                ]
            },
            {
                option: 'range',
                fields: [
                    {
                        name: 'start',
                        type: 'datetime',
                        nullable: false,
                        default: null,
                        value: null
                    },
                    {
                        name: 'end',
                        type: 'datetime',
                        nullable: false,
                        default: null,
                        value: null
                    }
                ]
            },
            {
                option: 'isBlank',
                fields: [
                    {
                        name: 'value',
                        type: 'boolean',
                        nullable: false,
                        default: false,
                        value: null
                    }
                ]
            }
        ],
        'string': [
            {
                option: 'startsWith',
                fields: [
                    {
                        name: 'value',
                        type: 'datetime',
                        nullable: false,
                        default: null,
                        value: null
                    }
                ]
            },
            {
                option: 'endsWith',
                fields: [
                    {
                        name: 'start',
                        type: 'datetime',
                        nullable: false,
                        default: null,
                        value: null
                    },
                    {
                        name: 'end',
                        type: 'datetime',
                        nullable: false,
                        default: null,
                        value: null
                    }
                ]
            },
            {
                option: 'contains',
                fields: [
                    {
                        name: 'value',
                        type: 'boolean',
                        nullable: false,
                        default: false,
                        value: null
                    }
                ]
            },
            {
                option: 'isBlank',
                fields: [
                    {
                        name: 'value',
                        type: 'boolean',
                        nullable: false,
                        default: false,
                        value: null
                    }
                ]
            }
        ]
    }

    return options[dataType]
}

const filter = ref({
    name: '',
    restrictions: [
        {
            column: 'value',
            restriction: getOptions('numeric').find(opt => opt.option === 'equals')
        }
    ]
})

function addRestriction() {
    filter.value.restrictions.push({
        column: 'value',
        restriction: getOptions('numeric').find(opt => opt.option === 'equals')
    })
}

function removeRestriction(restriction) {
  filter.value.restrictions.splice(filter.value.restrictions.indexOf(restriction), 1)
}

function changeColumn(restriction) {
    restriction.restriction = getOptions(restriction.column !== 'date' ? 'numeric': 'datetime')[0]
}

function changeOperation(restriction, newOperation) {
    restriction.restriction = getOptions(restriction.column !== 'date' ? 'numeric': 'datetime').find(opt => opt.option === newOperation)
}

function clearRestrictions() {
    filter.value.restrictions = []
}

function sendFilter() {
    return filter
}

</script>

<template>
    <div class="main-pannel-item" id="filters-bar">
        <h3>Filters Bar</h3>

        <div id="add-filters-menu">
            <h4>Add filters</h4>
            <div id="restrictions">
                <div class="restriction" v-for="(rest, i) in filter.restrictions" :key="i">
                    <select class="column-option-effect" v-model="rest.column" @change="changeColumn(rest)">
                        <option v-for="field in transactionsFields" :value="field" :key="field">
                            {{ field }}
                        </option>
                    </select>
                    <select @change="changeOperation(rest, $event.target.value)" v-model="rest.restriction.option">
                        <option v-for="(operation) in getOptions(rest.column !== 'date' ? 'numeric': 'datetime')" :key="operation.option" :value="operation.option">
                            {{ operation.option }}
                        </option>
                    </select>
                    <input v-for="field in rest.restriction.fields" type="text" :key="field" :placeholder="field.name" v-model="field.value" />
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