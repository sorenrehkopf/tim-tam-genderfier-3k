import { chrome } from 'jest-chrome';

(global.chrome as any) = chrome;

(global.chrome.storage.sync.get as any) = (targets: any, cb: any) => cb({})
