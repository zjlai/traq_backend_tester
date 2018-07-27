import { Auth, Logger } from 'aws-amplify'
import Store from '../store'
const logger = new Logger('RouterComp')

const AuthFilter = (to, from, next) => {
  logger.debug('before routing ', to, from)
  const store = Store
  Auth.currentAuthenticatedUser()
    .then(user => {
      logger.debug('...has user', user)
      store.commit('UserStore/setUser', user)
      Auth.currentCredentials()
        .then(credentials => {
          store.commit('UserStore/setUserId', credentials.identityId)
        })
        .catch(err => logger.debug('get current credentials err', err))
      next()
    })
    .catch(err => {
      logger.debug('...no user', err)
      store.commit('UserStore/setUser', null)
      console.log(to)
      if (!to.name.startsWith('auth')) {
        next('/authentication/signin')
      } else {
        next()
      }
    })
}

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/authentication',
    component: () => import('layouts/default'),
    children: [
      {
        name: 'auth',
        path: '',
        component: () => import('pages/authentication'),
        children: [
          { name: 'auth_signup', path: 'signup', component: () => import('components/auth/SignUp') },
          { name: 'auth_signin', path: 'signin', component: () => import('components/auth/SignIn') },
          { name: 'auth_confirmsignup', path: 'confirmsignup', component: () => import('components/auth/ConfirmSignUp') },
          { name: 'auth_forgotpassword', path: 'forgotpassword', component: () => import('components/auth/ForgotPassword') },
          { name: 'auth_signout', path: 'signout', component: () => import('components/auth/SignOut') }
        ]
      }
    ]
  },
  {
    path: '/words',
    component: () => import('layouts/default'),
    children: [
      {
        name: 'words',
        path: '',
        component: () => import('pages/words'),
        children: [
        //  { path: 'signup', component: () => import('components/auth/SignUp') },
        //  { path: 'signin', component: () => import('components/auth/SignIn') },
        //  { path: 'confirmsignup', component: () => import('components/auth/ConfirmSignUp') },
        //  { path: 'forgotpassword', component: () => import('components/auth/ForgotPassword') },
        //  { path: 'signout', component: () => import('components/auth/SignOut') }
        ]
      }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]

export { AuthFilter }
