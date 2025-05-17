export const routes = {
  base: '/',
  id: '/:id',
  auth: {
    registration: '/registration',
    login: '/login',
    refresh: '/refresh',
    logout: '/logout'
  }
} as const;
