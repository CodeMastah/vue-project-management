<template>
  <div :id="'priority-wrap-'+compId" class="d-flex gap-05 align-center">
    <div v-if="priorityOutput.icon" :id="'priority-dot-'+compId " class="d-flex align-center justify-center shape-circle circle" :style="{'background-color': hex2rgba(priorityOutput.color)}" ><strong :style="{ color: priorityOutput.color}">!</strong>
    </div>
    <span v-if="priorityOutput.text && !iconOnly" :id="'priority-text'+compId" class="text-capitalize" :class="'text-' + priorityOutput.color">
      {{ priorityOutput.text }}
    </span>
  </div>
</template>

<script>
export default {

  name: 'PriorityComp',

  data() {
    return {

    }
  },
  props: {
    priority: { type: Object },
    iconOnly: { type: Boolean, default: false},
  },
  computed: {
    priorityOutput() {
      if (this.priority == null) {
        return { text: "", color: "", icon: false }
      }
      switch (this.priority.id) {
        case 1:
          return { text: this.priority.text, color: this.colors.ColorVariants.Danger, icon: true, iconVariant: "danger" }
        case 2:
          return { text: this.priority.text, color: this.colors.ColorVariants.Orange, icon: true, iconVariant: "orange" }
        case 3:
          return { text: this.priority.text, color: this.colors.ColorVariants.Success, icon: true, iconVariant: "success" }
        default:
          return { text: "", color: "", icon: false }
      }
    },
  	compId(){
      return Math.floor((Math.random()*1000)+1);
    },
  },
  methods: {
    hex2rgba (hex = this.colors.ColorVariants.Light, alpha = .16) {
      const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
      return `rgba(${r},${g},${b},${alpha})`;
    },
  }
}

</script>
<style lang="scss" scoped>
.circle {
  width: 24px;
  height: 24px;

  .dot {
    width: 8px;
    height: 8px;
  }
}
</style>
