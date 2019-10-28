
import { AccountsStore, DappStore} from './';

class RootStore {
    public accountsStore: AccountsStore;
    public dappStore: DappStore;

    constructor(initState?: any) {

        if (initState == null) {
            initState = {};
        }
        this.accountsStore = new AccountsStore(this, initState.accountsStore);
        this.dappStore = new DappStore(this);
    }

    public serialize = () => ({
        accountsStore: this.accountsStore.serialize(),
    });
}

export default RootStore;
