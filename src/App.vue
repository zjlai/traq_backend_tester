<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Amplify from 'aws-amplify'
import awsmobile from './aws-exports'

Amplify.configure(awsmobile)
Amplify.Logger.LOG_LEVEL = 'DEBUG'

export default {
  name: 'App'
}
</script>

<style>
</style>
