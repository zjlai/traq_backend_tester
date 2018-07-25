<template>
  <div>
    <q-card class="self-center q-pa-lg" style="width:80%;">
      <q-card-title>
        Forgot Password
      </q-card-title>
      <q-card-main>
        <div>
          <p class="q-py-md">
            Resets user password. Are you sure you want to sign out?
          </p>
        </div>
      </q-card-main>
      <q-card-actions>
        <q-btn color="primary" flat label="Sign Out" @click.native="signOut" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Logger } from 'aws-amplify'

const logger = new Logger('SignOutComp')

export default {
  name: 'SignOut',
  data () {
    return {
      error: ''
    }
  },
  methods: {
    signOut () {
      this.$auth.signOut()
        .then(() => {
          logger.debug('sign out success')
          this.$router.push('/authentication/signIn')
        })
        .catch(err => this.setError(err))
    },
    setError (err) {
      this.error = err.message || err
    }
  }
}
</script>

<style>
</style>
