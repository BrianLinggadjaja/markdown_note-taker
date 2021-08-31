<template>
  <div class="editor">
    <section class="editor-title">
      <h1>
        <font-awesome-icon icon="hashtag" />
        {{ selectedNote.title }}
      </h1>
    </section>

    <!-- <section>
      <b-button @click="deleteNote" size="is-small" class="button is-danger">Delete</b-button>
      <b-button @click="deleteNote" size="is-small" class="button is-danger">Update Name</b-button>
    </section> -->

    <textarea id="editorPreview"></textarea>
  </div>
</template>

<script>
import EasyMDE from 'easymde'
import './../../scss/libraries/_editor.scss'
import { mapActions, mapGetters } from 'vuex'
import NoteEditor from './NoteEditor'

export default {
  computed: {
    ...mapGetters({
      allNotesRefsArray: 'getAllNoteRefs',
      selectedNote: 'getSelectedNote'
    })
  },

  data () {
    return {
      markdownEditor: null
    }
  },

  mounted () {
    this.initEditor()
  },

  updated () {
    this.populateEditorFromState()
  },

  methods: {
    ...mapActions([
      'saveSelectedNote',
      'bookmarkNote'
    ]),

    initEditor: function () {
      this.markdownEditor = new EasyMDE({
        element: document.getElementById('editorPreview'),
        spellChecker: false,
        status: false,
        hideIcons: ['guide'],
        autoDownloadFontAwesome: false,
        renderingConfig: {
          codeSyntaxHighlighting: false
        },
        toolbar: [
          {
            name: 'heading',
            action: EasyMDE.toggleHeadingSmaller,
            className: 'icon-header',
            title: 'Heading Level'
          },
          {
            name: 'bold',
            action: EasyMDE.toggleBold,
            className: 'icon-bold',
            title: 'Bold'
          },
          {
            name: 'italic',
            action: EasyMDE.toggleItalic,
            className: 'icon-italic',
            title: 'Italic'
          },
          '|',
          {
            name: 'horizontal-rule',
            action: EasyMDE.drawHorizontalRule,
            className: 'icon-minus',
            title: 'Horizontal Line'
          },
          {
            name: 'quote',
            action: EasyMDE.toggleBlockquote,
            className: 'icon-quote-left',
            title: 'Quote'
          },
          {
            name: 'unordered-list',
            action: EasyMDE.toggleUnorderedList,
            className: 'icon-list-ul',
            title: 'Un-ordered List'
          },
          {
            name: 'ordered-list',
            action: EasyMDE.toggleOrderedList,
            className: 'icon-list-ol',
            title: 'Ordered List'
          },
          '|',
          {
            name: 'preview',
            action: EasyMDE.togglePreview,
            className: 'icon-eye no-disable',
            title: 'Toggle Preview'
          },
          {
            name: 'side-by-side',
            action: EasyMDE.toggleSideBySide,
            className: 'icon-columns no-disable no-mobile',
            title: 'Toggle Side by Side (Full-Screen)'
          },
          {
            name: 'fullscreen',
            action: EasyMDE.toggleFullScreen,
            className: 'icon-arrows-alt no-disable no-mobile',
            title: 'Toggle Full-Screen'
          },
          '|',
          {
            name: 'link',
            action: EasyMDE.drawLink,
            className: 'icon-chain',
            title: 'Insert Link'
          },
          {
            name: 'image',
            action: EasyMDE.drawImage,
            className: 'icon-image',
            title: 'Insert Image'
          },
          '|',
          {
            name: 'custom',
            action: () => this.$store.dispatch('bookmarkNote', this.selectedNote.title),
            className: 'icon-bookmark',
            title: 'Edit Name'
          },
          {
            name: 'custom',
            action: () => this.openNoteEditor(),
            className: 'icon-edit',
            title: 'Edit Name'
          },
          {
            name: 'custom',
            action: () => this.deleteNote(),
            className: 'icon-trash',
            title: 'Delete Note'
          }
        ]
      })

      this.populateEditorFromState()

      // Attach instance to "this"
      const instance = this
      this.markdownEditor.codemirror.on('change', function () {
        const editorText = instance.markdownEditor.value()

        instance.saveNoteInState(JSON.stringify(editorText))
        instance.copyEditorMarkdown(editorText)
      })
    },

    populateEditorFromState: function () {
      this.markdownEditor.value(JSON.parse(this.selectedNote.markdown))
    },

    // Save text to clipboard
    copyEditorMarkdown: function (editorText) {
      navigator.clipboard.writeText(editorText)
    },

    openNoteEditor: function () {
      this.$buefy.modal.open({
        parent: this,
        component: NoteEditor,
        hasModalCard: true,
        trapFocus: true,
        ariaModal: true
      })
    },

    saveNoteInState: function (editorText) {
      this.$store.dispatch('saveSelectedNote', editorText)
    },

    deleteNote: function () {
      this.$store.dispatch('deleteSelectedNote')
      this.$store.dispatch('updateAllNotesRef')
    }
  }
}
</script>
