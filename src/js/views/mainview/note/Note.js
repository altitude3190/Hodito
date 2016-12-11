import m from 'mithril';
import COSNT from '../../../Config';
import marked from 'marked';

export default controller => {

    let noteContentHtml = '';
    if (controller.mode === COSNT.NOTE_MODE.EDIT) {
        noteContentHtml =
          `<textarea id="note-content-textarea">${controller.model.content()}</textarea>`;
    } else {
        noteContentHtml =
          `<div id='note-body' class="content">${marked(controller.model.content())}</div>`;
    }

    return <article>
      <h1 class="title"> { controller.model.title() } </h1>
      <p class="subtitle is-6">
        created_at:  <span id='created-at'>{ controller.model.createdAt() }</span> /
        updated_at:  <span id='updated-at'>{ controller.model.updatedAt() }</span>
      </p>
      <a href={ '#/note/' + controller.model.key() + '/edit' } class="button is-outlined">Edit</a>
      <a href={ '#/note/' + controller.model.key() + '/preview' } class="button is-primary is-outlined">Markdown</a>

      { /*
      <div id='note-body' class="content">
        { controller.model.content() }
      </div>


      <textarea id="note-content-textarea">
        { controller.model.content() }
      </textarea>
      */ }

      {m.trust(noteContentHtml)}


    </article>
};
