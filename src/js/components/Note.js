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
              <h1 id="note-title"> { noteModel.title() } </h1>
              <p id='note-date'>
                created_at:  <span id='created-at'>{ noteModel.createdAt() }</span>
                updated_at:  <span id='updated-at'>{ noteModel.updatedAt() }</span>
              </p>

              <div class="tabs is-boxed">
                <ul>
                  <li class="is-active">
                    <a>
                      <span class="icon is-small"><i class="fa fa-play"></i></span>
                      <span>Render</span>
                    </a>
                  </li>
                  <li onclick={ NoteVm.changeMode }>
                    <a>
                      <span class="icon is-small"><i class="fa fa-edit"></i></span>
                      <span>Edit</span>
                    </a>
                  </li>
                </ul>
              </div>








              <div class="markdown-body">
                { m.trust(marked(noteModel.content())) }
              </div>

            </div>
        }


        return <div id='note-container' class='column'>
          <h1 id="note-title"> { noteModel.title() } </h1>
          <p id='note-date'>
            created_at:  <span id='created-at'>{ noteModel.createdAt() }</span>
            updated_at:  <span id='updated-at'>{ noteModel.updatedAt() }</span>
          </p>

          <div class="tabs is-boxed">
            <ul>
              <li onclick={ NoteVm.changeMode }>
                <a>
                  <span class="icon is-small"><i class="fa fa-play"></i></span>
                  <span>Render</span>
                </a>
              </li>
              <li class="is-active">
                <a>
                  <span class="icon is-small"><i class="fa fa-edit"></i></span>
                  <span>Edit</span>
                </a>
              </li>
            </ul>
          </div>

          <textarea id="note-textarea">{noteModel.content()}</textarea>

        </div>
    }
};