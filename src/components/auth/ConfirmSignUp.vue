<template>
  <div>
    <q-card class="self-center q-pa-lg" style="width:80%;">
      <q-card-title>
        Confirm Sign Up
      </q-card-title>
      <q-card-main>
        <div>
          <p class="q-py-md">
            User is sent a verification code via email after they sign up.
            They have to enter the code to verify the validity of their email.
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
          <p class="text-negative text-italic q-pt-md" v-if="error">
            *{{ error }}
          </p>
        </div>
      </q-card-main>
      <q-card-actions>
        <q-btn color="primary" flat label="Resend Code" @click.native="resend" />
        <q-btn color="primary" flat label="Verify Email" @click.native="confirm" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Logger } from 'aws-amplify'
import { required, email } from 'vuelidate/lib/validators'

const logger = new Logger('ConfirmSignUpComp')

export default {
  name: 'ConfirmSignUp',
  data () {
    return {
      email: '',
      code: '',
      error: ''
    }
  },
  computed: {
    userState: {
      get () {
        return this.$store.state.UserStore.user
      },
      set (val) {
        this.$store.commit('../store/setUser', val)
      }
    }
  },
  validations: {
    email: { required, email },
    code: { required }
  },
  methods: {
    confirm (event) {
      this.$auth.confirmSignUp(this.email, this.code)
        .then(() => this.$router.push('/authentication/signin'))
        .catch(err => this.setError(err))
    },
    resend () {
      this.$auth.resendSignUp(this.email)
        .then(() => logger.debug('code resent'))
        .catch(err => this.setError(err))
    },
    signIn () {
      this.$router.push('/authentication/signIn')
    },
    setError (err) {
      this.error = err.message || err
    }
  }
}
</script>

<style>
</style>
