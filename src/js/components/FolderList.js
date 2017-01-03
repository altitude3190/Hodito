import m from 'mithril';
import _ from 'lodash';
import Publisher from '../lib/Publisher';
import DataStore from '../lib/DataStore';
import FolderListVm from '../vms/FolderList';
import { remote } from 'electron';

const { Menu, MenuItem } = remote;
const makeContextMenu = (folderId) => {
    const folderListContextMenus = [
        {
            label: 'delete',
            click() {
                Publisher.trigger('deleteFolder', folderId);
            },
        },
    ];
    const folderListContextMenu = new Menu();
    _.forEach(folderListContextMenus, (menu) => {
        folderListContextMenu.append(new MenuItem(menu));
    });
    return folderListContextMenu;
};

export default {
    controller() {
        this.onClickFolderName = (folderId) => {
            Publisher.trigger('onClickFolderName', { folderId });
        };
        this.showContextMenu = (folderId) => {
            Publisher.on('deleteFolder', this.deleteFolder, this);
            makeContextMenu(folderId).popup(remote.getCurrentWindow());
        };
        this.deleteFolder = (folderId) => {
            m.redraw.strategy('diff');
            m.startComputation();
            FolderListVm.deleteFolder({ id: folderId });
            m.endComputation();
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
                return <li folder-id={ model.id() } onclick={ m.withAttr('folder-id', ctrl.onClickFolderName) } oncontextmenu={ m.withAttr('folder-id', ctrl.showContextMenu) } >
                  <span class="icon is-small"><i class="fa fa-folder" aria-hidden="true"></i></span>
                  <span>{ model.name() }</span>
                </li>
              })
            }
          </ul>
        </aside>
    },
};
