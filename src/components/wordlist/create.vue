<template>
  <q-card class="self-center q-pa-lg full-width">
    <q-card-title>
      Create New Word List
    </q-card-title>
    <q-card-main>
      <div>
        <q-field
          label="Title"
          :error="$v.wordlist.wordListName.$error"
          error-label="Give a title for your word list!"
          class="q-my-md"
          >
          <q-input v-model="wordlist.wordListName" autofocus @blur="$v.wordlist.$touch" />
        </q-field>
        <q-field
          label="Words"
          class="q-my-md"
          >
          <p>Enter list of words. Each word should be separated by a comma and in the appropriate JSON format.
          Each word should contain the word itself in the word field, it's definition
          and an example sentence. Take note of the format.
          <br /><br />
          <strong>Example:</strong>
          <br /><em>
          [{ <br />
            "definition": "A fruit that grows on trees", <br />
            "examples":
            [{
              "lang": "english",
              "example": "Snow white ate a poison apple and fell into a deep sleep"
            }], <br />
            "word": "Apple" <br />
          }, <br />
          { <br />
            "definition": "ability to go into", <br />
            "examples":
            {
              "english": "only students have access to the university library"
            }, <br />
            "word": "access" <br />
          }]</em>
          </p>
          <hr />
          <q-input type="textarea" v-model.trim="words"  :max-height="100" rows="10" placeholder="" />
        </q-field>
        <q-field
          label="Status"
          class="q-my-md"
          >
          <q-select
            v-model="wordlist.status"
            :options="statusOptions"
          />
        </q-field>
        <p class="text-negative text-italic q-pt-md" v-if="error">
          *{{ error }}
        </p>
      </div>
    </q-card-main>
    <q-card-actions>
      <q-btn color="primary" flat label="Create Word List" @click.native="createWordList" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { API } from 'aws-amplify'
import { required } from 'vuelidate/lib/validators'
import uuid from 'uuid'

const path = '/wordList'
const API_NAME = 'wordListCRUD'

export default {
  name: 'WordListCreate',
  data () {
    return {
      wordlist: {
        userId: '',
        userName: '',
        wordListId: '',
        status: 'live',
        wordListName: '',
        words: [],
        wordCount: 0,
        studentCount: 0
      },
      words: '',
      statusOptions: [
        { label: 'Live', value: 'live' },
        { label: 'Preview', value: 'preview' }
      ],
      error: ''
    }
  },
  validations: {
    wordlist: {
      wordListName: { required }
    }
  },
  mounted () {
    this.user = this.$auth.user.username
    console.log(this.$auth.user)
  },
  methods: {
    async createWordList () {
      this.error = ''
      this.wordlist.userId = this.$auth.user.username
      this.wordlist.userName = this.$auth.user.attributes.name
      this.wordlist.wordListId = uuid.v4()
      try {
        this.countWords()
      } catch (err) {
        this.error = err.message
      }
      console.log(this.wordlist)
      console.log(this.$v.wordlist.wordListName.$error)
      if (this.$v.$error) {
        this.error = 'Give a title to your word list'
      } else {
        let req = {
          body: this.wordlist
        }
        let res = await API.post(API_NAME, path, req)
        console.log(res)
      }
    },
    countWords () {
      if (this.words[this.words.length - 1] === ',') {
        this.words = this.words.slice(0, -1)
      }
      //  let jsonlist = '[' + this.words + ']'
      try {
        this.wordlist.words = JSON.parse(this.words)
      } catch (err) {
        if (err.name === 'SyntaxError') {
          throw new SyntaxError('JSON not formed properly. Please check data. Trace: ' + err.message)
        }
        return err
      }
      this.wordlist.wordCount = this.wordlist.words.length
    }
  }
}
</script>

<style>
</style>
