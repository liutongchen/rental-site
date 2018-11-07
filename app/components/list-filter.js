import Component from '@ember/component';

export default Component.extend({
    value: '',
    classNames: ['list-filter'],
    init() {
        this._super(...arguments);
        this.filter('').then(allRes => this.set('results', allRes.results));
    },
    actions: {
        handleFilterEntry() {
            let filterVal = this.value;
            let filterAction = this.filter;
            filterAction(filterVal)
            .then(filterRes => {
                if (filterRes.query === filterVal) {
                    this.set('results', filterRes.results)
                }
            });
        }
    }
});
