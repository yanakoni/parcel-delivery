import { useCallback, useMemo, useReducer } from 'react';
import { Filter } from '../entity-crud';

const ACTION_TYPES = {
  CHANGE: 'CHANGE',
} as const;

export type FiltersState = Record<string, string>;
type ActionType = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];

export interface FiltersChangePayload {
  field: string;
  value: string;
}

interface FilterAction {
  type: ActionType;
  payload: FiltersChangePayload;
}

const reducer = (state: FiltersState, action: FilterAction) => {
  const {
    type,
    payload: { field, value },
  } = action;

  switch (type) {
    case ACTION_TYPES.CHANGE:
      return {
        ...state,
        [`filter[${field}]`]: value,
      };
    default:
      return state;
  }
};

const getInitialState = (filterList: Filter[]) => {
  return filterList.reduce<FiltersState>((acc, current) => {
    acc[`filter[${current.field}]`] = '';

    return acc;
  }, {});
};

export const useFilters = (filterList: Filter[] = []) => {
  const initialState = getInitialState(filterList);

  const [state, dispatch] = useReducer(reducer, initialState);

  const changeValue = useCallback(
    (payload: FiltersChangePayload) => {
      dispatch({
        type: ACTION_TYPES.CHANGE,
        payload,
      });
    },
    [dispatch],
  );

  const notEmptyFilters = useMemo<FiltersState>(() => {
    return Object.keys(state).reduce<FiltersState>((acc, key) => {
      if (state[key]) acc[key] = state[key];

      return acc;
    }, {});
  }, [state]);

  return {
    filtersState: notEmptyFilters,
    changeFiltersValue: changeValue,
  };
};
