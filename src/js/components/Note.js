import m from 'mithril';
import marked from 'marked';
import NoteVm from '../vms/Note';

export default {

    controller() {
        this.vm = new NoteVm();

        this.unload = () => {
            this.vm.clearTimer();
        };
    },

    view(ctrl) {
        // start a timer if the mode is 'edit'
        const noteModel = ctrl.vm.getDisplayNoteModel();
        ctrl.vm.saveAtRegularInterval({ noteModel });

        // display nothing
        if (!noteModel) return <div id='note-container' class='column'></div>

        // preview mode view
        if (ctrl.vm.isPreviewMode()) {
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
                  <li onclick={ ctrl.vm.switchMode.bind(ctrl.vm) }>
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
            <input type="text" id="note-title" value={ noteModel.title() } onblur={ m.withAttr('value', ctrl.vm.updateNoteTitle.bind(ctrl.vm)) }></input>
          </form>
          <div class="tabs is-boxed">
            <ul>
              <li onclick={ ctrl.vm.switchMode.bind(ctrl.vm) }>
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




