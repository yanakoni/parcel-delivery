import { useEffect, useState } from 'react';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { apiRequest, showNotification } from '../../../utils';
import { hasErrorMessage } from '../../../guards';
import { PostOffice } from '../../../interfaces';

interface PostOfficeSelectorProps {
  selectedPostOfficeId: string;
  onPostOfficeSelect: (_id: string) => void;
}

const PostOfficeSelector = ({ selectedPostOfficeId, onPostOfficeSelect }: PostOfficeSelectorProps) => {
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const formatPostOffice = ({ name, address: { street, tel } }: PostOffice) => {
    return `${name}, ${street}, ${tel}`;
  };

  const formatSelectedPostOffice = () => {
    const postOffice = postOffices.find(({ _id }) => _id === selectedPostOfficeId);

    if (postOffice) {
      return formatPostOffice(postOffice);
    }

    return 'Select a postOffice*';
  };

  const searchPostOffices = async (value = '') => {
    try {
      const abortController = new AbortController();

      const { data: responseData } = await apiRequest(`http://localhost:3001/postOffice/search?search=${value}`, {
        signal: abortController.signal,
      });
      const { message, data } = responseData;

      if (message) {
        if (Array.isArray(message)) {
          message.forEach((msg) => showNotification(msg, 'error'));
        } else {
          showNotification(message, 'error');
        }
        abortController.abort();
      }

      setPostOffices(data);
    } catch (err) {
      console.error(err);
      if (hasErrorMessage(err)) {
        showNotification(err.message, 'error');
      }
    }
  };

  useEffect(() => {
    searchPostOffices();
  }, []);

  return (
    <Box>
      <Accordion expanded={isOpen} onChange={toggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {selectedPostOfficeId ? `Selected ${formatSelectedPostOffice()}` : 'Select a Post Office'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            type="search"
            name="search"
            onChange={({ target: { value = '' } }) => searchPostOffices(value)}
            placeholder="Search a postOffice..."
            fullWidth
          />
          {postOffices && !!postOffices.length && (
            <Card>
              <List>
                {postOffices.map((postOffice) => (
                  <ListItem
                    key={postOffice._id}
                    onClick={() => {
                      onPostOfficeSelect(postOffice._id);
                      toggle();
                    }}
                    role="button"
                  >
                    {formatPostOffice(postOffice)}
                  </ListItem>
                ))}
              </List>
            </Card>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export { PostOfficeSelector };
