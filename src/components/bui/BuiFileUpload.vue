<template>
    <div class="uploadBox">
        <h3>{{headerMessage}}</h3>
        <form role="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <div class="uploadBoxMain" v-if="!itemsAdded">
                <div class="form-group">
                    <div class="dropArea" @ondragover="onChange" :class="dragging ? 'dropAreaDragging' : ''" @dragenter="dragging=true" @dragend="dragging=false" @dragleave="dragging=false">
                        <h3 class="dropMsg">{{dropAreaPrimaryMessage}}</h3>
                        <input type="file" id="items" name="items[]" required single @change="onChange">
                        <p class="help-block">{{dropAreaSecondaryMessage}}</p>
                    </div>
                </div>
            </div>
            <div class="uploadBoxMain border-style" v-else>
                <p class="names"><strong>{{fileNameMessage}}</strong></p>
                <ol class="file-items">
                    <li v-for="id in itemsData">
                        {{ id.itemsNames }} - {{ id.itemsSizes }}
                    </li>
                </ol>
            </div>
            <div style="display:inline-flex;margin-top: 2%;width: 45%;">
                <input class="" style="color: white;" type="file" id="selected-file" name="items[]" required single @change="onChange">
                <div style="margin-left: 30%;">
                  <button type="submit" @click="displayModal" class="btn btn-primary btn-black btn-round" :disabled="itemsAdded < minItems || itemsAdded > maxItems">
                      {{uploadButtonMessage}}
                  </button>
                  <button type="button" class="btn btn-default btn-round" @click="removeItems">{{cancelButtonMessage}}</button>
                </div>
            </div>
            <br>
           </form>

        <modal :value="showModal" effect="fade" large @closed="modalClosed">
            <h4> {{ modalContent.modalHeader }} </h4>
            <span> {{ modalContent.modalData }} </span>
            <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-primary">{{ modalContent.modalButton }} </button>
            </div>
        </modal>
    </div>
</template>

