<template>
  <div class="py-05 px-105" id="sbt-wrapper">
    <div class="d-flex justify-between sub-title pb-05 border-bottom-gray2 " id="sbt-team-heading">
      <p class="text-gray5 font-md" id="sbt-team-para">Team </p>
    </div>
    <div class="section-title py-025" id="sbt-show-add-team-modal-wrap">
      <div class="d-inline-flex gap-05 align-center py-025 px-05 shape-rounded cursor-pointer bg-success-sub4 bg-hover-success-sub1 text-success text-hover-white" id="sbt-add-teammate-button" v-on:click="showAddTeamModal">
        <bib-icon icon="add" variant="success" :scale="1.25" class=""></bib-icon>
        <span id="sbt-new-teamMate">New Teammate</span>
      </div>
    </div>
    <template v-if="team.length">
      <bib-table :id="'teammate-' + index" class=" bg-white mt-1 border-top-light" :sections="team" headless :key="'teammate-' + team ? team[0].name : 100" :fields="tableFields" hide-no-column>
        <template #cell(name)="data">
          <user-info v-if="data.value.id" :userId="data.value.id"></user-info>
        </template>
        <template #cell(delete)="data">
          <span id="sbt-deleteMember" class="cursor-pointer shape-circle d-inline-flex align-center justify-center width-105 height-105 " v-on:click="deleteMember(data.value)">
            <bib-icon icon="trash" variant="danger"></bib-icon>
          </span>
        </template>
      </bib-table>
    </template>
    
    <loading :loading="loading"></loading>
    <add-member-to-task ref="taskTeamModal"></add-member-to-task>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TaskTeamFields } from '../../../config/constants';

export default {

  data() {
    return {
      index: 0,
      norecord: false,
      tableFields: TaskTeamFields,
      loading: false,
    }
  },
  props: {
    team: { type: Array },
  },

  computed: {
    ...mapGetters({
      task: 'task/getSelectedTask'
    }),
  },

  mounted() {
    this.$store.dispatch('task/fetchTeamMember', { id: this.task.id })
  },

  methods: {
    showAddTeamModal() {
      this.$refs.taskTeamModal.showTaskTeamModal = true
    },
    async deleteMember(member) {
      this.loading = true
      let confirmDelete = window.confirm("Are you sure want to delete " + member.name + "!")
      if (confirmDelete) {
        await this.$store.dispatch("task/deleteMember", { memberId: member.id, text: `removed "${member.name}" from task` })
          .then((res) => {
            this.key += 1
            this.$nuxt.$emit("refresh-history")
          })
          .catch(e => console.log(e))
        this.loading = false
      }
    },
  },
  
};

</script>
<style lang="scss" scoped>
.teammate {
  padding: 7px 0;
  border-bottom: 1px solid $gray6;

  &:first-child {
    border-top: 1px solid $gray6;
  }
}

</style>
