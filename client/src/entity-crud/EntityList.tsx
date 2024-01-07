import { FC, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { EntityName, ListEntityPageProps } from './config';
import { useGetEntityListQuery } from '../api';
import { DefaultListPage } from './components';
import { EntityConfigAndName, useEntityConfig, useFilters, useHasPermissions } from '../hooks';
import { ROUTES } from '../consts';
import { objectToQueryString } from '../utils';

interface EntityListContentProps {
  entityConfig: EntityConfigAndName;
}

const EntityListContent: FC<EntityListContentProps> = ({ entityConfig }) => {
  const { apiUrl, listPage: ListPage, permission, entityName, filters, includes } = entityConfig;

  const { filtersState, changeFiltersValue } = useFilters(filters);

  const [dynamicQueryObj, setDynamicQueryObj] = useState<Record<string, string>>({});

  const queryParams = useMemo(() => {
    let url = objectToQueryString({
      ...dynamicQueryObj,
      ...(includes.list && { include: includes.list }),
      ...filtersState,
    });

    return `?${url}`;
  }, [dynamicQueryObj, includes.list, filtersState]);

  const getEntityListReq = useGetEntityListQuery({
    entity: { ...apiUrl, url: apiUrl.url + queryParams },
    entityName: entityName as EntityName,
  });

  const props: ListEntityPageProps = useMemo(
    () => ({
      isLoading: getEntityListReq.isFetching,
      data: getEntityListReq.data,
      apiUrl: apiUrl.url,
      entityConfig,
      filtersState,
      changeFiltersValue,
      setDynamicQueryObj,
    }),
    [apiUrl, entityConfig, filtersState, changeFiltersValue, setDynamicQueryObj],
  );

  const hasPermissions = useHasPermissions({
    ...permission,
    action: 'read',
  });

  if (!hasPermissions) return <Navigate to={ROUTES.DASHBOARD} />;

  const ResultComponent = ListPage || DefaultListPage;

  return <ResultComponent {...props} />;
};

export const EntityList = () => {
  const entityConfig = useEntityConfig();

  if (!entityConfig) return 'There are no resources by this path!';

  // Key prop was added to rerender EntityListContent component when we change dynamic path
  return <EntityListContent entityConfig={entityConfig} key={entityConfig.entityName} />;
};
