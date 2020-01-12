<template>
  <section class="section-game">
    <section class="section-categories">
      <CategoriesList />
    </section>

    <section class="section-game-board">
      <ActiveElement v-for="element in activeElements" :key="element.gameId" :element-data="element" />
      <div class="control-panel">
        <ActiveElementsHistory v-show="history.last.firstElement" />
        <ClearGameField />
      </div>
    </section>

    <section class="section-opened-elements">
      <OpenedElementsList>
        <OpenedElement v-for="element in filteredByOpenedElements" :key="element._id" :element-data="element" />
      </OpenedElementsList>
    </section>

    <NewElementModal />
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
  name: 'Game',
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
      showDemoToGameModal: false
    }
  },
  computed: {
    ...mapGetters({
      openedElements: 'elements/openedElements',
      activeElements: 'elements/activeElements',
      openedCategories: 'categories/openedCategories',
      recipes: 'recipes/recipes',
      selectedCategory: 'categories/selectedCategory',
      history: 'game/history',
      openedRecipes: 'recipes/openedRecipes',
      user: 'user/user',
      elementsState: 'elements/state'
    }),
    filteredByOpenedElements() {
      return this.openedElements.filter(openedElement => {
        return openedElement.show === true
      })
    }
  },
  mounted() {
    const gameField = document.getElementsByClassName('section-game-board')
    const gameFieldSizeListener = this.setGameFieldSize(gameField)

    window.addEventListener('resize', () => {
      if (gameField.length > 0) {
        this.setGameFieldSize(gameField)
      } else {
        window.removeEventListener('resize', gameFieldSizeListener)
      }
    })

    if (this.user.isLoggedIn) {
      if (!this.openedElements.length) {
        this.getOpenedElements().then(() => {
          this.getOpenedCategories(this.openedElements).then(() => {
            this.setSelectedCategory(this.openedCategories[0])
            this.updateOpenedElementsByCategory(this.openedCategories[0])
            this.updateOpenedElementsPositions()
          })
        })
      }

      if (!this.openedRecipes.length) {
        this.getOpenedRecipes()
      }
    } else {
      if (!this.openedElements.length) {
        this.getInitialElements().then(() => {
          if (!this.elementsState.error) {
            this.openedElements.forEach(initialElement => {
              this.addActiveElement({
                _id: initialElement._id,
                category: initialElement.category,
                name: initialElement.name,
                x: gameField[0].clientWidth / 2 + 100,
                y: gameField[0].clientHeight / 2
              })
            })
          }
        })
      }

      if (!this.openedRecipes.length) {
        this.getInitialRecipes()
      } else if (this.openedRecipes.length === 10) {
        this.showDemoToGameModal = true
      }
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
      getOpenedRecipes: 'recipes/getOpenedRecipes',
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory',
      getInitialElements: 'elements/getInitialElements',
      getInitialRecipes: 'recipes/getInitialRecipes'
    })
  }
}
</script>

<style lang="scss" scoped>
.section-game {
  display: flex;
  overflow: hidden;
  flex: 0 0 100%;
  padding-top: 0.5rem;

  height: 100%;
  user-select: none;
  flex-wrap: wrap;

  padding-bottom: 1rem;

  @include media-md {
    padding-bottom: 0.5rem;
  }

  @include media-lg {
    flex-wrap: nowrap;
  }
}

.section-categories {
  display: flex;
  order: 1;
  flex: 0 0 100%;
  height: 115px;

  @include media-lg {
    flex: 0 0 25%;
    height: 100%;
    max-width: 300px;
  }
}

.section-game-board {
  position: relative;
  flex: 1 0 0;
  order: 2;
  height: 80%;
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
  box-shadow: 0 0 5px 0 rgb(170, 170, 170);

  @include media-lg {
    height: 100%;
  }

  .control-panel {
    display: flex;
    height: 100%;
    align-items: flex-end;

    .clear-game-field-button {
      margin-left: auto;
    }
  }
}

.section-opened-elements {
  display: flex;
  flex: 0 0 25%;
  order: 3;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

  width: 100%;
  height: 80%;
  box-shadow: 0 0 5px 0 rgb(170, 170, 170);

  @include media-lg {
    max-width: 300px;
    height: 100%;
  }

  @extend %scrollbar;
}
</style>
