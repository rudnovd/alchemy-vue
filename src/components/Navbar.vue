<template>
  <b-container>
    <b-navbar-brand class='navbar-brand' to='/'>
      <object type='image/svg+xml' data='/images/logo.svg' height='100%'/>
    </b-navbar-brand>

    <div class='navbar-icons ml-auto'>
      <button class='icon opened-recipes-button' v-if='user.isLoggedIn && $route.path === "/game"'>
        <font-awesome-icon
          id='opened-recipes-button'
          title='Recipes'
          icon='scroll'
          @click='openedRecipesModalShow'
        />
      </button>

      <button class='icon' v-if='user.isLoggedIn && $route.path === "/game"'>
        <font-awesome-icon
          v-if='!fullscreenEnabled'
          title='Enable fullscreen'
          icon='expand-arrows-alt'
          @click='enableFullscreen'
        />
        <font-awesome-icon
          v-if='fullscreenEnabled'
          title='Disable fullscreen'
          icon='compress-arrows-alt'
          @click='disableFullScreen'
        />
      </button>
    </div>

    <b-navbar-nav>
      <b-btn
        class='text-white'
        v-if='!user.isLoggedIn'
        variant='link'
        @click='loginModalShow'
      >
        Sign in
      </b-btn>

      <b-btn
        class='text-white'
        v-if='!user.isLoggedIn'
        variant='link'
        @click='registrationModalShow'
      >
        Sign up
      </b-btn>

      <b-nav-item-dropdown v-if='user.isLoggedIn' :text='user.username' left='left'>
        <b-dropdown-item to='/game'>Game</b-dropdown-item>
        <b-dropdown-divider v-if='user.isLoggedIn && user.role === "Admin"'/>
        <b-dropdown-item to='/admin/dashboard' v-if='user.isLoggedIn && user.role === "Admin"'>Dashboard</b-dropdown-item>
        <b-dropdown-item to='/admin/elements' v-if='user.isLoggedIn && user.role === "Admin"'>Elements</b-dropdown-item>
        <b-dropdown-item to='/admin/recipes' v-if='user.isLoggedIn && user.role === "Admin"'>Recipes</b-dropdown-item>
        <b-dropdown-item to='/admin/users' v-if='user.isLoggedIn && user.role === "Admin"'>Users</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item v-if='user.isLoggedIn' @click='logout()'>Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <LoginModal/>
    <RegistrationModal/>
    <ResetPasswordModal/>
    <OpenedRecipesModal/>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoginModal from '@/components/navbar/LoginModal.vue'
import RegistrationModal from '@/components/navbar/RegistrationModal.vue'
import ResetPasswordModal from '@/components/navbar/ResetPasswordModal.vue'
import OpenedRecipesModal from '@/components/game/recipes/OpenedRecipesModal.vue'

export default {
  components: {
    LoginModal,
    RegistrationModal,
    ResetPasswordModal,
    OpenedRecipesModal
  },
  data () {
    return {
      fullscreenEnabled: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      getLogout: 'user/getLogout'
    }),
    logout () {
      this.getLogout().then(() => {
        this.$router.push({ path: '/' })
      })
    },
    loginModalShow () {
      this.$root.$emit('loginModalShow')
    },
    registrationModalShow () {
      this.$root.$emit('registrationModalShow')
    },
    openedRecipesModalShow () {
      this.$root.$emit('openedRecipesModalShow')
    },
    enableFullscreen () {
      document.documentElement.requestFullscreen()
      this.fullscreenEnabled = true
    },
    disableFullScreen () {
      document.exitFullscreen()
      this.fullscreenEnabled = false
    }
  }
}
</script>

<style lang='scss'>
.navbar {
  height: 56px;
  background: rgb(33, 33, 33);
  color: rgb(157, 157, 157);

  .dropdown-menu {
    a {
      &.dropdown-item {
        color: black;
      }

      &.router-link-active {
        color: map-get($colors, 'alchemy-green');
        background: rgb(230, 230, 230);
        font-weight: bold;
      }

      &:active:hover {
        color: black;
        background-color: map-get($colors, 'alchemy-green');
      }
    }
  }

  .icon {
    color: white;
    width: 50px;
    height: 40px;
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin-right: 10px;
  }

  .logo {
    cursor: pointer;
  }

  .navbar-brand {
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .navbar-brand {
    height: 50px;

    &::after {
      height: 50px;
    }

    object {
      width: 200px;
    }
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .navbar {
    height: 30px !important;
  }

  .navbar-brand {
    height: 30px;

    &::after {
      height: 30px;
    }

    object {
      width: 100px;
    }
  }
}
</style>
