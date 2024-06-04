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
      <select v-model="ruleScope">
        <option value="global">Global</option>
        <option value="files">Files</option>
      </select>
      <select v-if=" ruleScope === 'files' " v-model=" sourceType ">
        <option value="nubank-statements">Nubank statements</option>
        <option value="nubank-bills">Nubank bills</option>
        <option value="inter-statements">Inter statements</option>
        <option value="inter-bills">Inter bills</option>
      </select>
      <input type="text" placeholder="Pattern" id="add-rule-pattern" v-model="pattern" />
      <!-- <label for=""></label> -->
      <p>Add side effects</p>
      <div id="side-effects">
        <div v-for="effectInput in effects" class="side-effect" >
          <select class="column-option-effect" v-model="effectInput.column">
            <option value="place">Place</option>
            <option value="category">Category</option>
          </select>
          <input type="text" placeholder="Effect" class="rule-effect" v-model="effectInput.value">
          <button @click="removeEffectInput(effectInput)">x</button>

        </div>
        <button @click="addEffectInput">+</button>
      </div>
      <!-- <input type="checkbox" id="show"> -->

      <button @click="addRuleAndEffects">Add</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// const columns = ['Place']

const emit = defineEmits(['create-rule'])

const ruleScope = ref('global')
const sourceType = ref(null)
const pattern = defineModel('pattern')

const effects = ref([{
  'column': null,
  'value': null
}])


function addEffectInput() {
  effects.value.push({
    'column': null,
    'value': null
  })
}

function removeEffectInput(effectInput) {
  effects.value.splice(effects.value.indexOf(effectInput), 1)
}


function addRuleAndEffects() {
  if (pattern.length === 0 ) {
    throw new Error("Rule can't be blank")
  }

  if ( effects.value.filter(effect => effect.column === null || effect.value === null).length > 0 ) {
    throw new Error('There is a side effect with empty value or column')
  }
  
  const newRule = {
    'scope': ruleScope.value,
    'sourceType': sourceType.value,
    'pattern': pattern.value,
    'effects': effects.value.map(eff => eff),
  };

  ruleScope.value = 'global';
  sourceType.value = null;
  pattern.value = '';
  effects.value = [{
    'column': null,
    'value': null
  }];

  emit('create-rule', newRule);
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
