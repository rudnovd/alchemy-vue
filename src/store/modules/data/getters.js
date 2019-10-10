import dayjs from 'dayjs'

export default {
  elements: state => {
    return state.elements
  },
  categories: state => {
    return state.categories
  },
  recipes: state => {
    return state.recipes
  },
  users: state => {
    const users = state.users.data.map(user => {
      return {
        ...user,
        created: dayjs(user.created).format('DD.MM.YYYY HH:mm:ss'),
        lastEntered: dayjs(user.lastEntered).format('DD.MM.YYYY HH:mm:ss')
      }
    })

    const userState = {
      ...state.users,
      data: users
    }

    return userState
  },
  stats: state => {
    return state.stats
  }
}
