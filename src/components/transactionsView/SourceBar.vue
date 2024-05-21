<template>
  <h3>Sources Bar</h3>
  <ul class="file-table">
    <li v-for="folder in sourceBarFileOrder" :key="folder.bankName">
      {{ folder.bankName }}
      <ul>
        <li v-for="bankFile in folder.bankFiles" :key="bankFile.fileName">
          <input
            type="checkbox"
            v-model="bankFile.show"
            :id="folder.bankName + bankFile.fileName"
            :value="bankFile.fileName"
          />
          <label :for="folder.bankName + bankFile.fileName">{{ bankFile.fileName }}</label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const sourceBarFileOrder = defineModel('sourceBarFileOrder')
</script>

<style>
#toggle-source-bar {
  display: inline-block;
}
</style>
