<template>
  <div>
    {{userState}}
    <q-card class="self-center q-pa-lg" style="width:80%;">
      <q-card-title>
        Sign In
      </q-card-title>
      <q-card-main>
        <div>
          <p class="q-py-md">
            Sign in uses Amazon Cognito to verifies user identity and returns a Cognito Token.
            It takes in a user email and password.
          </p>
          <q-field
            icon="mail"
            label="Your Email"
            :error="$v.signin.email.$error"
            error-label="We need a valid email"
            class="q-my-md"
            >
            <q-input type="email" v-model="signin.email" @blur="$v.signin.email.$touch"/>
          </q-field>
          <q-field
            icon="lock"
            label="Your Password"
            class="q-my-md"
            >
            <q-input type="password" v-model="signin.password" />
          </q-field>
          <p class="text-negative text-italic q-pt-md" v-if="error">
            *{{ error }}
          </p>
        </div>
      </q-card-main>
      <q-card-actions>
      <q-btn color="primary" flat label="Forgot Password" to="/authentication/forgotpassword" />
        <q-btn color="primary" flat label="Sign In" @click.native="signIn()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Logger, JS } from 'aws-amplify'
import { required, email } from 'vuelidate/lib/validators'

const logger = new Logger('SignInComp')

export default {
  name: 'SignIn',
  data () {
    return {
      signin: {
        email: '',
        password: ''
      },
      user: null,
      error: ''
    }
  },
  validations: {
    signin: {
      email: { required, email }
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
  methods: {
    signIn () {
      const that = this
      this.$auth.signIn(this.signin.email, this.signin.password)
        .then(user => {
          logger.debug('sign in success', user)
          this.$store.commit('UserStore/setUser', user)
          console.log(this.$store)
          return user
        })
        .then(user => {
          that.user = user
          this.checkUser()
        })
        .catch(err => this.setError(err))
    },
    checkUser () {
      const user = this.user
      if (!user) { return }
      this.$auth.verifiedContact(user)
        .then(data => {
          logger.debug('verify result', data)
          this.$store.commit('UserSore/setUserVerification', data)
          if (!JS.isEmpty(data.verified)) {
            this.$router.push('/')
          } else {
            this.$router.push('/authentication/signin')
          }
        })
    },
    confirm () {
      this.$auth.confirmSignIn(this.user, this.code)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => this.setError(err))
    },
    forgot () {
      this.$router.push('/authentication/forgotpassword')
    },
    signUp () {
      this.$router.push('/authentication/signUp')
    },
    setError (err) {
      this.error = err.message || err
    }
  }
}
</script>
