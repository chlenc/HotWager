import notification from 'rc-notification';
import SubStore from './SubStore';
import RootStore from './RootStore';

export type TNotifyOptions = Partial<{
    duration: number,
    closable: boolean,
    key: string
}>;

class NotificationsStore extends SubStore {
    _instance?: any;

    constructor(rootStore: RootStore) {
        super(rootStore);
        notification.newInstance({}, (notification: any) => this._instance = notification);
    }

    notify(content: string | JSX.Element, opts: TNotifyOptions = {}) {
        if (opts.key) {
            this._instance.removeNotice(opts.key);
        }
        this._instance && this._instance.notice({
            content,
            duration: opts.duration || 10,
            key: opts.key,
            closable: opts.closable,
            style: { right: '50%', background: '#343d3f' }
        });
    }
}

export default NotificationsStore;
