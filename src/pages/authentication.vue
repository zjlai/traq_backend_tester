<template>
  <q-page padding>
    <h3>Authentication Functions</h3>
    <p>Current Authentication Status:
      <strong>
        {{ session ? session : 'Not Signed In'}}
      </strong>
    </p>
    <div class="row">
      <div class="col">
        <q-list link highlight separator no-border>
          <q-list-header>
            Authentication Functions
          </q-list-header>
          <q-item-separator />
          <q-item link @click.native="changeFunction('Sign In')">
            <q-item-main>
              Sign In
            </q-item-main>
          </q-item>
          <q-item link @click.native="changeFunction('Register New User')">
            <q-item-main>
              Register New User
            </q-item-main>
          </q-item>
          <q-item link @click.native="changeFunction('Sign Out')">
            <q-item-main>
              Sign Out
            </q-item-main>
          </q-item>
        </q-list>
      </div>
      <div class="col flex justify-center">
        <q-card class="self-center q-pa-lg" style="width:80%;">
          <q-card-title v-if="section != null">
            {{section}}
          </q-card-title>
          <q-card-title v-else class="text-center">
            Select one of the Auth functions on the left
          </q-card-title>
          <q-card-main>
            <div v-if="section==='Sign In'">
              <p class="q-py-md">
                Sign in uses Amazon Cognito to verifies user identity and returns a Cognito Token.
                It takes in a user email and password.
              </p>
              <q-field
                icon="mail"
                label="Your Email"
                :error="$v.user.email.$error"
                error-label="We need a valid email"
                class="q-my-md"
                >
                <q-input type="email" v-model="user.email" @blur="$v.user.email.$touch"/>
              </q-field>
              <q-field
                icon="lock"
                label="Your Password"
                class="q-my-md"
                >
                <q-input type="password" v-model="user.password" />
              </q-field>
              <p class="text-negative text-italic q-pt-md">
                *{{ err.signIn }}
              </p>
            </div>
            <div v-else-if="section==='Register New User'">
              <p class="q-py-md">
                Registers a User into Amazon Cognito User Pool.
                Required fields are given name, last name, gender, birthdate, email and password.
              </p>
              <q-field
                icon="mail"
                label="Your Email"
                :error="$v.newUser.username.$error"
                error-label="We need a valid email"
                class="q-my-md"
                >
                <q-input type="email" v-model="newUser.username" @blur="$v.newUser.username.$touch"/>
              </q-field>
              <q-field
                icon="lock"
                label="Your Password"
                :error="$v.newUser.password.$error"
                error-label="Required"
                class="q-my-md"
                >
                <q-input type="password" v-model="newUser.password" />
              </q-field>
              <q-field
                icon="person"
                label="Your Last Name"
                :error="$v.newUser.attributes.family_name.$error"
                error-label="Required"
                class="q-my-md"
              >
                <q-input v-model="newUser.attributes.family_name" label="Last Name" />
              </q-field>
              <q-field
                inset="icon"
                label="Your Given Name"
                :error="$v.newUser.attributes.name.$error"
                error-label="Required"
                class="q-my-md"
              >
                <q-input v-model="newUser.attributes.name" label="Given Name" />
              </q-field>
              <q-field
                inset="icon"
                label="Gender"
                :error="$v.newUser.attributes.gender.$error"
                error-label="Required"
                class="q-my-md"
              >
                <q-select
                  v-model="newUser.attributes.gender"
                  :options="genderOptions"
                  toggle
                />
              </q-field>
              <q-field
                icon="today"
                label="Date of Birth"
                :error="$v.newUser.attributes.birthdate.$error"
                error-label="Required"
                class="q-my-md"
              >
                <q-datetime v-model="newUser.attributes.birthdate" format="YYYY-MM-DD" type="date" />
              </q-field>
              <div v-if="confirm === true">
                <q-card-separator class="q-my-md" />
                <q-field
                  icon="lock"
                  label="Verification Code"
                  class="q-my-md"
                >
                  <q-input v-model="confirmationcode" label="Validation Code" />
                </q-field>
                <p class="text-negative text-italic q-pt-md" v-show="err.confirmationcode">
                  *{{ err.confirmationcode }}
                </p>
              </div>
            </div>
            <div v-else-if="section==='Sign Out'">
              <p> Logs the user out of Application </p>
            </div>
          </q-card-main>
          <q-card-actions>
            <q-btn v-if="section==='Sign In'" color="primary" flat label="Sign In" @click.native="signIn()" />
            <q-btn v-else-if="section==='Register New User' && confirm===false" color="primary" flat label="Register" @click.native="register()" />
            <q-btn v-else-if="section==='Register New User' && confirm===true" color="primary" flat label="Validate" @click.native="confirmSignUp()" />
            <q-btn v-else-if="section==='Sign Out'" color="primary" flat label="Sign Out" @click.native="signOut()" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'PageAuth',
  mounted () {
    let session = this.$auth.currentSession()
    console.log(session)
  },
  data () {
    return {
      session: null,
      section: null,
      confirm: false,
      user: {
        email: '',
        password: ''
      },
      newUser: {
        username: '',
        password: '',
        attributes: {
          name: '',
          family_name: '',
          gender: 'M',
          birthdate: '2000-01-01'
        }
      },
      err: {
        signIn: '',
        register: '',
        signOut: '',
        confirmationcode: ''
      },
      genderOptions: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' }
      ],
      confirmationcode: ''
    }
  },
  validations: {
    user: {
      email: { required, email }
    },
    newUser: {
      username: { required, email },
      password: { required },
      attributes: {
        name: { required },
        family_name: { required },
        gender: { required },
        birthdate: { required }
      }
    },
    confirmationcode: { required }
  },
  methods: {
    changeFunction (section) {
      this.section = section
    },
    signIn () {
      this.err.signIn = ''
      this.$auth.signIn(this.user.email, this.user.password)
        .then(user => {
          console.log(user)
        })
        .catch(err => console.log(err))
    },
    register () {
      this.newUser.attributes.birthdate = this.newUser.attributes.birthdate.substring(0, 10)
      this.$auth.signUp(this.newUser)
        .then(data => {
          console.log(data)
          this.confirm = true
        })
        .catch(err => console.log(err))
    },
    signOut () {
      this.$auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err))
    },
    confirmSignUp () {
      this.$auth.confirmSignUp(this.newUser.username, this.confirmationcode)
        .then(data => console.log(data))
        .catch(err => {
          console.log(err)
          if (err.code === 'CodeMismatchException') {
            this.err.confirmationcode = err.message
          }
        })
    }
  }
}
</script>

<style>
</style>
