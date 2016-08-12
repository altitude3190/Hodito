import m from 'mithril';

export default controller => {
    return m('',
        controller.folderCollection.models().map(model => {
            return m('li',
                m('a', { href: '#' }, model.name())
            );
        })
    );
};
