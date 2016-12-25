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
        return <div id= 'note-list-contaier' class='column is-3'>
            <div id='note-list-header'>
              <h1 id="folder-name">Title</h1>
              <a class="button" onclick={ NoteListVm.createNewNote }>createNewNote</a>
            </div>

            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile">
                  <div id='note-list' class="tile is-parent is-vertical">
                    { NoteListVm.getDisplayNoteModels().map((model) => {
                        return <article class="tile is-child box" note-id={ model.key() } onclick={ m.withAttr('note-id', ctrl.onClickNote) }>
                          <p class="title is-5">{ model.title() }</p>
                          <p class="subtitle is-6">Top tile</p>
                        </article>
                    }) }
                  </div>
                </div>
              </div>
            </div>
          </div>
    },
};
