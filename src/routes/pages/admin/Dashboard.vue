<template lang='pug'>
b-container

  b-row(class='border-bottom')
    b-col(class='text-center border-bottom mb-2' cols='12')
      h3 Users

    b-col(class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0' cols='12' sm='12' md='6' lg='4' xl='4')
      b-card(bg-variant="primary" text-variant="white")
        b-row
          b-col(class='text-center' cols='4' sm='4' md='4' lg='4' xl='4')
            font-awesome-icon(class='fa-4x' icon='user')
          b-col(cols='8' sm='8' md='8' lg='8' xl='8')
            h4 Count:
            h4 {{ stats.usersCount }}

    b-col(class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0' cols='12' sm='12' md='6' lg='4' xl='4')
      b-card(bg-variant="success" text-variant="white")
        b-row
          b-col(class='text-center' cols='4' sm='4' md='4' lg='4' xl='4')
            font-awesome-icon(class='fa-4x' icon='smile')
          b-col(cols='8' sm='8' md='8' lg='8' xl='8')
            h4 Active:
            h4 {{ stats.activeUsersCount }}

    b-col(class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0 mb-2' cols='12' sm='12' md='6' lg='4' xl='4')
      b-card(bg-variant="danger" text-variant="white")
        b-row
          b-col(class='text-center' cols='4' sm='4' md='4' lg='4' xl='4')
            font-awesome-icon(class='fa-4x' icon='user-slash')
          b-col(cols='8' sm='8' md='8' lg='8' xl='8')
            h4 Banned:
            h4 {{ stats.bannedUsersCount }}

  b-row(class='border-bottom mt-5')
    b-col(class='text-center border-bottom mb-2' cols='12')
      h3 Elements

    b-col(class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0' cols='12' sm='12' md='6' lg='4' xl='4')
      b-card(bg-variant="primary" text-variant="white")
        b-row
          b-col(class='text-center' cols='4' sm='4' md='4' lg='4' xl='4')
            font-awesome-icon(class='fa-4x' icon='fire')
          b-col(cols='8' sm='8' md='8' lg='8' xl='8')
            h4 Count:
            h4 {{ stats.elementsCount }}

    b-col(class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0 mb-2' cols='12' sm='12' md='6' lg='4' xl='4')
      b-card(bg-variant="danger" text-variant="white")
        b-row
          b-col(class='text-center' cols='4' sm='4' md='4' lg='4' xl='4')
            font-awesome-icon(class='fa-4x' icon='eye-slash')
          b-col(cols='8' sm='8' md='8' lg='8' xl='8')
            h4 Undiscovered:
            h4 {{ stats.undiscoveredElementsCount }}
</template>

<script>
import { getStats } from '@/js/api/stats'

export default {
  mounted () {
    getStats().then(response => {
      if (response.status === 200) {
        this.stats = response.data
      }
    })
  },
  data () {
    return {
      stats: null
    }
  }
}
</script>
