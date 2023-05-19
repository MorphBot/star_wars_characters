import { QBadge } from 'quasar'

export default {
  name: 'SwChars',

  render (h) {
    return h(QBadge, {
      staticClass: 'SwChars',
      props: {
        label: 'SwChars'
      }
    })
  }
}
