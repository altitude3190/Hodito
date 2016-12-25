import m from 'mithril';
import NoteVm from '../vms/Note';
import Publisher from '../lib/Publisher';
import marked from 'marked';

export default {
    controller() {
        this.unload = () => {
            NoteVm.clearTimer();
        };

        this.updateNoteModel = (noteId) => {
            NoteVm.updateDisplayCond({ noteId });
        };

        Publisher.on('showNote', this.updateNoteModel, this);
    },
    view() {
        NoteVm.clearTimer();

        const noteModel = NoteVm.getModelByDisplayCond();
        if (!noteModel) return <p></p>;
        NoteVm.saveAtRegularInterval({ noteModel });

        if (NoteVm.isPreviewMode()) {
            return <div id='note-container' class='column'>
              <h1 class="title"> { noteModel.title() } </h1>
              <p class="subtitle is-6">
                created_at:  <span id='created-at'>{ noteModel.createdAt() }</span> /
                updated_at:  <span id='updated-at'>{ noteModel.updatedAt() }</span>
              </p>

              <a onclick={ NoteVm.changeMode } class="button is-outlined">Edit</a>
              <a class="button is-primary is-outlined">Markdown</a>

              <div id='note-body' class="content">
                { m.trust(marked(noteModel.content())) }
              </div>

            </div>
        }


        return <div id='note-container' class='column'>
          <h1 class="title"> { noteModel.title() } </h1>
          <p class="subtitle is-6">
            created_at:  <span id='created-at'>{ noteModel.createdAt() }</span> /
            updated_at:  <span id='updated-at'>{ noteModel.updatedAt() }</span>
          </p>

          <a class="button is-outlined">Edit</a>
          <a onclick={ NoteVm.changeMode } class="button is-primary is-outlined">Markdown</a>

          <textarea id="note-content-textarea">{noteModel.content()}</textarea>

        </div>
    }
};