import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, DataGridProps, GridColDef, GridPaginationModel, GridValidRowModel } from '@mui/x-data-grid';
import { CustomNoRowsOverlay } from '../CustomNoRowsOverlay';
import { DeleteActionButton } from './DeleteActionButton';
import { usePagination } from '../../hooks';
import { EditActionButton } from './EditActionButton';
// import { isCursorPagination } from '../../guards';
import { EntityListResponse } from '../../api';

const slots = {
  noRowsOverlay: CustomNoRowsOverlay,
  noResultsOverlay: CustomNoRowsOverlay,
};

interface PaginatedTableProps<T extends GridValidRowModel>
  extends Omit<
    DataGridProps<T>,
    | 'slots'
    | 'slotProps'
    | 'disableRowSelectionOnClick'
    | 'sx'
    | 'paginationMode'
    | 'paginationModel'
    | 'onPaginationModelChange'
    | 'rows'
  > {
  data?: EntityListResponse<T>;
  setDynamicQueryObj: (value: Record<string, string>) => void;
  editable?: boolean;
  deletable?: boolean;
  deletableRowCondition?: (rowEl: T) => boolean;
  editableRowCondition?: (rowEl: T) => boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  pageSizeSelectorOptions?: number[];
  defaultPageSize?: number;
}

export function PaginatedTable<T extends GridValidRowModel>({
  data,
  setDynamicQueryObj,
  columns,
  editable = false,
  deletable = false,
  deletableRowCondition,
  editableRowCondition,
  onDelete,
  onEdit,
  pageSizeSelectorOptions,
  defaultPageSize,
  ...props
}: PaginatedTableProps<T>) {
  const pageSize = defaultPageSize || 20;

  const [rowCount, setRowCount] = useState(0);
  const [actualPaginationQuery, setActualPaginationQuery] = useState<Record<string, string>>({});

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize,
    page: 0,
  });

  useEffect(() => {
    setDynamicQueryObj({
      'page[size]': paginationModel.pageSize.toString(),
      ...actualPaginationQuery,
    });
  }, [actualPaginationQuery, paginationModel.pageSize, setDynamicQueryObj]);

  useEffect(() => {
    if (!data) return;

    const meta = data.meta;

    if (meta) {
      // const count = isCursorPagination(meta) ? Number.MAX_VALUE : meta.total;

      setRowCount(Number.MAX_VALUE);
    }
  }, [data]);

  const pageSizeOptions = useMemo(() => pageSizeSelectorOptions || [20, 50, 100], [pageSizeSelectorOptions]);

  const setPaginationQuery = useCallback((value: Record<string, string>) => {
    setActualPaginationQuery(value);
  }, []);

  const { next, prev } = usePagination({
    responseMeta: data?.meta,
    page: paginationModel.page,
    setPaginationQuery,
  });

  const paginationModelChangeHandler = useCallback(
    (model: GridPaginationModel) => {
      if (paginationModel.page < model.page) next();
      if (paginationModel.page > model.page) prev();

      setPaginationModel(model);
    },
    [paginationModel.page, next, prev, setPaginationModel],
  );

  const slotProps = useMemo(() => {
    const meta = data?.meta;

    if (!meta /*|| !isCursorPagination(meta)*/) return {};

    return {
      pagination: {
        nextIconButtonProps: {
          // Disable next button for cursor pagination
          // disabled: meta.size !== meta.count,
        },
      },
    };
  }, [data]);

  const rowActions = useMemo<GridColDef<T> | null>(() => {
    if (!editable && !deletable) return null;

    return {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      cellClassName: 'actions',
      getActions: (rowEl) => {
        const { id } = rowEl.row;

        const actions = [];

        if (editable && onEdit && (!editableRowCondition || editableRowCondition(rowEl.row))) {
          actions.push(<EditActionButton id={id} onEdit={onEdit} />);
        }

        if (deletable && onDelete && (!deletableRowCondition || deletableRowCondition(rowEl.row))) {
          actions.push(<DeleteActionButton id={id} onDelete={onDelete} />);
        }

        return actions;
      },
    };
  }, [deletable, deletableRowCondition, editable, editableRowCondition, onDelete, onEdit]);

  const allColumns = useMemo(() => {
    return rowActions ? columns.concat(rowActions) : columns;
  }, [columns, rowActions]);

  return (
    <DataGrid
      autoHeight
      {...props}
      columns={allColumns}
      rows={data?.values || []}
      rowCount={rowCount}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={paginationModelChangeHandler}
      pageSizeOptions={pageSizeOptions}
      disableColumnMenu
      slots={slots}
      slotProps={slotProps}
      disableRowSelectionOnClick
      sx={{
        '--DataGrid-overlayHeight': '300px',
        '.MuiTablePagination-displayedRows': {
          ...(rowCount === Number.MAX_VALUE && { display: 'none' }),
        },
      }}
    />
  );
}
