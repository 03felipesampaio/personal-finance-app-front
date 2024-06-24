<template>
  <div class="main-pannel-item" id="rule-bar">
    <h3>Rules Bar</h3>
    <div id="current-transactions-rules">
      <h4>Current Rules</h4>
      <table>
        <thead>
          <th>Pattern</th>
          <th>Effect</th>
          <th>Up/Down</th>
        </thead>
        <tr>
          <td>"Desc (\d+)"</td>
          <td>{"Place" : "Nowhere"}</td>
          <td>
            <button>Up</button>
            <button>Down</button>
          </td>
        </tr>
        <tr>
          <td>"Desc (\d+)"</td>
          <td>{"Place" : "Nowhere"}</td>
          <td>
            <button>Up</button>
            <button>Down</button>
          </td>
        </tr>
        <tr>
          <td>"Desc (\d+)"</td>
          <td>{"Place" : "Nowhere"}</td>
          <td>
            <button>Up</button>
            <button>Down</button>
          </td>
        </tr>
        <tr>
          <td>"Desc (\d+)"</td>
          <td>{"Place" : "Nowhere"}</td>
          <td>
            <button>Up</button>
            <button>Down</button>
          </td>
        </tr>
      </table>
    </div>
    <div id="add-rules-menu">
      <h4>Add rules</h4>
      <!-- <label for="add-rule-pattern">Add rule pattern for description</label> -->
      <p>Scope</p>
      <select v-model="rule.scope">
        <option value="global">Global</option>
        <option value="files">Files</option>
      </select>
      <select v-if="rule.scope === 'files'" v-model="rule.sources">
        <option value="nubank-statements">Nubank statements</option>
        <option value="nubank-bills">Nubank bills</option>
        <option value="inter-statements">Inter statements</option>
        <option value="inter-bills">Inter bills</option>
      </select>
      <input type="text" placeholder="Pattern" id="add-rule-pattern" v-model="rule.pattern" />
      <input type="checkbox" id="show-only-matched" v-model="showOnlyMatched" />
      <label for="show-only-matched">Show only matched transactions</label>
      <!-- <label for=""></label> -->
      <p>Add side effects</p>
      <div id="side-effects">
        <div v-for="(effectInput, i) in rule.effects" class="side-effect" :key="'effect_' + i">
          <select class="column-option-effect" v-model="effectInput.column">
            <option value="place">Place</option>
            <option value="category">Category</option>
          </select>
          <input type="text" placeholder="Effect" class="rule-effect" v-model="effectInput.value" />
          <button @click="removeEffectInput(effectInput)">x</button>
        </div>

        <button @click="addEffectInput">+</button>
      </div>
      <button @click="rule = getCleanRule()">Clear</button>
      <button @click="addRuleAndEffects">Add</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { tryRule } from '../../api'

// const columns = ['Place']

const pattern = defineModel('pattern')
const showOnlyMatched = defineModel('showOnlyMatched')
const emit = defineEmits(['create-rule', 'fetchMatchedTransactions'])

const rule = ref(getCleanRule())

function getCleanRule() {
  pattern.value = ''

  return {
    scope: null,
    sources: null,
    pattern: pattern,
    effects: [
      {
        column: null,
        value: null
      }
    ]
  }
}

function addEffectInput() {
  rule.value.effects.push({
    column: null,
    value: null
  })
}

function removeEffectInput(effectInput) {
  rule.value.effects.splice(rule.value.effects.value.indexOf(effectInput), 1)
}

watch(
  rule,
  async () => {
    if (rule.value.scope === null || rule.value.pattern === '') return

    const ruleCopy = { ...rule.value }

    ruleCopy.pattern = '^' + ruleCopy.pattern
    ruleCopy.effects = ruleCopy.effects.reduce((acc, effect) => {
      if (effect.column !== null && effect.value !== null) acc[effect.column] = effect.value
      return acc
    }, {})

    try {
      const matchedTransactions = await tryRule(ruleCopy)
      emit('fetchMatchedTransactions', matchedTransactions)
    } catch (error) {
      // TODO Add a red highlight to invalid fields
      console.log('Invalid parameter in rule creation')
    }
  },
  { deep: true }
)

function addRuleAndEffects() {
  if (pattern.value.length === 0) {
    throw new Error("Rule can't be blank")
  }

  if (
    rule.value.effects.filter((effect) => effect.column === null || effect.value === null).length >
    0
  ) {
    throw new Error('There is a side effect with empty value or column')
  }

  emit('create-rule', rule)
  rule.value = getCleanRule()
}
</script>

<style scoped>
/* #add-rules-menu input {
  display: block;
} */

#add-rule-pattern {
  display: block;
  width: 95%;
}

.side-effect {
  display: flex;
  justify-content: space-between;
}

/* .column-option-effect {
  display: inline;
} */

.rule-effect {
  width: 60%;
}
</style>
