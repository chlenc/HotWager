
import { AccountsStore, DappStore} from './';
import NotificationsStore from "./NotificationsStore";

class RootStore {
    public accountsStore: AccountsStore;
    public dappStore: DappStore;
    public notificationsStore: NotificationsStore;

    constructor(initState?: any) {

        if (initState == null) {
            initState = {};
        }
        this.accountsStore = new AccountsStore(this, initState.accountsStore);
        this.dappStore = new DappStore(this);
        this.notificationsStore = new NotificationsStore(this);
    }

    public serialize = () => ({
        accountsStore: this.accountsStore.serialize(),
    });
}

export default RootStore;
