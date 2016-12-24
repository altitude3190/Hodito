import m from 'mithril';
import observer from '../lib/Observer';
import DataStore from '../lib/DataStore';
import marked from 'marked';

export default {
    controller: observer().register(['showNote'], function(noteId) {
        noteId = noteId || 'd64c2cefd722';
        this.noteModel = DataStore.get('noteCollection').findWhere({ key: noteId });
        this.mode = this.mode || 'preview';

        if (DataStore.get('timer')) clearTimeout(DataStore.get('timer'));
        if (this.mode == 'edit') {
          const timer = setInterval(() => {
              console.log('hoge');
              this.noteModel.content(document.getElementById('note-content-textarea').value);
              DataStore.get('noteCollection').save();
          }, 2000);
          DataStore.set('timer', timer);
        }

        this.changeMode = function(noteId, mode) {
            this.mode = mode;
            observer().trigger('showNote', noteId);
        }

    }),
    view: function(ctrl) {
        if (ctrl.mode == 'preview') {

                  return <div id='note-container' class='column'>
          <h1 class="title"> { ctrl.noteModel.title() } </h1>
          <p class="subtitle is-6">
            created_at:  <span id='created-at'>{ ctrl.noteModel.createdAt() }</span> /
            updated_at:  <span id='updated-at'>{ ctrl.noteModel.updatedAt() }</span>
          </p>

          <a onclick={ ctrl.changeMode.bind(ctrl, ctrl.noteModel.key(), 'edit') } class="button is-outlined">Edit</a>
          <a class="button is-primary is-outlined">Markdown</a>

          <div id='note-body' class="content">
            { m.trust(marked(ctrl.noteModel.content())) }
          </div>

        </div>
      }

        return <div id='note-container' class='column'>
          <h1 class="title"> { ctrl.noteModel.title() } </h1>
          <p class="subtitle is-6">
            created_at:  <span id='created-at'>{ ctrl.noteModel.createdAt() }</span> /
            updated_at:  <span id='updated-at'>{ ctrl.noteModel.updatedAt() }</span>
          </p>

          <a class="button is-outlined">Edit</a>
          <a onclick={ ctrl.changeMode.bind(ctrl, ctrl.noteModel.key(), 'preview') } class="button is-primary is-outlined">Markdown</a>

          { /*
          <div id='note-body' class="content">
            { m.trust(marked(ctrl.noteModel.content())) }
          </div>
          */ }

          <textarea id="note-content-textarea">{ctrl.noteModel.content()}</textarea>


        </div>


    }
};