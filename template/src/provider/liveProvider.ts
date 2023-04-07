import { LiveProvider, LiveEvent, DataProvider } from "@refinedev/core";
import { FindOptions, remult, LiveQueryChange } from "remult";
import { generateFilter } from "./dataProvider";

export const liveProvider = (entities: any[]): LiveProvider => {
    function repoByKey(key: string) {
        for (const e of entities) {
            const repo = remult.repo(e as any)
            if (repo.metadata.key === key)
                return repo;
        }
        throw Error("not found");
    }
    return {
        subscribe: ({ channel, types, params, callback }) => {
            const resource = channel.replace("resources/", "");
            const options: FindOptions<any> = {
                page: (params?.pagination?.current || 1) - 1,
                limit: params?.pagination?.pageSize
            }
            if (params?.sorters) {
                options.orderBy = {};
                for (const s of params?.sorters) {
                    options.orderBy[s.field] = s.order;
                }
            }
            options.where = generateFilter(params?.filters);

            const unsubscribe = repoByKey(resource).liveQuery(options).subscribe((data) => {
                console.log("liveQuery", data)
                const event: LiveEvent = {
                    type: data.changes.length > 0 ? "update" : "create",
                    channel: resource,
                    payload: {
                        data
                    },
                    date: new Date(),
                }
                callback(event);
            });

            return { unsubscribe };

        },
        unsubscribe: (subscription) => {
            subscription.unsubscribe();
        }
    };
};