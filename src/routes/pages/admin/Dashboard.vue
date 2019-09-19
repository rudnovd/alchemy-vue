<template>
  <b-container>
    <template v-if='isLoading'>
      <b-row>
        <b-col cols='12'>
          <div class='text-center'>
            <b-spinner
              v-if='isLoading'
              variant='success'
              style='width: 3rem; height: 3rem;'
            />
          </div>
        </b-col>
      </b-row>
    </template>

    <template v-if='!error && !isLoading'>
      <b-row class='border-bottom'>
        <b-col class='text-center border-bottom mb-2' cols='12'>
          <h3>
            Users
          </h3>
        </b-col>

        <b-col class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0' cols='12' sm='12' md='6' lg='4' xl='4'>
          <b-card bg-variant='primary' text-variant='white'>
            <b-row>
              <b-col class='text-center' cols='4' sm='4' md='4' lg='4' xl='4'>
                <font-awesome-icon class='fa-4x' icon='user' />
              </b-col>

              <b-col cols='8' sm='8' md='8' lg='8' xl='8'>
                <h4>
                  Count:
                </h4>

                <h4>
                  {{ stats.usersCount }}
                </h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <b-col class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0' cols='12' sm='12' md='6' lg='4' xl='4'>
          <b-card bg-variant='success' text-variant='white'>
            <b-row>
              <b-col class='text-center' cols='4' sm='4' md='4' lg='4' xl='4'>
                <font-awesome-icon class='fa-4x' icon='smile'/>
              </b-col>
              <b-col cols='8' sm='8' md='8' lg='8' xl='8'>
                <h4>
                  Active:
                </h4>

                <h4>
                  {{ stats.activeUsersCount }}
                </h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <b-col class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0 mb-2' cols='12' sm='12' md='6' lg='4' xl='4'>
          <b-card bg-variant='danger' text-variant='white'>
            <b-row>
              <b-col class='text-center' cols='4' sm='4' md='4' lg='4' xl='4'>
                <font-awesome-icon class='fa-4x' icon='user-slash'/>
              </b-col>

              <b-col cols='8' sm='8' md='8' lg='8' xl='8'>
                <h4>
                  Banned:
                </h4>

                <h4>
                  {{ stats.bannedUsersCount }}
                </h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-row class='border-bottom mt-5'>
        <b-col class='text-center border-bottom mb-2' cols='12'>
          <h3>
            Elements
          </h3>
        </b-col>

        <b-col class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0' cols='12' sm='12' md='6' lg='4' xl='4'>
          <b-card bg-variant='primary' text-variant='white'>
            <b-row>
              <b-col class='text-center' cols='4' sm='4' md='4' lg='4' xl='4'>
                <font-awesome-icon class='fa-4x' icon='fire'/>
              </b-col>

              <b-col cols='8' sm='8' md='8' lg='8' xl='8'>
                <h4>
                  Count:
                </h4>

                <h4>
                  {{ stats.elementsCount }}
                </h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <b-col class='mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0 mb-2' cols='12' sm='12' md='6' lg='4' xl='4'>
          <b-card bg-variant='danger' text-variant='white'>
            <b-row>
              <b-col class='text-center' cols='4' sm='4' md='4' lg='4' xl='4'>
                <font-awesome-icon class='fa-4x' icon='eye-slash'/>
              </b-col>
              <b-col cols='8' sm='8' md='8' lg='8' xl='8'>
                <h4>
                  Undiscovered:
                </h4>

                <h4>
                  {{ stats.undiscoveredElementsCount }}
                </h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </template>

    <template v-if='error'>
      <h5>
        {{ error }}
      </h5>
    </template>
  </b-container>
</template>

<script>
import { getStats } from '@/js/api/stats'

export default {
  mounted () {
    this.isLoading = true
    getStats().then(response => {
      this.isLoading = false
      if (response.status === 200) {
        this.stats = response.data
      } else {
        this.error = response
      }
    })
  },
  data () {
    return {
      isLoading: false,
      error: '',
      stats: {}
    }
  }
}
</script>