<script>
require('es6-promise').polyfill()
import Modal from '../../../node_modules/build-ui-x/src/Modal'
export default {
  props: {
    checkUploaded: {
      type: Object
      // default: []
    },
    postURL: {
      type: String,
      required: true
    },
    minItems: {
      type: Number,
      default: 1
    },
    maxItems: {
      type: Number,
      default: 30
    },
    method: {
      type: String,
      default: 'post'
    },
    postMeta: {
      type: [String, Array, Object],
      default: ''
    },
    postData: {
      type: [Object],
      default: () => {}
    },
    postHeader: {
      type: [Object],
      default: () => {}
    },
    headerMessage: {
      type: String,
      default: ''
    },
    dropAreaPrimaryMessage: {
      type: String,
      default: 'Drag a file to upload'
    },
    dropAreaSecondaryMessage: {
      type: String,
      default: ''
    },
    fileNameMessage: {
      type: String,
      default: 'Names'
    },
    fileSizeMessage: {
      type: String,
      default: 'Sizes'
    },
    removeFileMessage: {
      type: String,
      default: 'Remove files'
    },
    uploadButtonMessage: {
      type: String,
      default: 'Upload'
    },
    cancelButtonMessage: {
      type: String,
      default: 'Cancel'
    },
    fileUploadErrorMessage: {
      type: String,
      default: 'An error has occurred'
    },
    minFilesErrorMessage: {
      type: String,
      default: 'Minimum files that need to be added to uploader'
    },
    maxFilesErrorMessage: {
      type: String,
      default: 'Maximum files that can be added to uploader'
    },
    retryErrorMessage: {
      type: String,
      default: 'Please remove the files and try again.'
    },
    httpMethodErrorMessage: {
      type: String,
      default:
        'This HTTP method is not allowed. Please use either "put" or "post" methods.'
    },
    showHttpMessages: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Modal
  },
  data () {
    return {
      showModal: false,
      modalContent: {
        modalHeader: String,
        modalData: String,
        modalButton: String
      },
      dragging: false,
      items: [],
      itemsAdded: '',
      itemsNames: String,
      itemsSizes: String,
      itemsData: [],
      itemsTotalSize: '',
      formData: '',
      successMsg: '',
      errorMsg: ''
    }
  },
  methods: {
    displayModal () {
      var flag = true
      if (this.checkUploaded !== undefined || this.checkUploaded.length > 0) {
        for (let x in this.checkUploaded.fileNames) {
          if (this.itemsNames === this.checkUploaded.fileNames[x]) {
            this.modalContent.modalHeader = 'File already exists!!'
            this.modalContent.modalData = ''
            this.modalContent.modalButton = 'Replace File'
            this.showModal = true
            flag = false
            break
          }
        }
        if (flag) {
          this.modalContent.modalHeader = 'File Uploaded Successfully..'
          this.modalContent.modalData = ''
          this.modalContent.modalButton = 'Close'
          this.showModal = true
        }
      } else {
        this.modalContent.modalHeader = 'File Uploaded Successfully..'
        this.modalContent.modalData = ''
        this.modalContent.modalButton = 'Close'
        this.showModal = true
      }
    },
    modalClosed () {
      this.showModal = false
    },
    bytesToSize (bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return 'n/a'
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      if (i === 0) return bytes + ' ' + sizes[i]
      return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
    },
    onChange (e) {
      this.successMsg = ''
      this.errorMsg = ''
      this.formData = new FormData()
      let files = e.target.files || e.dataTransfer.files
      this.itemsAdded = files.length
      let fileSizes = 0
      let temVar = {
        'itemsNames': String,
        'itemsSizes': String
      }
      for (let x in files) {
        if (!isNaN(x)) {
          this.items = e.target.files[x] || e.dataTransfer.files[x]
          this.itemsNames = files[x].name
          this.itemsSizes = this.bytesToSize(files[x].size)
          temVar.itemsNames = this.itemsNames
          temVar.itemsSizes = this.itemsSizes
          this.itemsData.push(JSON.parse(JSON.stringify(temVar)))
          fileSizes += files[x].size
          this.formData.append('items[]', this.items)
        }
      }
      this.itemsTotalSize = this.bytesToSize(fileSizes)
    },
    removeItems () {
      this.items = ''
      this.itemsAdded = ''
      this.itemsNames = ''
      this.itemsSizes = ''
      this.itemsTotalSize = ''
      this.dragging = false
      this.itemsData = []
      document.getElementById('selected-file').value = ''
    },
    onSubmit () {
      if (
        (typeof this.postMeta === 'string' && this.postMeta !== '') ||
        (typeof this.postMeta === 'object' &&
          Object.keys(this.postMeta).length > 0)
      ) {
        this.formData.append('postMeta', this.postMeta)
      }

      if (
        typeof this.postData === 'object' &&
        this.postData !== null &&
        Object.keys(this.postData).length > 0
      ) {
        for (var key in this.postData) {
          this.formData.append(key, this.postData[key])
        }
      }
      if (this.showHttpMessages) this.errorMsg = this.httpMethodErrorMessage
      this.removeItems()
    }
  }
}
</script>

<style>
.choose-file{
    margin-left: -442px;
    position: absolute;
    border-color: transparent;
    color: white;
}
.border-style{
    width: 100%;
    height: 165px;
    border: 2px dashed #23343f;
}
.names{
    color: white;
    margin-left: 3%;
}
.file-items{
    margin-top: -2%;
    color: white;
    margin-left: 3%;
}
form{
    margin-top: -2%;
}
.dropMsg{
    color: #687379;
    font-size: 20px;
    position: absolute;
    margin-top: -6%;
    margin-left: 35%;
}
.uploadBox {
  position: relative;
  background: transparent;
  padding: 0 1em 1em 1em;
  margin: 1em;
  margin-top: -4%;
  margin-left: 1%;
}
.uploadBox h3 {
  padding-top: 1em;
}
.uploadBox .uploadBoxMain {
  width: 584px;
  height: 147px;
  position: relative;
  margin-bottom: 1em;
  margin-right: 1em;
}
.uploadBox .dropArea {
  position: relative;
  width: 100%;
  height: 165px;
  border: 2px dashed #23343f;
  text-align: center;
  font-size: 2em;
  padding-top: 80px;
  color: #687379;
}
.uploadBox .dropArea input {
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.uploadBox .loader {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: 0.9;
}
.uploadBox .loaderImg {
  border: 9px solid #eee;
  border-top: 9px solid #00adce;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
.uploadBox .errorMsg {
  color: #a94442;
  font-size: 15px;
}
.uploadBox .successMsg {
  font-size: 2em;
  color: #3c763d;
}
</style>
