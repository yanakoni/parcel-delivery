import { PipelineStage } from 'mongoose';
import { Sort } from '../types';

const combinePipeline = (
    skip: number,
    limit: number,
    sort: Sort | null,
    filter: any,
): PipelineStage[] => {
    let pipeline: PipelineStage[] = [
        { $skip: skip || 0 },
        { $limit: limit || 20 },
    ];

    if (!!sort && Object.values(sort).length) {
        pipeline = [{ $sort: sort }, ...pipeline];
    } else {
        pipeline = [{ $sort: { _id: -1 } }, ...pipeline];
    }

    if (!!filter && Object.values(filter).length) {
        pipeline = [{ $match: { $and: filter } }, ...pipeline];
    }

    return pipeline;
};

export { combinePipeline };
