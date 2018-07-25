<template>
  <div>
    <q-card class="self-center q-pa-lg" style="width:80%;">
      <q-card-title>
        Forgot Password
      </q-card-title>
      <q-card-main>
        <div>
          <p class="q-py-md">
            Resets user password. Verification code is sent to users registered email
          </p>
          <q-field
            icon="mail"
            label="Your Email"
            :error="$v.email.$error"
            error-label="We need a valid email"
            class="q-my-md"
            >
            <q-input type="email" v-model="email" @blur="$v.email.$touch"/>
          </q-field>
          <q-field
            icon="lock"
            label="Verification Code"
            :error="$v.code.$error"
            error-label="Please check your email for the verification code"
            class="q-my-md"
            >
            <q-input v-model="code" @blur="$v.code.$touch"/>
          </q-field>
          <q-field
            icon="lock"
            label="Your New Password"
            class="q-my-md"
            v-show="email && code"
            >
            <q-input type="password" v-model="password" />
          </q-field>
          <p class="text-negative text-italic q-pt-md" v-if="error">
            *{{ error }}
          </p>
        </div>
      </q-card-main>
      <q-card-actions align="end">
        <q-btn color="primary" flat label="Send Code" :disabled="!email" @click.native="send" />
        <q-btn color="primary" flat label="Submit Code" :disabled="!email" @click.native="submit" />
      </q-card-actions>
      <q-card-actions>
        <q-btn color="primary" flat label="Back to Sign In" to="/authentication/signin" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Logger } from 'aws-amplify'
import { required, email } from 'vuelidate/lib/validators'

const logger = new Logger('ForgotPasswordComp')

export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      code: '',
      password: '',
      error: ''
    }
  },
  computed: {
    user () { return this.$store.state.UserStore.user }
  },
  validations: {
    email: { required, email },
    code: { required }
  },
  methods: {
    send () {
      this.$auth.forgotPassword(this.email)
        .then(() => {
          logger.debug('code resent')
          this.setError('')
        })
        .catch(err => this.setError(err))
    },
    submit () {
      this.$auth.forgotPasswordSubmit(this.email, this.code, this.password)
        .then(() => this.$router.push('/authentication/signin'))
        .catch(err => this.setError(err))
    },
    signIn () {
      this.$router.push('/authentication/signin')
    },
    setError (err) {
      this.error = err.message || err
    }
  }
}
</script>

<style>
</style>
