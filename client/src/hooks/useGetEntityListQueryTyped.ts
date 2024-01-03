import {
  EntityListRequestData,
  EntityListResponse,
  useGetEntityListQuery,
} from '../api';

export function useGetEntityListQueryTyped<T>(
  queryData: EntityListRequestData,
  options?: { skip: boolean },
) {
  const requestData = useGetEntityListQuery(queryData, options);

  return {
    ...requestData,
    data: requestData.data as EntityListResponse<T> | undefined,
  };
}
