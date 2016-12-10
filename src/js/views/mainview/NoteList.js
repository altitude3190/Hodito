import m from 'mithril';

export default controller => {
    console.log(controller);
    return m('',
        controller.noteCollection.models().map(model => {
            return m('li',
                m('a', { href: '#' }, model.title())
            );
        })
    );
};
