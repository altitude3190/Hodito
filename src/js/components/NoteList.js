import m from 'mithril';
import Publisher from '../lib/Publisher';
import NoteListVm from '../vms/NoteList';
import moment from 'moment';

export default {

    oninit() {
        this.vm = new NoteListVm();
        Publisher.on('onClickFolderName', this.vm.updateDisplayNoteModelsCond, null);
    },

    view() {
        return <div id= 'note-list-container' class='column is-3'>
          <div id='note-list-header'>
            <button id="note-create-btn" onclick={ this.vm.createNewNote }>
              <span class="icon is-medium"><i class="fa fa-plus-circle" aria-hidden="true"></i></span>
            </button>
          </div>
          <ul id='note-list'>
            {
              this.vm.getDisplayNoteModels().map((model) => {
                return <li class="note-list-note" note-id={ model.id() } onclick={ m.withAttr('note-id', this.vm.onClickNote) } oncontextmenu={ m.withAttr('note-id', this.vm.showContextMenu, this.vm) }>
                  <p class="note-list-note-title">{ model.title() }</p>
                  <p class="note-list-note-updated-at">updated: { moment.unix(model.updatedAt()).format('YYYY/MM/DD HH:mm') }</p>
                </li>
              })
            }
          </ul>
        </div>
    },
};
