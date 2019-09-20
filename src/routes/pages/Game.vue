<template>
  <b-container>
    <b-row class='game-row'>

      <CategoriesList class='pl-0 pl-sm-0 pl-md-2 pl-lg-3 pl-xl-3 pr-0 pr-sm-0 pr-md-2 pr-lg-3 pr-xl-3 col-sm-12 col-md-3 col-lg-2 col-xl-2 col-12'/>

      <b-col class='game-field pl-0' cols='12' sm='12' md='9' lg='10' xl='10'>
        <b-col cols='9' sm='9' md='9' lg='9' xl='9' class='active-elements'>
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
        </b-col>

        <div class='opened-elements'>
          <OpenedElement
            :elementData='element'
            v-for='element in filteredOpenedElements'
            :key='element._id'
          />
        </div>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import * as shortid from 'shortid'

import ActiveElement from '@/components/game/elements/ActiveElement.vue'

import OpenedElement from '@/components/game/elements/OpenedElement.vue'

import ClearGameField from '@/components/game/ClearGameField.vue'

import CategoriesList from '@/components/game/categories/CategoriesList.vue'

import ActiveElementsAction from '@/components/game/elements/ActiveElementsAction.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ActiveElement,
    OpenedElement,
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

    document.getElementsByClassName('opened-elements')[0].style.width = gameField[0].clientWidth + 'px'
    const openedElementsField = document.getElementsByClassName('opened-elements')
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
@media screen and (max-width: 767px) {
  .game-field {
    height: 80%;
  }

  .active-elements {
    height: calc(100vh - 166px);
  }
}

@media screen and (min-width: 768px) {
  .game-field {
    height: 80%;
    margin-left: 300px;
  }

  .active-elements {
    height: calc(100vh - 66px);
  }
}

.game-field {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  background-color: rgb(236, 240, 241);
}

.game-row {
  height: 100%;
  margin: 0;
}

.opened-elements {
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  height: 100%;
  max-height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.game-field {
  width: 100%;
}

.container {
  height: calc(100% - 66px);
  min-width: 100%;
  padding: 0;
}

.active-elements {
  padding: 10px;
  z-index: 200;
}

</style>
