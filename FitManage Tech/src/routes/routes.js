import { createRouter, createWebHistory } from 'vue-router'

import LoginSistema from '../views/Login/LoginSistema.vue'
import CadastroUsuario from '../views/CadastroUsuario/CadastroUsuario.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginSistema',
      component: LoginSistema
    },
    {
      path: '/cadastro',
      name: 'CadastroUsuario',
      component: CadastroUsuario
    },
  ]
})

export default router
