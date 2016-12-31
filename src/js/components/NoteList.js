import m from 'mithril';
import Publisher from '../lib/Publisher';
import NoteListVm from '../vms/NoteList';

export default {

    controller() {
        this.onClickNote = (noteId) => {
            Publisher.trigger('showNote', noteId);
        };

        Publisher.on('onClickFolderName', NoteListVm.updateDisplayNoteModelsCond, null);
    },

    view(ctrl) {
        return <div id= 'note-list-container' class='column is-3'>
          <div id='note-list-header'>
            <button id="note-create-btn" onclick={ NoteListVm.createNewNote }> create a new note </button>
          </div>

          <ul id='note-list'>
            {
              NoteListVm.getDisplayNoteModels().map((model) => {
                return <li class="note-list-note" note-id={ model.key() } onclick={ m.withAttr('note-id', ctrl.onClickNote) }>
                  <p class="note-list-note-title">{ model.title() }</p>
                  <p class="note-list-note-created-at">{ model.createdAt() }</p>
                </li>
              })
            }
          </ul>

        </div>
    },
};
