<template>
  <div id="file-table">
    <h3>Sources Bar</h3>
    <div id="sources-list">
      <ul class="bank-names-list" >
        <li v-for="(folder, bankName) in sourceBarFileOrder" :key="bankName">
          {{ bankName }}
          <ul>
            <li v-for="(files, sourceType) in folder" :key="bankName+sourceType">
              {{ sourceType }}
              <ul>
                <li v-for="bankFile in files" :key="'source' + bankFile.id">
                  <input
                    type="checkbox"
                    v-model="bankFile.show"
                    @click="$emit('toggle-source', bankFile)"
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
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['toggle-source'])

const sourceBarFileOrder = defineModel('sourceBarFileOrder')
</script>

<style>
#toggle-source-bar {
  display: inline-block;
}

#sources-list {
  height: 90vh;
  overflow-y: scroll; 
}

#file-table ul{
  list-style-type: none;
  padding-left: 5px;
  /* font-size: 90%; */
  font-size: 13px;
}
</style>
