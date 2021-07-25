class _EventBus {

    constructor() {
        this.bus = {};
    }

    $off(id) {
        delete this.bus[id];
    }

    $on(id, callback) {
        this.bus[id] = callback;
    }

    $emit(id, ...params) {
        if (this.bus[id])
            this.bus[id](...params);
    }
}
export default new _EventBus()
