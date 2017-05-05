import m from 'mithril';
import DataStore from '../lib/DataStore';
import FolderListVm from '../vms/FolderList';

export default {

    controller() {
        this.vm = new FolderListVm();
    },

    view(ctrl) {
        return <aside id="sidebar" class='column is-2'>
          <div id='sidebar-folder-header'>
            <button id="sidebar-folder-create-btn" onclick={ ctrl.vm.createNewFolder }>
              <span class="icon is-medium"><i class="fa fa-plus-circle" aria-hidden="true"></i></span>
            </button>
          </div>
          <ul id='sidebar-folder-list'>
            {
              DataStore.get('folderCollection').models().map((model) => {
                const idVal = model.id() === ctrl.vm.getSelectedFolderId() ? 'active' : '';
                if (model.id() === ctrl.vm.getBeingEditedFolderId()) {
                  return <li id='active' folder-id={ model.id() } onclick={ m.withAttr('folder-id', ctrl.vm.onClickFolderName.bind(ctrl.vm)) } oncontextmenu={ m.withAttr('folder-id', ctrl.vm.showContextMenu.bind(ctrl.vm)) } >
                    <span class="icon is-small"><i class="fa fa-folder" aria-hidden="true"></i></span>
                    <input id='folder-name-form' type='text' value={ model.name() } autofocus onblur={ m.withAttr('value', ctrl.vm.updateFolderName.bind(ctrl.vm)) }></input>
                  </li>
                } else {
                  return <li id={ idVal } folder-id={ model.id() } onclick={ m.withAttr('folder-id', ctrl.vm.onClickFolderName.bind(ctrl.vm)) } oncontextmenu={ m.withAttr('folder-id', ctrl.vm.showContextMenu.bind(ctrl.vm)) } >
                    <span class="icon is-small"><i class="fa fa-folder" aria-hidden="true"></i></span>
                    <span folder-id={ model.id() } ondblclick={ m.withAttr('folder-id', ctrl.vm.updateBeingEditedFolderId.bind(ctrl.vm)) }>{ model.name() }</span>
                  </li>
                }
              })
            }
          </ul>
        </aside>
    },
};
