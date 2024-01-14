import { SxProps, Theme } from '@mui/material';

const iconStyles = {
  p: 2,
  borderRadius: '17px',
};

const cardStyles = {
  borderRadius: '20px',
};

export const styles: { [key: string]: SxProps<Theme> } = {
  main: {
    p: { xs: 2, sm: 4 },
  },
  firstRow: {
    height: 'min-content',
  },
  cardContainer: {
    ...cardStyles,
  },
  bottomRowCardContainer: {
    ...cardStyles,
    width: '100%',
  },
  cardContent: {
    height: '100%',
    padding: 0,
  },
  innerCard: {
    height: '100%',
    display: 'flex',
    padding: '41px 50px',
    gap: 4,
    borderRadius: '20px',
  },
  adminInnerCard: {
    height: '100%',
    display: '-webkit-box',
    p: 4,
    gap: 4,
    borderRadius: '20px',
  },
  blueCardIcon: {
    ...iconStyles,
    background: '#E6EDFD',
    color: '#205EEE',
  },
  greenCardIcon: {
    ...iconStyles,
    background: '#ECF3ED',
    color: '#007611',
  },
  redCardIcon: {
    ...iconStyles,
    background: '#efe4e4',
    color: '#a73333',
  },
  icon: {
    width: '40px',
    height: '40px',
  },
  smallCardTextColumn: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
  },
  referralLinkCard: {
    padding: '24px 29px',
    gap: 1,
  },
  referralLinkContainer: {
    padding: '12px 20px',
    borderRadius: '15px',
    border: '1px solid #F7F7F7',
    background: '#FCFCFC',
  },
  referralLink: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center',
  },
  copyButton: {
    padding: '12px',
    marginLeft: '20px',
    borderRadius: '10px',
    background: '#F2F5FE',
    color: '#205EEE',
  },
  graph: {
    padding: '35px !important',
  },
  table: {
    padding: '20px',
  },
  tableHeading: {
    padding: '12px',
    fontWeight: 500,
  },
  modalBox: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    width: '500px',
    background: '#FFF',
    borderRadius: '15px',
    outline: 'none',
    textAlign: 'center',
  },
};
