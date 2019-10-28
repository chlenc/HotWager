import RootStore from './RootStore';

class SubStore {
    constructor(public rootStore: RootStore) {
    }
}

export default SubStore;
