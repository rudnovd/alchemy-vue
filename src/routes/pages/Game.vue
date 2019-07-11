<template lang='pug'>
b-container
  b-row
    GameField
      b-row
        div(class='active-elements')
          Element(
            v-for='element in activeElements'
            :key='element.gameId'
            :elementData='element'
          )
          ClearGameField

        div(class='opened-elements')
          OpenedElementsList(
            v-for='element in openedElements'
            :key='element._id'
            :elementData='element'
          )
</template>

<script>
import Element from '@/components/game/Element.vue'

import OpenedElementsList from '@/components/game/OpenedElementsList.vue'

import GameField from '@/components/game/GameField.vue'

import ClearGameField from '@/components/game/ClearGameField.vue'

import { mapGetters, mapActions } from 'vuex'

import { getAccountElements } from '@/js/api/account'

export default {
  components: {
    Element,
    OpenedElementsList,
    GameField,
    ClearGameField
  },
  beforeRouteEnter (to, from, next) {
    getAccountElements().then(response => {
      if (response.status === 200) {
        for (let i = 0; i < response.data.elements.length; i++) {
          response.data.elements[i].x = null
          response.data.elements[i].y = null
        }
        next(vm => {
          vm.setOpenedElements(response.data.elements)
          vm.setOpenedCategories(response.data.elements)
        })
      } else {
        next()
      }
    })
  },
  mounted () {
    const gameField = document.getElementsByClassName('game-field')
    this.setGameFieldSize({ x: gameField[0].clientWidth, y: gameField[0].clientHeight })

    window.addEventListener('resize', () => {
      this.setGameFieldSize({ x: gameField[0].clientWidth, y: gameField[0].clientHeight })
      this.updateOpenedElementsPositions()
    })

    this.setActiveElements([
      {
        _id: '5c543755405e9d103878d4be',
        name: 'Earth',
        category: 'Elements',
        x: 200,
        y: 250
      },
      {
        _id: '5c543755405e9d103878d4bf',
        name: 'Fire',
        category: 'Elements',
        x: 400,
        y: 250
      },
      {
        _id: '5c543755405e9d103878d4c0',
        name: 'Water',
        category: 'Elements',
        x: 600,
        y: 250
      }
    ])
  },
  computed: {
    ...mapGetters({
      gameFieldSize: 'game/gameFieldSize',

      openedElements: 'game/openedElements',
      activeElements: 'game/activeElements',
      selectedElement: 'game/selectedElement',

      openedCategories: 'game/openedCategories'
    })
  },
  methods: {
    ...mapActions({
      setGameFieldSize: 'game/setGameFieldSize',

      setOpenedElements: 'game/setOpenedElements',
      addOpenedElement: 'game/addOpenedElement',
      removeOpenedElement: 'game/removeOpenedElement',

      setActiveElements: 'game/setActiveElements',
      addActiveElement: 'game/addActiveElement',
      removeActiveElement: 'game/removeActiveElement',

      setSelectedElement: 'game/setSelectedElement',
      setSelectedElementCoordinates: 'game/setSelectedElementCoordinates',
      removeSelectedElement: 'game/removeSelectedElement',

      setOpenedCategories: 'game/setOpenedCategories',
      updateOpenedElementsPositions: 'game/updateOpenedElementsPositions'
    })
  }
}
</script>

<style lang='scss'>
.active-elements {
  min-height: 100%;
  min-width: 80%;
}

.opened-elements {
  min-height: 60vh;
  min-width: 20%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
