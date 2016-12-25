import m from 'mithril';
import _ from 'lodash';
import Publisher from '../lib/Publisher';
import DataStore from '../lib/DataStore';

export default {

    controller() {
        this.displayNoteModelsCond = {};

        this.createNewNote = () => {
            const noteCollection = DataStore.get('noteCollection');
            const currentFolderId = this.displayNoteModelsCond.folderId;
            noteCollection.addDefaultDataList(currentFolderId);
            noteCollection.save();
        };

        this.updateDisplayNoteModelsCond = (options) => {
            const defaultCond = { folderId: void 0 };
            this.displayNoteModelsCond = _.assign({}, defaultCond, options);
        };

        this.onClickNote = (noteId) => {
            Publisher.trigger('showNote', noteId);
        };

        Publisher.on('onClickFolderName', this.updateDisplayNoteModelsCond, this);
    },

    view(ctrl) {
        this.getDisplayNoteModels = () => {
            const cond = ctrl.displayNoteModelsCond;
            const noteCollection = DataStore.get('noteCollection');
            if (cond.folderId) return noteCollection.filter({ folder: '' + cond.folderId });
            return noteCollection.models();
        };

        return <div id= 'note-list-contaier' class='column is-3'>
            <div id='note-list-header'>
              <h1 id="folder-name">Title</h1>
              <a class="button" onclick={ ctrl.createNewNote }>createNewNote</a>
            </div>

            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile">
                  <div id='note-list' class="tile is-parent is-vertical">
                    { this.getDisplayNoteModels().map((model) => {
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
