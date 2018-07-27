<template>
  <q-page padding>
    <h3>Word Bank</h3>
    <p>
      Word Bank stored in the DB.
    </p>
    <div class="row">
      <div class="col">
        <q-list link highlight separator no-border>
          <q-list-header>
            Word Bank Functions
          </q-list-header>
          <q-item-separator />
          <q-item link to="/words/wordbank">
            <q-item-main>
              Word Bank
            </q-item-main>
          </q-item>
          <q-item link to="/words/signup">
            <q-item-main>
              Register New User
            </q-item-main>
          </q-item>
          <q-item link to="/words/confirmsignup">
            <q-item-main>
              Confirm Sign Up
            </q-item-main>
          </q-item>
          <q-item link to="/words/forgotpassword">
            <q-item-main>
              Forgot Password
            </q-item-main>
          </q-item>
          <q-item link to="/words/signout">
            <q-item-main>
              Sign Out
            </q-item-main>
          </q-item>
        </q-list>
      </div>
      <div class="col flex justify-center">
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Wordbank',
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
