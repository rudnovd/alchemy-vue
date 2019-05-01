<template lang='pug'>
  b-container
    b-row
      b-col(class='game-field' ref='gameField' cols='12')
        b-row
          div(class='elements-field')
            game-element(
              v-for='element in activeElements'
              :key='element.gameId'
              :elementData='element'
            )
            font-awesome-icon(class='fa-3x clear-field-button' icon='trash' @dblclick='clearGameField')
            b-button(variant='warning' size='sm' :activated='dev' @click='dev = !dev')
              | Dev
            b-button(variant='success' size='sm' @click='addRandomElement()')
              | Add random element
          div(class='elements-list-field')
            elements-list(
              v-for='element in openedElements'
              :key='element._id'
              :elementData='element'
            )

        p Dev: {{ dev }}
        template(v-if='dev === true')
          p(): small Selected Element: name: {{ selectedElement.name }}, gameId: {{ selectedElement.gameId }}, x: {{ selectedElement.x }}, y: {{ selectedElement.y }}
          p(): small Active elements:
          p(v-for='(value, index) in activeElements')
            small name: {{ value.name }}, gameId: {{ value.gameId }}, x: {{ value.x }}, y: {{ value.y }}
          p(): small Opened elements:
          p(v-for='(value, index) in openedElements')
            small name: {{ value.name }}, gameId: {{ value.gameId }}, x: {{ value.x }}, y: {{ value.y }}
          p {{ error }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import gameElement from '@/components/game/gameElement.vue'

import elementsList from '@/components/game/elementsList.vue'

import { getAccountElements } from '@/js/api/account'

import * as shortid from 'shortid'

export default {
  name: 'Game',
  components: {
    'game-element': gameElement,
    'elements-list': elementsList
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

      openedCategories: 'game/openedCategories',

      error: 'game/error'
    })
  },
  data () {
    return {
      dev: false
    }
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
      removeAllActiveElements: 'game/removeAllActiveElements',

      setSelectedElement: 'game/setSelectedElement',
      setSelectedElementCoordinates: 'game/setSelectedElementCoordinates',
      removeSelectedElement: 'game/removeSelectedElement',

      setOpenedCategories: 'game/setOpenedCategories',
      updateOpenedElementsPositions: 'game/updateOpenedElementsPositions'
    }),

    clearGameField () {
      this.removeAllActiveElements()
    },
    addRandomElement () {
      let x = Math.floor(Math.random() * (this.gameFieldSize.x - 0 + 1)) + 0
      let y = Math.floor(Math.random() * (this.gameFieldSize.y - 0 + 1)) + 0

      let element = {
        id: shortid.generate(),
        name: shortid.generate(),
        x: x,
        y: y
      }
      this.setSelectedElement(element)
      this.addActiveElement(element)
      this.setSelectedElement(null)
    }
  }
}
</script>

<style lang='scss'>
.game-field {
  position: relative;
  box-shadow: 0 0 5px color('alchemy-light-green');
  background-color: color('white');
  min-height: 60vh;
  min-width: 100%;
  max-width: inherit;
}

.elements-field {
  min-height: 100%;
  min-width: 80%;
}

.elements-list-field {
  min-height: 60vh;
  min-width: 20%;
}

.clear-field-button {
  color: color('dark');
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
