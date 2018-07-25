
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
        path: '',
        component: () => import('pages/authentication'),
        children: [
          { path: 'signup', component: () => import('components/auth/SignUp') },
          { path: 'signin', component: () => import('components/auth/SignIn') },
          { path: 'confirmsignup', component: () => import('components/auth/ConfirmSignUp') },
          { path: 'forgotpassword', component: () => import('components/auth/ForgotPassword') },
          { path: 'signout', component: () => import('components/auth/SignOut') },
          { path: 'verify', component: () => import('pages/Verify') }
        ]
      }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
