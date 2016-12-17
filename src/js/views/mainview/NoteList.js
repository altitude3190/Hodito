import m from 'mithril';

export default controller => {
    console.log('notelist controller', controller.noteCollection.models().length);
    return m('',
        controller.noteCollection.models().map((model) => {
            return m('li',
                m('a', { href: `#/note/${model.key()}/preview` }, model.title()),
                m('a', { class: 'button', onclick: controller.createNewNote.bind(controller) }, 'new note')
            );
        })
    );
};
