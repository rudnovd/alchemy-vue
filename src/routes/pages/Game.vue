<template>
  <b-container>
    <b-row class='h-100'>
      <CategoriesList />

      <GameField>
        <b-row class='active-elements'>
          <ActiveElement
            v-for='element in activeElements'
            :key='element.gameId'
            :elementData='element'
          />

          <b-col cols='12'>
            <b-row class='h-100 row align-items-end'>
              <b-col cols='10' order='1'>
                <ActiveElementsAction />
              </b-col>

              <b-col class='ml-auto text-right' cols='2' order='2'>
                <ClearGameField />
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <div class='opened-elements'>
          <OpenedElement
            v-for='element in openedElements'
            :key='element._id'
            :elementData='element'
            v-if='element.show'
          />
        </div>
      </GameField>
    </b-row>
  </b-container>
</template>

<script>
import * as shortid from 'shortid'

import ActiveElement from '@/components/game/elements/ActiveElement.vue'

import OpenedElement from '@/components/game/elements/OpenedElement.vue'

import GameField from '@/components/game/GameField.vue'

import ClearGameField from '@/components/game/ClearGameField.vue'

import CategoriesList from '@/components/game/categories/CategoriesList.vue'

import ActiveElementsAction from '@/components/game/elements/ActiveElementsAction.vue'

import { mapGetters, mapActions } from 'vuex'

import { getElements } from '@/js/api/elements'

import { getCategories } from '@/js/api/categories'

import { getRecipes } from '@/js/api/recipes'

export default {
  components: {
    ActiveElement,
    OpenedElement,
    GameField,
    ClearGameField,
    CategoriesList,
    ActiveElementsAction
  },
  mounted () {
    const gameField = document.getElementsByClassName('game-field')
    this.setGameFieldSize({
      x: gameField[0].clientWidth,
      y: gameField[0].clientHeight
    })

    window.addEventListener('resize', () => {
      this.setGameFieldSize({
        x: gameField[0].clientWidth,
        y: gameField[0].clientHeight
      })
      this.updateOpenedElementsPositions()
    })

    if (this.openedElements.length === 0) {
      getElements().then(response => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.response.length; i++) {
            response.data.response[i].x = null
            response.data.response[i].y = null
            response.data.response[i].z = 100
            response.data.response[i].show = false
          }

          this.setOpenedElements(response.data.response)
        }
      })
    }

    if (this.openedCategories.length === 0) {
      getCategories().then(response => {
        if (response.status === 200) {
          this.setOpenedCategories(response.data.response)
          this.setSelectedCategory(this.openedCategories[0].name)
          this.updateOpenedElementsByCategory(this.selectedCategory)

          this.updateOpenedElementsPositions()
        }
      })
    }

    if (this.recipes.length === 0) {
      getRecipes().then(response => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.response.length; i++) {
            for (let j = 0; j < this.openedElements.length; j++) {
              if (response.data.response[i].result._id === this.openedElements[j]._id) {
                response.data.response[i].result.category = this.openedElements[j].category
              }
            }
          }
          this.setRecipes(response.data.response)
          this.findOpenedRecipes()
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      gameFieldSize: 'game/gameFieldSize',
      openedElements: 'elements/openedElements',
      activeElements: 'elements/activeElements',
      selectedElement: 'elements/selectedElement',
      openedCategories: 'categories/openedCategories',
      openedRecipes: 'recipes/openedRecipes',
      recipes: 'recipes/recipes',
      selectedCategory: 'categories/selectedCategory'
    })
  },
  methods: {
    ...mapActions({
      setGameFieldSize: 'game/setGameFieldSize',
      setOpenedElements: 'elements/setOpenedElements',
      setActiveElements: 'elements/setActiveElements',
      setOpenedCategories: 'categories/setOpenedCategories',
      updateOpenedElementsPositions: 'elements/updateOpenedElementsPositions',
      setOpenedRecipes: 'recipes/setOpenedRecipes',
      addOpenedRecipe: 'recipes/addOpenedRecipe',
      setRecipes: 'recipes/setRecipes',
      setSelectedCategory: 'categories/setSelectedCategory',
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory'
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
    }
  }
}
</script>

<style lang='scss' scoped>
.active-elements {
  min-height: 100%;
  min-width: 80%;
  padding: 20px;
}

.opened-elements {
  min-height: 100%;
  min-width: 20%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 360px) and (min-width: 100px) {
  .container {
    min-width: 360px;
    width: 95%;
  }
}

@media screen and (max-width: 500px) and (min-width: 360px) {
  .container {
    width: 95%;
  }
}

@media screen and (min-width: 1300px) and (max-width: 1920px) {
  .container {
    min-width: 100%;
    min-height: 100%;
  }
}

@media screen and (min-width: 1921px) {
  .container {
    min-width: 75%;
  }
}
</style>
