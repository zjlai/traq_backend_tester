<template>
  <q-card class="self-center q-pa-lg full-width" flat>
    <q-card-title>
      Word Lists
    </q-card-title>
    <q-card-main>
      <div>
        <p class="q-py-md">
          Displays all user created Word Lists in DB
        </p>
        <q-table
          title="Word Lists"
          :data="wordListData"
          :columns="wordListColumns"
          row-key="wordListId"
          :pagination.sync="pagination"
          :selected.sync="selected"
          selection="single"
          :loading="loading"
        >
          <template slot="top-selection" slot-scope="props">
            <q-btn color="secondary" flat label="Manage Words" class="q-mr-sm" @click.native="manage"/>
          </template>
        </q-table>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import { API } from 'aws-amplify'

const path = '/wordList'
const API_NAME = 'wordListCRUD'

export default {
  name: 'GetWordLists',
  data () {
    return {
      wordListColumns: [
        {
          name: 'wordListId',
          label: 'Word List ID',
          field: 'wordListId',
          required: true,
          sortable: true
        },
        { name: 'wordListName', label: 'Word List Name', field: 'wordListName', sortable: true },
        { name: 'userName', label: 'Uploaded By', field: 'userName', sortable: true },
        { name: 'status', label: 'Status', field: 'status', sortable: true },
        { name: 'studentCount', label: 'Subscribed', field: 'studentCount', sortable: true },
        { name: 'wordCount', label: 'Word Count', field: 'wordCount', sortable: true }
      ],
      wordListData: [],
      pagination: {
        sortBy: 'wordListId',
        descending: true,
        page: 1,
        rowsPerPage: 20
      },
      selected: [],
      loading: true
    }
  },
  mounted () {
    this.getWordList()
  },
  methods: {
    getWordList: async function () {
      this.wordListData = await API.get(API_NAME, path)
      this.loading = false
    },
    manage () {
      this.$router.push('manage/' + this.selected[0].wordListId)
    }
  }
}
</script>

<style>
</style>
