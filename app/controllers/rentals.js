import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        filterByCity(param) {
            if (param != '') {
                return this.store.query('rental', {city: param})
                    .then(res => ({ query: param, results: res }));
            }
            return this.store.findAll('rental')
                .then(res => ({ query: param, results: res }));
        }
    }
});
