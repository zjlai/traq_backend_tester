<template>
  <q-page padding>
    <div class="row">
      <div class="fixed">
        <h3>Word Bank</h3>
        <q-list link highlight separator no-border>
          <q-list-header>
            Word Bank Functions
          </q-list-header>
          <q-item-separator />
          <q-item link to="/wordlists/bank">
            <q-item-main>
              Word List Bank
            </q-item-main>
          </q-item>
          <q-item link to="/wordlists/create">
            <q-item-main>
              Create New Word List
            </q-item-main>
          </q-item>
          <q-item link to="/wordlists/delete">
            <q-item-main>
              Delete Word List
            </q-item-main>
          </q-item>
          <q-item link to="/wordlists/subscriptions">
            <q-item-main>
              My Subscribed Lists
            </q-item-main>
          </q-item>
        </q-list>
      </div>
      <div class="col-3"></div>
      <div class="col-9 flex justify-center">
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Wordbank',
  data () {
    return {}
  }
}
</script>

<style>
</style>
