import RootStore from './RootStore';
import SubStore from './SubStore';
import { action, observable } from "mobx";
import { IUser } from "../Components/LoginBtn";
import { address as buildAddress, randomSeed } from '@waves/ts-lib-crypto';
import axios from "axios";
import { nodeUrl } from "../constants";


export class AccountsStore extends SubStore {

    @observable user: IUser | null = null;

    @action
    public updateUser(user: IUser) {
        if (!this.user || this.user.id !== user.id) {
            user.seed = randomSeed();
            user.address = buildAddress(user.seed, 'T');
            //todo show notification
            this.user = user;
        }
        return this.user
    }

    // @action
    // public updateUserWithSeed(seed: string) {
    //     if (!this.user || this.user.seed !== seed) {
    //         const address = buildAddress(seed, 'T');
    //         //todo show notification
    //         this.user = {seed, address};
    //     }
    //     return this.user
    // }

    @action
    async updateBalance() {
        if (this.user && this.user.address) {
            const {data: {balance}} = await axios.get(`${nodeUrl}/addresses/balance/${this.user.address}`);
            this.user.balance = balance / 1e8
        }
    }

    constructor(rootStore: RootStore, initState: any) {
        super(rootStore);
        if (initState != null) this.deserialize(initState)
    }

    public serialize = () => ({tgUser: this.user});

    @action private deserialize = (initState: any) => {
        if (initState.tgUser) this.user = initState.tgUser
    }
}

