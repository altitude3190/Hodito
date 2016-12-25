import m from 'mithril';
import Publisher from '../lib/Publisher';
import DataStore from '../lib/DataStore';
import FolderListVm from '../vms/FolderList';

export default {
    controller() {
        this.onClickFolderName = (folderId) => {
            Publisher.trigger('onClickFolderName', { folderId });
        };
    },
    view(ctrl) {
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
              <a class="button" onclick={ FolderListVm.createNewFolder } >createNewFolder</a>
              <ul id='sidebar-folder-list'>
                { DataStore.get('folderCollection').models().map((model) => {
                  return <li><a folder-id={ model.id() } onclick={ m.withAttr('folder-id', ctrl.onClickFolderName) } >{ model.name() }</a></li>
                }) }
              </ul>
            </li>
            <li><a href="#">Notes</a></li>
          </ul>
        </aside>
      </div>
    },
};
