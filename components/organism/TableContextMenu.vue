<template>
  <div :id="'c_menu_'+id" class="table-context-menu" v-show="show" v-click-outside="onClickOutside" :style="position">
    <div class="list" id="table-context-menu-list">
      <!-- <span v-for="(item, index) in items" :key="item.label+index" class="list__item cursor-pointer" :class=" ['list__item__'+item.variant] " :id="'table-context-menu-'+index" v-on:click.stop="onItemClick(item)" @mouseenter="deleteBtnHover = true" @mouseleave="deleteBtnHover = false">
        <bib-icon v-if="item.icon && item.label != 'Delete'" :icon="item.icon" :variant="activeVariant(item)" class="mr-05"></bib-icon> 
        <bib-icon v-if="item.icon && item.label == 'Delete' && deleteBtnHover == false" :icon="item.icon" variant="danger" class="mr-05"></bib-icon>
        <bib-icon v-else-if="item.icon && item.label == 'Delete' && deleteBtnHover == true" :icon="item.icon" variant="white" class="mr-05"></bib-icon>
        {{item.label}}
      </span> -->
      <span v-for="(item, index) in items" :key="item.label + index" class="list__item cursor-pointer" :class="['list__item__' + item.variant]" :id="'table-context-menu-' + index" v-on:click.stop="onItemClick(item)" @mouseenter="setDeleteBtnHover(index, true)" @mouseleave="setDeleteBtnHover(index, false)">
        <bib-icon v-if="item.icon && item.label !== 'Delete'" :icon="item.icon" :variant="activeVariant(item)" class="mr-05"></bib-icon>
        <bib-icon v-else-if="item.icon && item.label === 'Delete'" :icon="item.icon" :variant="deleteIconVariant(index)" class="mr-05"></bib-icon>
        {{item.label}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

  name: 'TableContextMenu',
  props: {
    items: {
      type: Array,
      required: true,
      default () {
        return [
          { label: 'Action one', event: 'action-one', variant: '', icon: '', iconVariant: 'gray5' },
          { label: 'Action two', event: 'action-two', variant: '', icon: '', iconVariant: 'gray5' },
          { label: 'Action three', event: 'action-three', variant: '', icon: '', iconVariant: 'gray5' },
        ]
      }
    },
    show: { type: Boolean, default: false },
    coordinates: { type: Object, default: function () { return { left: '50%', top: '50%' } } },
    activeItem: { type: Object },
  },

  data() {
    return {
      id: this._uid,
      deleteBtnHover: Array(this.items.length).fill(false)
    }
  },
  watch: {
    coordinates(newValue) {
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }

      let observer = new IntersectionObserver(this.callback, options);
      let target = document.querySelector('#c_menu_' + this.id);
      observer.observe(target);
    },
  },
  computed: {
    ...mapGetters({
      favTasks: 'task/getFavTasks',
      favProjects: 'project/getFavProjects'
    }),
    position() {
      return this.coordinates
    },
    
  },
  methods: {
    onItemClick(item){
      this.$emit('item-click', item.event)
      this.$emit('close-context')
    },
    onClickOutside() {
      this.$emit('close-context')
    },
    callback(entries, observer) {
      entries.forEach((entry) => {
        
        if (!entry.isIntersecting) {
          if (entry.boundingClientRect?.right > entry.rootBounds?.width) {
            this.position.left = (entry.rootBounds?.width - entry.boundingClientRect?.width) - 10 + 'px'
          }
          if (entry.boundingClientRect?.bottom > entry.rootBounds?.height) {
            this.position.top = (entry.rootBounds?.height - entry.boundingClientRect?.height) - 10 + 'px'
          }
        } 
      });
    },
    activeVariant(item){
      
      if (item.label.includes('Completed')) {
        return this.variant='success'
      }

      if (item.label=='Remove favorite') {
        return this.variant='primary'
      }

      if (this.activeItem) {

        if (item.label.includes('Complete')) {
          return this.activeItem.statusId == 5 ? 'success': 'gray5'
        }

        if (item.label.includes('Favorites')) {
          let fata = this.favTasks.some(ft=>ft.taskId == this.activeItem.id)
          let fapo = this.favProjects.some(fp=>fp.id == this.activeItem.id)
          return fata ? 'primary': 'gray5'
        }

      }
    },

    setDeleteBtnHover(index, value) {
      this.$set(this.deleteBtnHover, index, value);
    },

    deleteIconVariant(index) {
      return this.deleteBtnHover[index] ? 'white' : 'danger';
    }
  }
}

</script>
<style lang="css" scoped>
.table-context-menu {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 11;
  width: 12rem;
  transition: top 200ms ease-out, left 300ms ease-out;
  will-change: top, left;
}

.list {
  box-shadow: 0 2px 10px rgba(100, 100, 100, 0.25);
  border: 1px solid $gray4;

  &__item {}
}

</style>
