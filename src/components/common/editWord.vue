<template>
  <q-dialog
    v-model="showDialog"
    prevent-close
    @ok="onOk"
    @cancel="onCancel"
    @show="onShow"
    @hide="onHide"
  >
    <span slot="title">Are you sure?</span>

    <!-- This or use "message" prop on <q-dialog> -->
    <span slot="message">Please confirm if you would like to delete this item.</span>

    <div slot="body">
      <q-field
        label="Word:"
      >
        <q-input v-model="editWord.word" readonly disabled />
      </q-field>
      <q-field
        label="Definition:"
      >
        <q-input v-model="editWord.definition" />
      </q-field>
      <q-field
        label="Examples:"
      >
        <q-input type="textarea" v-model="editWord.examples" />
      </q-field>
    </div>

    <template slot="buttons" slot-scope="props">
      <q-btn flat color="primary" label="Confirm" @click="choose(props.ok)" />
      <q-btn flat label="Cancel" @click="props.cancel" />
    </template>
  </q-dialog>
</template>

<script>
export default {
  name: 'UserConfirmDialog',
  props: ['item'],
  data () {
    return {
      editWord: {
        word: '',
        definition: '',
        examples: ''
      },
      showDialog: false,
      res: null
    }
  },
  watch: {
    item: function (val) {
      this.editWord.word = val.word
      this.editWord.definition = val.definition
      this.editWord.examples = JSON.stringify(val.examples)
    }
  },
  methods: {
    onOk () {
      console.log(this.editWord)
      this.res = this.editWord
    },
    onCancel () {
      this.resetDialog()
    },
    onShow () {
      console.log('show')
    },
    onHide () {
      console.log('hide')
    },

    // custom handler
    async choose (okFn) {
      await okFn()
      this.$q.notify('Word Updated. Remember to save changes')
      console.log(this.res)
      this.$emit('edited', this.res)
    },
    open () {
      this.showDialog = true
    },
    resetDialog () {
      this.showDialog = false
      this.editWord.word = ''
      this.editWord.definition = ''
      this.editWord.examples = ''
    }
  }
}
</script>

<style>
</style>
