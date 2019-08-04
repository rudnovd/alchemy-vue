<template lang='pug'>
b-container(fluid)
  b-row
    CategoriesList
      SelectCategoryButton(
        v-for='openedCategory in openedCategories'
        :key='openedCategory._id'
        :categoryName='openedCategory.name'
      )
    GameField
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
          v-if='element.show'
        )
  b-row
    b-btn(variant='success' @click='openedRecipesModalShow') Show recipes
  OpenedRecipesModal

</template>

<script>
import * as shortid from 'shortid'

import Element from '@/components/game/Element.vue'

import OpenedElement from '@/components/game/OpenedElement.vue'

import GameField from '@/components/game/GameField.vue'

import ClearGameField from '@/components/game/ClearGameField.vue'

import CategoriesList from '@/components/game/CategoriesList.vue'

import OpenedRecipesModal from '@/components/game/OpenedRecipesModal.vue'

import SelectCategoryButton from '@/components/game/SelectCategoryButton.vue'

import { mapGetters, mapActions } from 'vuex'

import { getElements } from '@/js/api/elements'

import { getCategories } from '@/js/api/categories'

import { getRecipes } from '@/js/api/recipes'

export default {
  components: {
    Element,
    OpenedElement,
    GameField,
    ClearGameField,
    CategoriesList,
    OpenedRecipesModal,
    SelectCategoryButton
  },
  mounted () {
    const gameField = document.getElementsByClassName('game-field')
    this.setGameFieldSize({ x: gameField[0].clientWidth, y: gameField[0].clientHeight })

    window.addEventListener('resize', () => {
      this.setGameFieldSize({ x: gameField[0].clientWidth, y: gameField[0].clientHeight })
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
          this.setRecipes(response.data.response)
          this.findOpenedRecipes()
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      gameFieldSize: 'game/gameFieldSize',
      openedElements: 'game/openedElements',
      activeElements: 'game/activeElements',
      selectedElement: 'game/selectedElement',
      openedCategories: 'game/openedCategories',
      openedRecipes: 'game/openedRecipes',
      recipes: 'game/recipes',
      selectedCategory: 'game/selectedCategory'
    })
  },
  methods: {
    ...mapActions({
      setGameFieldSize: 'game/setGameFieldSize',
      setOpenedElements: 'game/setOpenedElements',
      setActiveElements: 'game/setActiveElements',
      setOpenedCategories: 'game/setOpenedCategories',
      updateOpenedElementsPositions: 'game/updateOpenedElementsPositions',
      setOpenedRecipes: 'game/setOpenedRecipes',
      addOpenedRecipe: 'game/addOpenedRecipe',
      setRecipes: 'game/setRecipes',
      setSelectedCategory: 'game/setSelectedCategory',
      updateOpenedElementsByCategory: 'game/updateOpenedElementsByCategory'
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
    openedRecipesModalShow () {
      this.$root.$emit('openedRecipesModalShow')
    }
  }
}
</script>

<style lang='scss' scoped>
.active-elements {
  min-height: 100%;
  min-width: 80%;
  border-right: 2px solid black;
  padding: 20px;
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

@media screen and (max-width : 360px) and (min-width : 100px) {
  .container {
    min-width: 360px;
  }
}

@media screen and (max-width : 500px) and (min-width : 100px) {
  .container {
    max-width: 90%;
  }
}

@media screen and (min-width : 1200px) {
  .container {
    min-width: 1200px;
  }
}

@media screen and (min-width : 1300px) {
  .container {
    min-width: 1300px;
  }
}

@media screen and (min-width : 1400px) {
  .container {
    min-width: 1400px;
  }
}
</style>
