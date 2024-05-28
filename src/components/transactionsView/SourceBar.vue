<template>
  <div id="file-table">
    <h3>Sources Bar</h3>
    <ul class="bank-names-list" >
      <li v-for="(folder, bankName) in sourceBarFileOrder" :key="bankName">
        {{ bankName }}
        <ul>
          <li v-for="(files, sourceType) in folder" :key="bankName+sourceType">
            {{ sourceType }}
            <ul>
              <li v-for="bankFile in files" :key="bankFile.sourceID">
                <input
                  type="checkbox"
                  v-model="bankFile.show"
                  :id="'sourceFile'+bankFile.sourceID"
                  :value="bankFile.fileName"
                />
                <label :for="'sourceFile'+bankFile.sourceID">{{ bankFile.fileName }}</label>
              </li>
            </ul>
          </li>
        </ul>
        
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sourceBarFileOrder = defineModel('sourceBarFileOrder')
</script>

<style>
#toggle-source-bar {
  display: inline-block;
}

#file-table ul{
  list-style-type: none;
  padding-left: 5px;
  /* font-size: 90%; */
  font-size: 13px;
}
</style>
