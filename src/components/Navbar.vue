<template lang='pug'>
  b-navbar.mb-3(toggleable='sm' type='dark' variant='dark')

    b-navbar-brand(to="/") Home

    b-collapse#nav_collapse(is-nav)

    b-navbar-nav(class='ml-auto')

      b-nav-item-dropdown(text='Username' right)
        b-dropdown-item(to="/game") Game
        b-dropdown-item(to="/admin/dashboard") Dashboard
        b-dropdown-item(to="/admin/editor") Editor
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="scss">
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
