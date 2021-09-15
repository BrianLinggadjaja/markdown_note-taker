<template>
  <div class="modal-card" style="width: auto">
    <section class="modal-card-head">
      <p class="modal-card-title">Note Editor</p>
    </section>

    <section class="modal-card-body">
      <b-field label="Note Title (Required)">
        <b-input
          placeholder="New note title"
          v-model="title"
          icon-pack="fa"
          icon="hashtag"
          maxlength="36"
          required
          />
      </b-field>

      <b-field label="Assigned Notebook">
        <b-input
          placeholder="Notebook"
          v-model="attachedNotebook"
          icon-pack="fa"
          icon="book"
          maxlength="36"
          />
      </b-field>

      <b-field label="Attached Tags">
        <b-taginput
          v-model="attachedTags"
          type="is-info"
          icon-pack="fa"
          icon="tags"
          maxtags="6"
          maxlength="8"
          />
      </b-field>
    </section>

    <section class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">
        Close
      </button>
      <button class="button is-accent" @click="updateNote()">
        Update Note
      </button>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      title: null,
      attachedNotebook: null,
      attachedTags: [],
      test: 'test'
    }
  },

  methods: {
    ...mapActions(['createNote', 'changeSelectedNote']),

    updateNote: function () {
      this.validateNewNote()
    },

    validateNewNote: function () {
      const cleanNoteObj = {
        title: this.removeDuplicateSpaces(this.title),
        isBookmarked: false,
        attachedNotebook: this.removeDuplicateSpaces(this.attachedNotebook),
        tags: this.attachedTags
      }

      const hasValidTitle = this.isValidTitle(cleanNoteObj.title)

      if (hasValidTitle) {
        this.$store.dispatch('updateNote', cleanNoteObj)
        this.$store.dispatch('updateAllNotesRef')
        this.$store.dispatch('changeSelectedNote', this.title)
        this.$emit('close')
      }
    },

    removeDuplicateSpaces: function (value) {
      if (value) {
        // Trim leading & trailing spaces
        value.trim()

        // Remove duplicate spaces
        value.replace(/\s+/g, ' ')
      }

      return value
    },

    // Validation
    isValidTitle: function (title) {
      if (title) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card {
  @media screen and (min-width: $tablet) {
    min-width: 20rem;
  }

  &-foot {
    justify-content: flex-end;
  }
}
</style>
