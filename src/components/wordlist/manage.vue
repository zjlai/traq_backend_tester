<template>
  <div>
    <q-card class="self-center q-pa-lg full-width">
      <q-card-title>
        Word List: {{this.wordlist.wordListName}}
      </q-card-title>
      <q-card-main>
        <q-spinner-mat v-show="loading" />
        <div v-show="!loading">
          <p class="q-py-md">
            Manage your word list
          </p>
          <q-field
            label="Word List Name"
            :error="$v.wordlist.wordListName.$error"
            error-label="Required"
            class="q-my-md"
            >
            <q-input v-model="wordlist.wordListName" />
          </q-field>
          <q-field
            label="Students Subscribed"
            class="q-my-md"
            >
            <q-input v-model="wordlist.studentCount" readonly disable />
          </q-field>
          <q-field
            label="Words in List"
            class="q-my-md"
            >
            <q-input v-model="wordlist.wordCount" readonly disable />
          </q-field>
          <q-field
            inset="label"
            class="q-my-md"
            >
            <q-list highlight multiline>
              <q-item v-for="word in wordlist.words" v-bind:key="word.word" inset-separator multiline>
                <q-item-side style="width: 20%" class="self-center flex">
                  <q-item-tile label>
                    <strong>{{ word.word }}</strong>
                  </q-item-tile>
                </q-item-side>
                <q-item-main>
                  <q-item-tile>
                    <strong> Definition: </strong>{{ word.definition }}
                  </q-item-tile>
                  <q-item-tile>
                    <strong>Example: </strong>
                    <p v-for="example in word.examples" v-bind:key="example.example">
                      <em>({{example.lang}})</em> {{example.example}}
                    </p>
                  </q-item-tile>
                </q-item-main>
                <q-item-side right icon="edit" class="self-center flex" text-color="primary" @click.native="manage(word)" />
                <q-item-side right icon="delete" class="self-center flex" text-color="negative" @click.native="confirmDel(word)" />
              </q-item>
            </q-list>
          </q-field>
        </div>
        <q-card-actions>
          <q-btn color="primary" flat label="Save Changes" @click.native="saveChanges" />
        </q-card-actions>
      </q-card-main>
    </q-card>
    <edit-dialog ref="edit" :item="item" v-on:edited="edit"/>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { required } from 'vuelidate/lib/validators'
import EditDialog from '../common/editWord'

const path = '/wordList'
const API_NAME = 'wordListCRUD'
const itemPath = '/wordList/object/'

export default {
  name: 'WordListManage',
  props: ['wordlistid'],
  components: {
    'edit-dialog': EditDialog
  },
  data () {
    return {
      wordListId: this.$route.params.wordlistid,
      wordlist: {
        status: 'live',
        wordListName: '',
        words: [],
        wordCount: 0,
        studentCount: 0
      },
      loading: true,
      item: null
    }
  },
  mounted () {
    this.getWords()
  },
  computed: {
    wordlistCount: function () {
      return this.wordlist.words.length
    }
  },
  watch: {
    wordlistCount: function (val) {
      this.wordlist.wordCount = val
    }
  },
  validations: {
    wordlist: {
      wordListName: { required }
    }
  },
  methods: {
    async getWords () {
      this.wordlist = await API.get(API_NAME, itemPath + this.wordListId)
      this.loading = false
      console.log(this.wordlist)
    },
    manage (word) {
      this.item = word
      this.$refs.edit.open()
    },
    confirmDel (word) {
      this.$q.dialog({
        title: 'Are you sure?',
        message: `Please type ${word.word.toUpperCase()} to delete`,
        prompt: {
          model: '',
          type: 'text' // optional
        },
        ok: 'Yes, confirm',
        cancel: 'hmm...next time',
        preventClose: true
      }).then((data) => {
        if (data.toLowerCase() === word.word.toLowerCase()) {
          let index = this.$_.indexOf(this.wordlist.words, word)
          this.wordlist.words.splice(index, 1)
          this.$q.notify('Deleted! Please remember to save changes')
        } else {
          this.$q.notify('Please try again. Type in the word to delete')
        }
      }).catch(() => {
        this.$q.notify('Next Time!')
      })
    },
    del (word) {
      console.log(word)
    },
    edit (val) {
      console.log(val)
      let edited = this.$_.find(this.wordlist.words, { 'word': val.word })
      edited.definition = val.definition
      edited.examples = JSON.parse(val.examples)
    },
    async saveChanges () {
      let req = {
        body: this.wordlist
      }
      let update = await API.put(API_NAME, path, req)
      console.log(update)
    }
  }
}
</script>

<style>
</style>
