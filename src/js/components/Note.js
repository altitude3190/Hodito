import m from 'mithril';
import marked from 'marked';
import NoteVm from '../vms/Note';

export default {

    oninit() {
        this.vm = new NoteVm();
    },

    onremove() {
        this.vm.clearTimer();
    },

    view() {
        // start a timer if the mode is 'edit'
        const noteModel = this.vm.getDisplayNoteModel();
        this.vm.saveAtRegularInterval({ noteModel });

        // display nothing
        if (!noteModel) return <div id='note-container' class='column'></div>

        // preview mode view
        if (this.vm.isPreviewMode()) {
            return <div id='note-container' class='column'>
              <h1 id="note-title"> { noteModel.title() } </h1>
              <div class="tabs is-boxed">
                <ul>
                  <li class="is-active">
                    <a>
                      <span class="icon is-small"><i class="fa fa-play"></i></span>
                      <span>Render</span>
                    </a>
                  </li>
                  <li onclick={ this.vm.switchMode.bind(this.vm) }>
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

        // edit mode view
        return <div id='note-container' class='column'>
          <form>
            <input type="text" id="note-title" value={ noteModel.title() } onblur={ m.withAttr('value', this.vm.updateNoteTitle.bind(this.vm)) }></input>
          </form>
          <div class="tabs is-boxed">
            <ul>
              <li onclick={ this.vm.switchMode.bind(this.vm) }>
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
    },

};




