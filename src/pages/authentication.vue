<template>
  <q-page padding>
    <h3>Authentication Functions</h3>
    <p>Current Authentication Status:
      <strong>
      </strong>
    </p>
    <div class="row">
      <div class="col">
        <q-list link highlight separator no-border>
          <q-list-header>
            Authentication Functions
          </q-list-header>
          <q-item-separator />
          <q-item link to="/authentication/signin">
            <q-item-main>
              Sign In
            </q-item-main>
          </q-item>
          <q-item link to="/authentication/signup">
            <q-item-main>
              Register New User
            </q-item-main>
          </q-item>
          <q-item link to="/authentication/confirmsignup">
            <q-item-main>
              Confirm Sign Up
            </q-item-main>
          </q-item>
          <q-item link to="/authentication/forgotpassword">
            <q-item-main>
              Forgot Password
            </q-item-main>
          </q-item>
          <q-item link to="/authentication/signout">
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
  name: 'PageAuth',
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
