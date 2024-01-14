import { useCallback, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Divider, Drawer, IconButton, List, ListItem, Tab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { fixtures } from '../../pages';
import { daysAgo } from '../../utils';
import { styles } from './styles';

interface ITab {
  label: string;
  id: string;
}

const tabs: ITab[] = [
  {
    label: 'All',
    id: 'all',
  },
  {
    label: 'Account',
    id: 'account',
  },
  {
    label: 'News',
    id: 'news',
  },
  {
    label: 'Tracking',
    id: 'tracking',
  },
];

const NotificationsList = ({ toggle, open }: { toggle: () => void; open: boolean }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleChange = useCallback((newValue: string) => {
    setActiveTab(newValue);
  }, []);

  return (
    <Drawer anchor="right" open={open} onClose={toggle} sx={styles.drawerContainer}>
      <Box pl="18px" mt={3} display="flex" flexDirection="column" gap={4}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
            <Typography component="h1" variant="h3" color="text.primary">
              {t('general.notifications')}
            </Typography>
            <Button color="primary" onClick={() => null} sx={{ ...styles.markAsReadButton, padding: '0 !important' }}>
              {t('general.markAllAsRead')}
            </Button>
          </Box>
          <Box>
            <IconButton aria-label="close notifications tab" onClick={toggle}>
              <CloseIcon width={30} height={30} />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <TabContext value={activeTab}>
            <Box sx={styles.tabListContainer}>
              <TabList onChange={(_e, value) => handleChange(value)}>
                {tabs.map(({ id, label }) => {
                  const unreadCount =
                    id === 'all'
                      ? fixtures.notifications.length
                      : fixtures.notifications.filter(({ group }) => group === id).length;

                  return (
                    <Tab
                      label={label}
                      value={id}
                      key={id}
                      icon={
                        <span
                          color="primary"
                          style={{
                            display: unreadCount ? 'inline-block' : 'none',
                            background: id === activeTab ? '#134ED4' : 'rgba(156, 156, 156, 0.30)',
                            color: id === activeTab ? '#FFF' : '#9C9C9C',
                            borderRadius: '7px',
                            padding: '1px 10px',
                            fontSize: '15px',
                          }}
                        >
                          {unreadCount}
                        </span>
                      }
                      iconPosition="end"
                    />
                  );
                })}
              </TabList>
            </Box>
            {tabs.map(({ id }) => (
              <TabPanel
                key={id}
                value={id}
                sx={{
                  overflowY: 'auto',
                  maxHeight: 'calc(100vh - 300px)',
                }}
              >
                <List component="div" disablePadding>
                  {fixtures.notifications
                    .filter(({ group }) => activeTab === 'all' || group === activeTab)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(({ title, body, date }) => (
                      <ListItem key={title} sx={styles.notification}>
                        <Typography component="h2" variant="h5" color="text.primary">
                          {title}
                        </Typography>
                        <Typography component="p" variant="subtitle1" color="text.primary" sx={styles.notificationBody}>
                          {body}
                        </Typography>
                        <Typography component="p" variant="body1" color="primary">
                          {daysAgo(date)}
                        </Typography>
                        <Divider />
                      </ListItem>
                    ))}
                </List>
              </TabPanel>
            ))}
          </TabContext>
        </Box>
        <Box></Box>
      </Box>
    </Drawer>
  );
};

export { NotificationsList };
