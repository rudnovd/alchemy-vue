<template>
  <section class="section-demo-game">
    <div class="demo-categories">
      <CategoriesList />
    </div>

    <div class="demo-game-board">
      <ActiveElement v-for="element in activeElements" :key="element.gameId" :element-data="element" />
      <div class="control-panel">
        <ActiveElementsHistory v-show="history.last.firstElement" />
        <ClearGameField />
      </div>
    </div>

    <div class="demo-opened-elements">
      <OpenedElementsList>
        <OpenedElement v-for="element in filteredByOpenedElements" :key="element._id" :element-data="element" />
      </OpenedElementsList>
    </div>

    <NewElementModal />

    <v-tour name="gameTour" :steps="steps"></v-tour>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ActiveElement from '@/components/game/elements/ActiveElement.vue'
import OpenedElement from '@/components/game/elements/OpenedElement.vue'
import ClearGameField from '@/components/game/ClearGameField.vue'
import CategoriesList from '@/components/game/categories/CategoriesList.vue'
import OpenedElementsList from '@/components/game/elements/OpenedElementsList.vue'
import ActiveElementsHistory from '@/components/game/elements/ActiveElementsHistory.vue'
import NewElementModal from '@/components/game/elements/NewElementModal.vue'

export default {
  name: 'Demo',
  components: {
    ActiveElement,
    OpenedElement,
    CategoriesList,
    OpenedElementsList,
    ClearGameField,
    ActiveElementsHistory,
    NewElementModal
  },
  data() {
    return {
      steps: [
        {
          target: '.section-demo-game-board',
          content: `Game board`
        },
        {
          target: '.section-demo-opened-elements',
          content: `Opened elements`
        },
        {
          target: '.section-demo-categories',
          content: `Categories`
        }
      ]
    }
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
    filteredByOpenedElements() {
      return this.openedElements.filter(openedElement => {
        return openedElement.show === true
      })
    }
  },
  mounted() {
    const gameField = document.getElementsByClassName('section-demo-game-board')
    const gameFieldSizeListener = this.setGameFieldSize(gameField)

    window.addEventListener('resize', () => {
      if (gameField.length > 0) {
        this.setGameFieldSize(gameField)
      } else {
        window.removeEventListener('resize', gameFieldSizeListener)
      }
    })

    // this.setSelectedCategory(this.openedCategories[0])
    // this.updateOpenedElementsByCategory(this.openedCategories[0])
    // this.updateOpenedElementsPositions()

    if (this.activeElements.length === 0) {
      // this.addActiveElement()
      // this.setOpenedRecipes()
      // this.setOpenedCategories([])
      // this.setOpenedElement([])
      this.$tours['gameTour'].start()
    }
  },
  methods: {
    ...mapActions({
      setGameFieldSize: 'game/setGameFieldSize',
      getOpenedElements: 'elements/getOpenedElements',
      getOpenedCategories: 'categories/getOpenedCategories',
      setSelectedCategory: 'categories/setSelectedCategory',
      updateOpenedElementsPositions: 'elements/updateOpenedElementsPositions',
      setOpenedRecipes: 'recipes/setOpenedRecipes',
      getRecipes: 'recipes/getRecipes',
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory',
      updateActiveElementsPositions: 'elements/updateActiveElementsPositions',
      addActiveElement: 'elements/addActiveElement'
    }),
    findOpenedRecipes() {
      let userRecipes = []
      this.recipes.forEach(recipe => {
        const firstElement = this.openedElements.filter(openedElement => {
          return recipe.recipe[0]._id === openedElement._id
        })
        const secondElement = this.openedElements.filter(openedElement => {
          return recipe.recipe[1]._id === openedElement._id
        })
        const resultElement = this.openedElements.filter(openedElement => {
          return recipe.result._id === openedElement._id
        })

        if (firstElement.length > 0 && secondElement.length > 0 && resultElement.length > 0) {
          userRecipes.push(recipe)
        }
      })
      this.setOpenedRecipes(userRecipes)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-demo-game {
  display: flex;
  flex: 1;
  padding-top: 10px;
  height: 90vh;
  user-select: none;

  .demo-categories {
    display: flex;
    flex: 1 0 0;
    order: 1;
  }

  .demo-game-board {
    position: relative;
    flex: 2 0 0;
    order: 2;
    height: 100%;
    padding: 5px;
    box-shadow: 0 0 5px 0 rgb(170, 170, 170);

    .control-panel {
      display: flex;
      height: 100%;
      align-items: flex-end;

      .clear-game-field-button {
        margin-left: auto;
      }
    }
  }

  .demo-opened-elements {
    display: flex;
    flex: 1 0 0;
    order: 3;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 300px;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 5px 0 rgb(170, 170, 170);
    margin-right: 5px;

    @extend %scrollbar;
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .demo-game-board {
    margin-left: 20px;
    margin-right: 20px;
  }

  .demo-categories {
    height: 100%;
    max-width: 300px;
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .section-demo-game {
    flex-wrap: wrap;

    .demo-categories {
      flex: 100% 0 0;
      height: 110px;
    }

    .demo-game-board {
      height: 80vh;
    }

    .demo-opened-elements {
      height: 80vh;
    }
  }
}
</style>
