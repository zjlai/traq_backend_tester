<template>
  <div>
    <q-card class="self-center q-pa-lg" style="width:80%;">
      <q-card-title>
        Sign Up
      </q-card-title>
      <q-card-main>
        <div>
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
        </div>
      </q-card-main>
      <q-card-actions>
        <q-btn color="primary" flat label="Register" @click.native="signUp()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Logger } from 'aws-amplify'
import { required, email } from 'vuelidate/lib/validators'

const logger = new Logger('SignUpComp')

export default {
  name: 'SignUp',
  data () {
    return {
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
      genderOptions: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' }
      ]
    }
  },
  validations: {
    newUser: {
      username: { required, email },
      password: { required },
      attributes: {
        name: { required },
        family_name: { required },
        gender: { required },
        birthdate: { required }
      }
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
    signUp (event) {
      console.log(event)
      console.log(this.newUser)
      this.newUser.attributes.birthdate = this.newUser.attributes.birthdate.substring(0, 10)
      this.$auth.signUp(this.newUser)
        .then(data => {
          console.log(data)
          logger.debug('sign up success', data)
          this.$router.push('/authentication/confirmSignUp')
        })
        .catch(err => logger.error('sign up error', err))
    },
    signIn: () => {
      this.$router.push('/authentication/signin')
    },
    confirm: () => {
      this.$router.push('/authentication/confirmsignup')
    }
  }
}
</script>

<style>
</style>
