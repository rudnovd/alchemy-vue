<template>
  <b-navbar type="dark" variant="dark">
    <b-container>
      <b-navbar-brand class="navbar-brand" to="/">
        <b-img class="navbar-brand-image" src="/images/logo.png" />
        <span class="navbar-brand-name">ALCHEMY</span>
      </b-navbar-brand>

      <div v-if="user.isLoggedIn" class="navbar-icons">
        <button v-if="$route.path === '/game'" class="navbar-icon">
          <font-awesome-icon title="Recipes" icon="scroll" @click="showOpenedRecipesModal = true" />
        </button>

        <button v-if="$route.path === '/game'" class="navbar-icon">
          <font-awesome-icon
            v-if="!fullscreenEnabled"
            title="Enable fullscreen"
            icon="expand-arrows-alt"
            @click="enableFullscreen"
          />
          <font-awesome-icon
            v-if="fullscreenEnabled"
            title="Disable fullscreen"
            icon="compress-arrows-alt"
            @click="disableFullScreen"
          />
        </button>
      </div>

      <b-navbar-nav class="navbar-dropdown-d">
        <b-btn v-if="!user.isLoggedIn" class="text-white" variant="link" @click="showLoginModal = true">
          Sign in
        </b-btn>

        <b-btn v-if="!user.isLoggedIn" class="text-white" variant="link" @click="showRegistrationModal = true">
          Sign up
        </b-btn>

        <b-nav-item-dropdown v-if="user.isLoggedIn" right :text="user.username" left="left">
          <b-dropdown-item to="/game">Game</b-dropdown-item>
          <b-dropdown-divider v-if="isAdmin" />
          <b-dropdown-item v-if="isAdmin" to="/admin/dashboard">Dashboard</b-dropdown-item>
          <b-dropdown-item v-if="isAdmin" to="/admin/elements">Elements</b-dropdown-item>
          <b-dropdown-item v-if="isAdmin" to="/admin/recipes">Recipes</b-dropdown-item>
          <b-dropdown-item v-if="isAdmin" to="/admin/users">Users</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click="getLogout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <TheLoginModal
        :show-modal="showLoginModal"
        @close="showLoginModal = false"
        @openAnotherModal="showResetPasswordModal = true"
      />
      <TheRegistrationModal :show-modal="showRegistrationModal" @close="showRegistrationModal = false" />
      <TheResetPasswordModal :show-modal="showResetPasswordModal" @close="showResetPasswordModal = false" />
      <OpenedRecipesModal :show-modal="showOpenedRecipesModal" @close="showOpenedRecipesModal = false" />
    </b-container>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheLoginModal from '@/components/navbar/TheLoginModal.vue'
import TheRegistrationModal from '@/components/navbar/TheRegistrationModal.vue'
import TheResetPasswordModal from '@/components/navbar/TheResetPasswordModal.vue'
import OpenedRecipesModal from '@/components/game/recipes/OpenedRecipesModal.vue'

export default {
  name: 'TheNavbar',
  components: {
    TheLoginModal,
    TheRegistrationModal,
    TheResetPasswordModal,
    OpenedRecipesModal
  },
  data() {
    return {
      fullscreenEnabled: false,
      showLoginModal: false,
      showResetPasswordModal: false,
      showRegistrationModal: false,
      showOpenedRecipesModal: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isAdmin: 'user/isAdmin'
    })
  },
  methods: {
    ...mapActions({
      logout: 'user/logout'
    }),
    getLogout() {
      this.logout().then(() => {
        if (!this.user.state.error) this.$router.push({ path: '/' })
      })
    },
    enableFullscreen() {
      document.documentElement.requestFullscreen()
      this.fullscreenEnabled = true
    },
    disableFullScreen() {
      document.exitFullscreen()
      this.fullscreenEnabled = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 30px;
  background: rgb(33, 33, 33);
  color: rgb(157, 157, 157);

  @include media-lg {
    height: 56px;
  }
}

.navbar-dropdown-d .dropdown-item {
  color: rgb(0, 0, 0);
}

.navbar-dropdown-d .router-link-active {
  color: map-get($colors, 'green');
  background: rgb(230, 230, 230);
  font-weight: bold;
}

.navbar-dropdown-d a:active:hover {
  color: rgb(0, 0, 0);
  background-color: map-get($colors, 'green');
}

.navbar-icons {
  margin-left: auto;
  margin-right: 10px;
}

.navbar-icon {
  color: white;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin-right: 5px;

  &:hover {
    color: map-get($colors, 'light-green');
  }
}

.navbar-brand {
  display: flex;
  align-items: center;
  height: 30px;

  &:hover .navbar-brand-name {
    filter: contrast(200%);
  }
}

.navbar-brand-image {
  display: none;
  width: 50px;
  height: 50px;
  cursor: pointer;

  @include media-sm {
    display: block;
  }
}

.navbar-brand-name {
  display: none;
  letter-spacing: 1px;
  font-weight: 800;
  font-size: 1.2em;
  color: map-get($colors, 'green');

  @include media-md {
    display: block;
  }
}
</style>
