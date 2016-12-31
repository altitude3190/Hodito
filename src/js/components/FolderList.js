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
        return <aside id="sidebar" class='column is-2'>
          <div id='sidebar-folder-header'>
            <p id="sidebar-folder-label">FOLDERS</p>
            <div id='sidebar-folder-create-btn' onclick={ FolderListVm.createNewFolder }>
              <span class="icon is-small"><i class="fa fa-plus" aria-hidden="true"></i></span>
            </div>
          </div>
          <ul id='sidebar-folder-list'>
            {
              DataStore.get('folderCollection').models().map((model) => {
                return <li folder-id={ model.id() } onclick={ m.withAttr('folder-id', ctrl.onClickFolderName) }>
                  <span class="icon is-small"><i class="fa fa-folder" aria-hidden="true"></i></span>
                  <span>{ model.name() }</span>
                </li>
              })
            }
          </ul>
        </aside>
    },
};
