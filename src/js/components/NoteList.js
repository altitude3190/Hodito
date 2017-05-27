import m from 'mithril';
import Publisher from '../lib/Publisher';
import NoteListVm from '../vms/NoteList';
import moment from 'moment';

export default {

    oninit() {
        this.vm = new NoteListVm();
        Publisher.on('onClickFolderName', this.vm.updateCurrentSelectedFolderId, this.vm);
    },

    view() {
        return (
          <div id="note-list-container" className="column is-3">
            <div id="note-list-header">
              <button id="note-create-btn" onclick={this.vm.createNewNote.bind(this.vm)}>
                <span className="icon is-medium">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <ul id="note-list">
              {
                this.vm.getDisplayNoteModels().map((model) => {
                    return (
                      <li
                        className="note-list-note"
                        id={model.id() === this.vm.currentSelectedNoteId() ? 'active' : ''}
                        note-id={model.id()}
                        onclick={m.withAttr('note-id', this.vm.onClickNote, this.vm)}
                        oncontextmenu={
                          m.withAttr('note-id', this.vm.showContextMenu, this.vm)
                        }
                      >
                        <p className="note-list-note-title">{model.title()}</p>
                        <p className="note-list-note-updated-at">
                          updated: {moment.unix(model.updatedAt()).format('YYYY/MM/DD HH:mm')}
                        </p>
                      </li>
                    );
                })
              }
            </ul>
          </div>
        );
    },
};
