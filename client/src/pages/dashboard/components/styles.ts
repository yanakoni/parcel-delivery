import { CSSProperties } from 'react';

export const styles: {
  [key: string]: CSSProperties | { [key: string]: CSSProperties };
} = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  balanceHistoryGraph: {
    '& .MuiBarElement-root': {
      strokeWidth: 4,
      fill: '#5B87ED',
    },
    '& .MuiHighlightElement-root': {
      fill: '#205EEE',
      borderRadius: '50%',
      outline: '2px solid #FFF',
      boxShadow: ' 0px 0px 10px 10px rgba(0,0,0,0.7)',
    },
    '& .MuiChartsAxis-tick': {
      display: 'none',
    },
    '& .MuiChartsAxis-line': {
      stroke: '#9C9C9C',
    },
    '& .MuiChartsAxis-tickLabel': {
      fill: '#9C9C9C',
    },
  },
  profitLossBadgeContainer: {
    padding: '18px 116px',
    borderRadius: '13px',
    border: '1px solid rgba(0, 0, 0, 0.02)',
    background: '#FDFDFD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceHistoryBadgeContainer: {
    padding: '18px 55px',
  },
  detailsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexFlow: 'column nowrap',
  },
  icon: {
    width: '25px',
    height: '25px',
  },
  incomeIcon: {
    borderRadius: '17px',
    padding: '16px',
    background: '#ECF3ED',
    color: '#007611',
  },
  expensesIcon: {
    borderRadius: '17px',
    padding: '16px',
    background: '#FEF2F2',
    color: '#E90202',
  },
};
