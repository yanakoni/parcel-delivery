const parseMongoAggregationFilter = (filterString: string) => {
    try {
        const parsedFilter = JSON.parse(filterString);
        return parsedFilter
            .map(
                ({
                    name,
                    type,
                    place,
                    value,
                    plain,
                }: {
                    name: string;
                    type:
                        | 'string'
                        | 'number'
                        | 'array'
                        | 'date'
                        | 'string-to-number';
                    value: any;
                    place?: 'start' | 'end';
                    plain?: boolean;
                }) => {
                    if (
                        typeof value !== 'number' &&
                        (!value || !value.length)
                    ) {
                        return null;
                    }

                    switch (type) {
                        case 'string':
                            return { [name]: { $regex: value, $options: 'i' } };
                        case 'number':
                            return {
                                [name]: {
                                    [place === 'start' ? '$gte' : '$lte']:
                                        value,
                                },
                            };
                        case 'string-to-number':
                            return { [name]: { $eq: +value } };
                        case 'array':
                            return { [name]: { $in: value } };
                        case 'date':
                            return {
                                [name]: {
                                    [place === 'start' ? '$gte' : '$lte']:
                                        place === 'start' || plain
                                            ? new Date(value).toISOString()
                                            : new Date(
                                                  new Date(value).getTime() +
                                                      86399 * 1000,
                                              ).toISOString(),
                                },
                            };
                        default:
                            console.error('Empty filter item. Escaping...');
                            break;
                    }
                },
            )
            .filter(Boolean);
    } catch (err) {
        console.error(`Couldn't parse filter query: ${err}`);
    }
};

export { parseMongoAggregationFilter };
