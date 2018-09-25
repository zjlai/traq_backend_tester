<template>
<q-card class="self-center q-pa-lg full-width" flat>
  <q-card-title>
    My Word Lists
  </q-card-title>
  <q-card-main>
    <div>
      <p class="q-py-md">
        Displays word list that the user has created. User cannot delete word lists created by
        other users.
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
          <q-btn color="secondary" flat label="Delete Word List" @click.native="deleteWordList" class="q-mr-sm" />
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
  name: 'WordListDelete',
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
    async deleteWordList () {
      this.selected[0].status = 'archived'
      let req = {
        body: this.selected[0]()
      }
      let res = await API.put(API_NAME, path, req)
      console.log(res)
      this.getWordList()
    },
    async getWordList () {
      //  const apiPath = '/wordList/live'
      //  this.wordListData = await API.get(API_NAME, apiPath)
      // this.loading = false
      // let test = await API.get('studentAPI', '/students')
      // console.log(test)
      // let all = await API.get('studentAPI', '/students/all')
      // console.log(all)
      //  let student = await API.get('studentAPI', '/students/test')
      //  console.log(student)
      const myInit = {
        body: {
          email: 'zijian@traqxion.com',
          ethnicity: 'chinese',
          nationality: 'singaporean',
          dob: '1987-10-21',
          contact_num: '12345678',
          proficiency: JSON.stringify({'IELTS': 4.5, 'TOEFL': 10})
        }
      }
      let newstudent = await API.post('studentAPI', '/students', myInit)
      console.log(newstudent)
    }
  }
}
</script>

<style>
</style>
