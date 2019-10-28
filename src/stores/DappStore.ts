import RootStore from './RootStore';
import SubStore from './SubStore';
import { action, autorun, observable } from "mobx";
import axios from "axios";
import { dApp, nodeUrl } from "../constants";

export type TStoryItem = { e: number, k1: number, k2: number, i: number }

export class DappStore extends SubStore {

    @observable k1: number | null = null;
    @observable k2: number | null = null;
    @observable count1: number | null = null;
    @observable count2: number | null = null;
    @observable story: TStoryItem[] | null = null;

    constructor(rootStore: RootStore) {
        super(rootStore);
        this.updateStateAndBalance();
        this.startWatchState()
    }


    private startWatchState = () =>
        autorun((reaction) => this.updateStateAndBalance(), {scheduler: run => setInterval(run, 5000)})

    @action
    private updateStateAndBalance = async () => {
        if (!this.rootStore.accountsStore.user || !this.rootStore.accountsStore.user.address) return;
        const address = this.rootStore.accountsStore.user.address;
        this.rootStore.accountsStore.updateBalance();
        const {data} = await axios.get(`${nodeUrl}/addresses/data/${dApp}`);
        const reducer = (acc: { [key: string]: string | number },
                         {key, value}: { key: string, value: string | number }
        ) => ({...acc, [key]: value});
        const state = data.reduce(reducer, {});
        this.k1 = state.q1_next;
        this.k2 = state.q2_next;
        this.count1 = state.n;
        this.count2 = state.m;

        this.story = Object.entries(state)
            .filter(([_, val]) => val === address)
            .map(([key]) => key.split('_')[0])
            .map((i): TStoryItem => ({
                e: state[`${i}_event`],
                k1: state[`${i}_qoef1`],
                k2: state[`${i}_qoef2`],
                i: +i,
            }))
    }

}

