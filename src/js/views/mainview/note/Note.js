import m from 'mithril';

export default controller => {
    return <article>
      <h1 class="title"> { controller.model.title() } </h1>
      <p class="subtitle is-6">
        created_at:  <span id='created-at'>{ controller.model.createdAt() }</span> /
        updated_at:  <span id='updated-at'>{ controller.model.updatedAt() }</span>
      </p>

      { /*
      <div id='note-body' class="content">
        { controller.model.content() }
      </div>
      */ }

      <textarea id="note-content-textarea">
        { controller.model.content() }
      </textarea>

    </article>
};
