<template>
  <section class='section-game'>
    <section class='section-categories'>
      <CategoriesList/>
    </section>

    <section class='section-game-board'>
      <b-container>
        <div class='game-board'>
          <ActiveElement
            v-for='element in activeElements'
            :key='element.gameId'
            :elementData='element'
          />

          <b-row class='h-100 row align-items-end'>
            <b-col class='pr-0 pr-sm-0 pr-md-0' cols='9' sm='9' md='9' lg='8' xl='8' order='1'>
              <ActiveElementsAction v-show='history.last.firstElement'/>
            </b-col>

            <b-col class='ml-auto text-right' cols='3' sm='3' md='3' lg='2' xl='2' order='2'>
              <ClearGameField />
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <section class='section-opened-elements'>
      <OpenedElementsList ref='openedElements'>
        <OpenedElement :elementData='element' v-for='element in filteredOpenedElements' :key='element._id'/>
      </OpenedElementsList>
    </section>
  </section>
</template>

<script>
import * as shortid from 'shortid'

import ActiveElement from '@/components/game/elements/ActiveElement.vue'

import OpenedElement from '@/components/game/elements/OpenedElement.vue'

import ClearGameField from '@/components/game/ClearGameField.vue'

import CategoriesList from '@/components/game/categories/CategoriesList.vue'

import ActiveElementsAction from '@/components/game/elements/ActiveElementsAction.vue'

import OpenedElementsList from '@/components/game/elements/OpenedElementsList.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ActiveElement,
    OpenedElement,
    ClearGameField,
    CategoriesList,
    ActiveElementsAction,
    OpenedElementsList
  },
  mounted () {
    const gameField = document.getElementsByClassName('game-board')
    this.setGameFieldSize({
      x: gameField[0].clientWidth,
      y: gameField[0].clientHeight
    })

    const openedElementsField = document.getElementsByClassName('section-opened-elements')
    this.setOpenedElementsFieldSize({
      width: openedElementsField[0].clientWidth,
      height: openedElementsField[0].clientHeight
    })

    window.addEventListener('resize', () => {
      this.updateElementsPositions(gameField, openedElementsField)
    })

    window.addEventListener('ondeviceorientation', () => {
      this.updateElementsPositions(gameField, openedElementsField)
    })

    this.getOpenedElements()

    this.getOpenedCategories().then(() => {
      this.setSelectedCategory(this.openedCategories[0].name)
      this.updateOpenedElementsByCategory(this.selectedCategory)
      this.updateOpenedElementsPositions()
    })

    this.getRecipes().then(() => {
      this.findOpenedRecipes()
    })
  },
  computed: {
    ...mapGetters({
      openedElements: 'elements/openedElements',
      activeElements: 'elements/activeElements',
      openedCategories: 'categories/openedCategories',
      recipes: 'recipes/recipes',
      selectedCategory: 'categories/selectedCategory',
      history: 'game/history'
    }),
    filteredOpenedElements () {
      return this.openedElements.filter(openedElement => {
        if (openedElement.show) {
          return openedElement
        }
      })
    }
  },
  methods: {
    ...mapActions({
      setGameFieldSize: 'game/setGameFieldSize',
      getOpenedElements: 'elements/getOpenedElements',
      setActiveElements: 'elements/setActiveElements',
      getOpenedCategories: 'categories/getOpenedCategories',
      setSelectedCategory: 'categories/setSelectedCategory',
      updateOpenedElementsPositions: 'elements/updateOpenedElementsPositions',
      setOpenedRecipes: 'recipes/setOpenedRecipes',
      getRecipes: 'recipes/getRecipes',
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory',
      setOpenedElementsFieldSize: 'game/setOpenedElementsFieldSize'
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
    },
    findOpenedRecipes () {
      let userRecipes = []
      for (let i = 0; i < this.recipes.length; i++) {
        let firstElement = this.recipes[i].recipe[0]._id
        let secondElement = this.recipes[i].recipe[1]._id

        let firstFound = false
        let secondFound = false
        for (let j = 0; j < this.openedElements.length; j++) {
          if (firstElement === this.openedElements[j]._id) {
            firstFound = true
          }
          if (secondElement === this.openedElements[j]._id) {
            secondFound = true
          }
          if (firstFound && secondFound) {
            userRecipes.push(this.recipes[i])
            break
          }
        }
        firstFound = false
        secondFound = false
      }
      this.setOpenedRecipes(userRecipes)
    },
    updateElementsPositions (gameField, openedElementsField) {
      this.setGameFieldSize({
        x: gameField[0].clientWidth,
        y: gameField[0].clientHeight
      })
      this.setOpenedElementsFieldSize({
        width: openedElementsField[0].clientWidth,
        height: openedElementsField[0].clientHeight
      })
      this.updateOpenedElementsPositions()
    }
  }
}
</script>

<style lang='scss' scoped>
.section-game {
  padding-top: 10px;
  height: 90vh;
}

.section-opened-elements {
  position: absolute;
  right: 0;
  top: 66px;
  max-width: 300px;
  width: 100%;
  height: 90vh
}

.section-game-board {
  height: 90vh;

  .container {
    height: 100%;
  }

  .game-board {
    position: relative;
    border: 1px solid black;
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .game-board {
    height: 100%;
  }

  .section-categories {
    position: absolute;
    left: 0;
    max-width: 300px;
    width: 100%;
    height: 90vh
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .game-board {
    height: 80%;
  }

  .section-categories {
    position: absolute;
    left: 0;
    width: 100%;
    height: 200px;
  }

  .game-board {
    top: 200px;
  }
}
</style>
