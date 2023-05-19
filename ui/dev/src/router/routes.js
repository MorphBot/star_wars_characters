import pages from './pages'

const children = pages.map(page => ({
  path: page.path,
  component: () => import('pages/' + page.file + '.vue')
}))

const routes = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ].concat(children)
  }
]

export default routes
