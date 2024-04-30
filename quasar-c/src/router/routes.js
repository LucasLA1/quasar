const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/LoginInicio', name: 'Login', component: () => import('src/pages/LoginInicio.vue') },
      { path: '/AgendarConsultas', name: 'AgendarConsultas', component: () => import('pages/AgendarConsultas.vue') },
      { path: '/Criar', name: 'criar', component: () => import('pages/CriarConta.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: '/index',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
