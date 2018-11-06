import Component from '@ember/component';

export default Component.extend({
    value: '',
    classNames: ['list-filter'],
    init() {
        this._super(...arguments);
        this.filter('').then(res => this.set('results', res));
    },
    actions: {
        handleFilterEntry() {
            let filterVal = this.value;
            let filterAction = this.filter;
            return filterAction(filterVal).then(filterRes => this.set('results', filterRes));
        }
    }
});
