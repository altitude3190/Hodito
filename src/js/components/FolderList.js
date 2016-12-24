import m from 'mithril';
import observer from '../lib/Observer';
import shareData from './shareData/Home';

export default {
    controller: function() {
        this.onClickFolderName = function(folderId) {
            observer().trigger('onClickFolderName', folderId);
        };
        this.save = function() {
            console.log('hogehogehoge')
            shareData.folderCollection.add([{
                "id": "3",
                "key": "de09a90a79b8",
                "name": "新規",
                "color": "#3FD941"
            }]);
            shareData.folderCollection.save();
        }
    },
    view: function(ctrl) {
        return <div id='side-bar' class='column is-2'>
        <aside class="menu">
          <p class="menu-label">
            Filter
          </p>
          <p class="control">
            <input class="input" type="text" placeholder="f hoge or n fuga"></input>
          </p>
          <p class="menu-label">
            Dashboards
          </p>
          <ul class="menu-list">
            <li>
              <a href="#">Folders</a>
              <a class="button" onclick={ ctrl.save } >createNewFolder</a>
              <ul id='sidebar-folder-list'>
                { shareData.folderCollection.models().map((model) => {
                  return <li><a folder-id={ model.id() } onclick={ m.withAttr('folder-id', ctrl.onClickFolderName) } >{ model.name() }</a></li>
                }) }
              </ul>
            </li>
            <li><a href="#">Notes</a></li>
          </ul>
        </aside>
      </div>
    }
};