<template>
  <b-container>
    <b-navbar-brand class='navbar-brand' to='/'>
      <b-img src='/images/logo.png'/>
      <span>ALCHEMY</span>
    </b-navbar-brand>

    <div class='navbar-icons' v-if='user.isLoggedIn'>
      <button class='icon' v-if='$route.path === "/game"'>
        <font-awesome-icon
          id='opened-recipes-button'
          title='Recipes'
          icon='scroll'
          @click='openedRecipesModalShow'
        />
      </button>

      <button class='icon' v-if='$route.path === "/game"'>
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
        <b-dropdown-divider v-if='user.role === "Admin"'/>
        <b-dropdown-item to='/admin/dashboard' v-if='user.role === "Admin"'>Dashboard</b-dropdown-item>
        <b-dropdown-item to='/admin/elements' v-if='user.role === "Admin"'>Elements</b-dropdown-item>
        <b-dropdown-item to='/admin/recipes' v-if='user.role === "Admin"'>Recipes</b-dropdown-item>
        <b-dropdown-item to='/admin/users' v-if='user.role === "Admin"'>Users</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item @click='logout()'>Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <LoginModal v-if='!user.isLoggedIn'/>
    <RegistrationModal v-if='!user.isLoggedIn'/>
    <ResetPasswordModal v-if='!user.isLoggedIn'/>
    <OpenedRecipesModal v-if='user.isLoggedIn'/>
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

  .navbar-icons {
    margin-left: auto;
    margin-right: 10px;

    .icon {
      color: white;
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      outline: none;
      padding: 0;
      margin-right: 5px;

      &:hover {
        color: map-get($colors, 'alchemy-light-green');
      }
    }
  }

  .navbar-brand {
    display: flex;
    align-items: center;

    &:hover {
      span {
        filter: contrast(200%);
      }
    }

    img {
      width: 50px;
      height: 50px;
      cursor: pointer;
    }

    span {
      letter-spacing: 1px;
      font-weight: 800;
      font-size: 1.2em;
      color: map-get($colors, 'alchemy-green');
    }
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {

}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .navbar {
    height: 30px !important;
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'sm')) {
  .navbar-brand {
    span {
      display: none;
    }
  }
}
</style>
