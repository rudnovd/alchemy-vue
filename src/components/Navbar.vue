<template lang='pug'>
  b-container
    b-navbar-brand(to='/') Home

    b-navbar-toggle.ml-auto(target='nav_collapse')

    b-collapse#nav_collapse(is-nav)
      b-navbar-nav.ml-auto
        b-nav-item-dropdown(text='Username' right)
          b-dropdown-item(to='/game') Game

          b-dropdown-divider
          b-dropdown-item(to='/admin/dashboard') Dashboard
          b-dropdown-item(to='/admin/elements') Elements
          b-dropdown-item(to='/admin/recipes') Recipes
          b-dropdown-item(to='/admin/users') Users

          b-dropdown-divider
          b-dropdown-item(@click='loginModalShow') Log in
          b-dropdown-item Logout

    //- Login modal
    b-modal#loginModal(
      ref='loginModal'
      size='md'
      no-close-on-backdrop=true
      hide-header=true
      hide-footer=true
      centered=true)

      //- Modal content
      b-row.justify-content-md-center
        b-col.mt-3.mb-2(cols='11')
          font-awesome-icon.float-right(icon='times' @click='loginModalHide()')

        b-col(cols='10')
          //- Input username
          b-form-group(label='Username' label-for='username')
            b-form-input#username(required type='text' v-model='data.username')

          //- Input password
          b-form-group(label='Password' label-for='password')
            b-form-input#password(required type='password' v-model='data.password')

          p.text-center Don't remember your password?

          b-btn.mt-4.mb-3(block variant='success') Log in
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      data: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    loginModalShow () {
      this.$refs.loginModal.show()
    },
    loginModalHide () {
      this.$refs.loginModal.hide()
    }
  }
}
</script>

<style scoped lang='scss'>
@import '@/css/colors.scss';

.navbar {
  min-height: 5vh;
  background: #222;
  color: #9d9d9d;

  .navbar-nav.ml-auto {
    a.dropdown-item {
      color: black;
    }
    a.dropdown-item.active {
      color: $alchemy-green;
      background: rgb(230, 230, 230);
      font-weight: bold;
    }
  }
}
</style>
