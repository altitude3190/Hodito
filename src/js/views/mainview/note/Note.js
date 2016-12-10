import m from 'mithril';

export default controller => {
    return m('h1', controller.model.title());
};
