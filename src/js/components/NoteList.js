// import controller from '../../controllers/mainview/NoteList';
// import view from '../../views/mainview/NoteList';
import m from 'mithril';
import observer from '../lib/Observer';
import shareData from './shareData/Home';
// import noteListVm from '../vms/mainview/NoteList';

export default {
    controller: observer().register(['onClickFolderName'], function(folderId) {
        this._getDisplayNoteModels = function(folderId) {
            if (folderId) {
                return shareData.noteCollection.filter({ folder: '' + folderId });
            }
            return shareData.noteCollection.models();
        };
        this.noteModels = this._getDisplayNoteModels(folderId);
        this.save = function() {
          shareData.noteCollection.add([
            {
                id: 'hogehoge' + new Date(),
                title: 'new title',
                key: 'hogehoge' + new Date(),
                folder: '' + folderId,
                createdAt: 11111,
                updatedAt: 22222,
                content: 'hoge\nhoge'
            }
          ]);
          shareData.noteCollection.save();
          this.noteModels = this._getDisplayNoteModels(folderId);
        };
    }),
    view: function(ctrl) {
        return <div id= 'note-list-contaier' class='column is-3'>
            <div id='note-list-header'>
              <h1 id="folder-name">Title</h1>
              <a class="button" onclick={ ctrl.save.bind(ctrl) }>createNewNote</a>
            </div>

            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile">
                  <div id='note-list' class="tile is-parent is-vertical">
                    { ctrl.noteModels.map((model) => {
                        return <article class="tile is-child box">
                          <p class="title is-5">{ model.title() }</p>
                          <p class="subtitle is-6">Top tile</p>
                        </article>
                    }) }
                  </div>
                </div>
              </div>
            </div>
          </div>
    }
};