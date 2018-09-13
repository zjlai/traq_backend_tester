<template>
  <div>
    <q-card class="self-center q-pa-lg full-width" flat>
      <q-card-main>
        <q-spinner-mat v-show="loading" />
        <div v-show="!loading">
          <q-table
            title="My Subscriptions"
            :data="subs"
            :columns="subsColumns"
            row-key="wordListId"
            :pagination.sync="subsPagination"
            :loading="loading"
          />
          <q-table
            title="Available For Subscription"
            :data="wordlist"
            :columns="wordListColumns"
            row-key="wordListId"
            :pagination.sync="pagination"
            :selected.sync="selected"
            selection="single"
            :loading="loading"
          >
            <template slot="top-selection" slot-scope="props">
              <q-btn color="secondary" flat label="Subscribe" class="q-mr-sm" @click.native="subscribe"/>
            </template>
          </q-table>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import uuid from 'uuid'

const subPath = '/subscriptions'
const subAPI = 'subscriptionsCRUD'
const wordListPath = '/wordList'
const wordListAPI = 'wordListCRUD'

export default {
  name: 'myWordLists',
  data () {
    return {
      wordlist: [],
      loading: true,
      subs: [],
      wordListColumns: [
        { name: 'wordListName', label: 'Word List Name', field: 'wordListName', sortable: true },
        { name: 'userName', label: 'Uploaded By', field: 'userName', sortable: true },
        { name: 'status', label: 'Status', field: 'status', sortable: true },
        { name: 'studentCount', label: 'Subscribed', field: 'studentCount', sortable: true },
        { name: 'wordCount', label: 'Word Count', field: 'wordCount', sortable: true }
      ],
      subsColumns: [
        { name: 'wordListName', label: 'Word List Name', field: 'wordListName', sortable: true },
        { name: 'wordListOwner', label: 'Created By', field: 'wordListOwner', sortable: true },
        { name: 'status', label: 'Status', field: 'status', sortable: true },
        { name: 'wordCount', label: 'Words', field: 'wordCount', sortable: true }
      ],
      subsVisible: ['wordListName', 'wordListOwner', 'status', 'wordCount'],
      pagination: {
        sortBy: 'wordListId',
        descending: true,
        page: 1,
        rowsPerPage: 20
      },
      subsPagination: {
        sortBy: 'wordListId',
        descending: true,
        page: 1,
        rowsPerPage: 20
      },
      selected: []
    }
  },
  mounted () {
    this.getWords()
    this.getSubs()
  },
  methods: {
    async getWords () {
      this.wordlist = await API.get(wordListAPI, wordListPath + 'notsubscribed')
      this.loading = false
    },
    async getSubs () {
      this.subs = await API.get(subAPI, subPath)
      console.log(this.subs)
      let test = await API.get('userdb', '/')
      console.log(test)
    },
    async subscribe () {
      let req = {
        body: {
          dateSubscribed: Date.now().toString(),
          status: 'active',
          wordCount: this.selected[0].wordCount,
          wordListId: this.selected[0].wordListId,
          wordListName: this.selected[0].wordListName,
          wordListOwner: this.selected[0].userName,
          rowId: uuid.v4()
        }
      }
      let sub = await API.post(subAPI, subPath, req)
      this.selected[0].studentCount++
      let updatereq = {
        body: this.selected[0]
      }
      let update = await API.put(wordListAPI, wordListPath, updatereq)
      console.log(sub, update)
      this.getSubs()
    }
  }
}
</script>

<style>
</style>
