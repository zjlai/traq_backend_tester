<template>
  <q-page padding>
    <h3>Authentication Functions</h3>
    <p>Current Authentication Status:
      <strong>
      </strong>
    </p>
  </q-page>
</template>

<script>
import { Auth } from 'aws-amplify'

let status = async () => {
  let user = await Auth.currentAuthenticatedUser()
  console.log(user)
}
console.log(status)
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
