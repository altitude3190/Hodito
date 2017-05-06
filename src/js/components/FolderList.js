import m from 'mithril';
import DataStore from '../lib/DataStore';
import FolderListVm from '../vms/FolderList';

export default {

    oninit() {
        this.vm = new FolderListVm();
    },

    view() {
        return (
          <aside id="sidebar" className="column is-2">
            <div id="sidebar-folder-header">
              <button id="sidebar-folder-create-btn" onclick={this.vm.createNewFolder}>
                <span className="icon is-medium">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <ul id="sidebar-folder-list">
              {
                DataStore.get('folderCollection').models().map((model) => {
                    const idVal = model.id() === this.vm.getSelectedFolderId() ? 'active' : '';
                    if (model.id() === this.vm.getBeingEditedFolderId()) {
                        return (
                          <li
                            id="active" folder-id={model.id()}
                            onclick={m.withAttr('folder-id', this.vm.onClickFolderName, this.vm)}
                            oncontextmenu={
                              m.withAttr('folder-id', this.vm.showContextMenu, this.vm)
                            }
                          >
                            <span className="icon is-small">
                              <i className="fa fa-folder" aria-hidden="true"></i>
                            </span>
                            <input
                              id="folder-name-form" type="text" value={model.name()} autofocus
                              onblur={m.withAttr('value', this.vm.updateFolderName, this.vm)}
                            >
                            </input>
                          </li>
                          );
                    }
                    return (
                      <li
                        id={idVal} folder-id={model.id()}
                        onclick={m.withAttr('folder-id', this.vm.onClickFolderName, this.vm)}
                        oncontextmenu={m.withAttr('folder-id', this.vm.showContextMenu, this.vm)}
                      >
                        <span className="icon is-small">
                          <i className="fa fa-folder" aria-hidden="true"></i>
                        </span>
                        <span
                          folder-id={model.id()}
                          ondblclick={
                            m.withAttr('folder-id', this.vm.updateBeingEditedFolderId, this.vm)
                          }
                        >{model.name()}</span>
                      </li>
                    );
                })
              }
            </ul>
          </aside>
        );
    },

};
