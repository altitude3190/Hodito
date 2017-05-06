import m from 'mithril';
import DataStore from '../lib/DataStore';
import FolderListVm from '../vms/FolderList';

export default {

    oninit() {
        this.vm = new FolderListVm();
    },

    view() {
        return <aside id="sidebar" class='column is-2'>
          <div id='sidebar-folder-header'>
            <button id="sidebar-folder-create-btn" onclick={ this.vm.createNewFolder }>
              <span class="icon is-medium"><i class="fa fa-plus-circle" aria-hidden="true"></i></span>
            </button>
          </div>
          <ul id='sidebar-folder-list'>
            {
              DataStore.get('folderCollection').models().map((model) => {
                const idVal = model.id() === this.vm.getSelectedFolderId() ? 'active' : '';
                if (model.id() === this.vm.getBeingEditedFolderId()) {
                  return <li id='active' folder-id={ model.id() } onclick={ m.withAttr('folder-id', this.vm.onClickFolderName.bind(this.vm)) } oncontextmenu={ m.withAttr('folder-id', this.vm.showContextMenu.bind(this.vm)) } >
                    <span class="icon is-small"><i class="fa fa-folder" aria-hidden="true"></i></span>
                    <input id='folder-name-form' type='text' value={ model.name() } autofocus onblur={ m.withAttr('value', this.vm.updateFolderName.bind(this.vm)) }></input>
                  </li>
                } else {
                  return <li id={ idVal } folder-id={ model.id() } onclick={ m.withAttr('folder-id', this.vm.onClickFolderName.bind(this.vm)) } oncontextmenu={ m.withAttr('folder-id', this.vm.showContextMenu.bind(this.vm)) } >
                    <span class="icon is-small"><i class="fa fa-folder" aria-hidden="true"></i></span>
                    <span folder-id={ model.id() } ondblclick={ m.withAttr('folder-id', this.vm.updateBeingEditedFolderId.bind(this.vm)) }>{ model.name() }</span>
                  </li>
                }
              })
            }
          </ul>
        </aside>
    },
};
