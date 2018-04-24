<template>
    <div>
        <p class="header-text">Upload Customer Data</p>
        <div>
            <bui-file-upload
            postURL=""
            successMessageFormatter="function successMessageFormatter() {
	            return 'winning!';
	        }"
            errorMessageFormatter="function errorMessageFormatter() {
	            return 'fail!';
	        }"
            :checkUploaded="files"
            >
                <div slot="header">Add files</div>
                <div slot="instructions">
                    <bui-icon icon="px-utl:upload"></bui-icon> Drag multiple files here.
                </div>
                <div slot="help-block">Space for your help text.</div>
            </bui-file-upload>
        </div>
    </div>
</template>

<script>
import BuiFileUpload from './bui/BuiFileUpload'
import BuiIcon from 'build-ui-x/src/BuiIcon.vue'
import checkFiles from '../assets/files.json'

export default {
  name: 'prepare-data',
  data () {
    return {
      itemsAdded: '',
      files: checkFiles
    }
  },
  components: {
    BuiFileUpload,
    BuiIcon
  }
}
</script>

<style>
.header-text{
    color: white;
    padding: 14px;
    margin-left: 10px;
    font-size: 17px;
}
</style>
