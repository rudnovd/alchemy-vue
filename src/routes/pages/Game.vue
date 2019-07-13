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
          OpenedElement(
            v-for='element in openedElements'
            :key='element._id'
            :elementData='element'
          )
</template>

<script>
import * as shortid from 'shortid'

import Element from '@/components/game/Element.vue'

import OpenedElement from '@/components/game/OpenedElement.vue'

import GameField from '@/components/game/GameField.vue'

import ClearGameField from '@/components/game/ClearGameField.vue'

import { mapGetters, mapActions } from 'vuex'

import { getElements } from '@/js/api/elements'

export default {
  components: {
    Element,
    OpenedElement,
    GameField,
    ClearGameField
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
        y: 250,
        gameId: this.generateGameId()
      },
      {
        _id: '5c543755405e9d103878d4bf',
        name: 'Fire',
        category: 'Elements',
        x: 400,
        y: 250,
        gameId: this.generateGameId()
      },
      {
        _id: '5c543755405e9d103878d4c0',
        name: 'Water',
        category: 'Elements',
        x: 600,
        y: 250,
        gameId: this.generateGameId()
      }
    ])

    getElements().then(response => {
      if (response.status === 200) {
        for (let i = 0; i < response.data.response.length; i++) {
          response.data.response[i].x = null
          response.data.response[i].y = null
        }
        this.setOpenedElements(response.data.response)
      }
    })
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
    }),
    generateGameId () {
      let gameId = shortid.generate()

      for (let i = 0; i < this.activeElements; i++) {
        if (gameId === this.activeElements[i].gameId) {
          this.generateGameId()
          return
        }
      }

      return gameId
    }
  }
}
</script>

<style lang='scss' scoped>
.active-elements {
  min-height: 100%;
  min-width: 80%;
  border-right: 2px solid black;
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
