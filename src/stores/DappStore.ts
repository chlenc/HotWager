import RootStore from './RootStore';
import SubStore from './SubStore';
import {action, autorun, observable} from "mobx";
import axios from "axios";
import {dApp, nodeUrl} from "../constants";
import {IInvokeScriptParams} from "@waves/waves-transactions/src/transactions";
import {broadcast, invokeScript, waitForTx} from "@waves/waves-transactions";

export type TStoryItem = { e: number, k1: number, k2: number, i: number }

export class DappStore extends SubStore {

    @observable k1: number | null = null;
    @observable k2: number | null = null;
    @observable event1amount: number | null = null;
    @observable event2amount: number | null = null;
    @observable count1: number | null = null;
    @observable count2: number | null = null;
    @observable story: TStoryItem[] | null = null;
    @observable load: boolean = false;

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
        this.event1amount = state[`${address}_event1amount`];
        this.event2amount = state[`${address}_event2amount`];

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


    chooseEvent = async (value: number) => {
        if (!this.rootStore.accountsStore.user || !this.rootStore.accountsStore.user.seed) {
            this.rootStore.notificationsStore.notify('invalid seed');
            return;
        }
        const {seed} = this.rootStore.accountsStore.user;
        this.load = true;
        const params: IInvokeScriptParams = {
            dApp,
            feeAssetId: null,
            call: {function: 'bet', args: [{type: 'integer', value}]},
            payment: [{assetId: null, amount: 1e8}],
            chainId: 'T'
        };
        const tx = invokeScript(params, seed);
        broadcast(tx, nodeUrl).then(d => console.log(d.id)).catch(e => alert(e))
        waitForTx(tx.id, {apiBase: 'https://nodes-testnet.wavesnodes.com'}).then((res) => {
            this.load = false
        })
    }


    withdraw = async () => {
        if (!this.rootStore.accountsStore.user || !this.rootStore.accountsStore.user.seed) {
            this.rootStore.notificationsStore.notify('invalid seed')
            return
        }

        const params: IInvokeScriptParams = {
            dApp,
            feeAssetId: null,
            call: {function: 'withdraw', args: []},
            payment: [],
            chainId: 'T'
        };
        const tx = invokeScript(params, this.rootStore.accountsStore.user.seed);
        broadcast(tx, nodeUrl).then(d => console.log(d.id)).catch(e => alert(e));
        waitForTx(tx.id, {apiBase: 'https://nodes-testnet.wavesnodes.com'}).then((res) => {
            this.load = false
        })
    }


}

