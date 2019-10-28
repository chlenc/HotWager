import { broadcast, invokeScript } from '@waves/waves-transactions'
import { IInvokeScriptParams } from "@waves/waves-transactions/src/transactions";
import { dApp, nodeUrl } from "./constants";


export const loadState = (): any | undefined => {
    try {
        const state = JSON.parse(localStorage.getItem('store') as string);
        return state || undefined;

    } catch (error) {
        console.log(error);
        return undefined;
    }

};
export const saveState = (state: any): void => {
    localStorage.setItem('store', JSON.stringify(state));
};


export const chooseEvent = async (value: number, seed: string) => {
    const params: IInvokeScriptParams = {
        dApp,
        feeAssetId: null,
        call: {function: 'bet', args: [{type: 'integer', value}]},
        payment: [{assetId: null, amount: 1e8}],
        chainId: 'T'
    };
    const tx = invokeScript(params, seed);
    console.log(await broadcast(tx, nodeUrl))
}
