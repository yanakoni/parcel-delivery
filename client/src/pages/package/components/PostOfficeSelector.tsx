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
import { showNotification } from '../../../utils';
import { hasErrorMessage } from '../../../guards';
import { PostOffice } from '../../../interfaces';
import axios from 'axios';

interface PostOfficeSelectorProps {
  selectedPostOfficeId: string;
  onPostOfficeSelect: (_id: string) => void;
}

const PostOfficeSelector = ({ selectedPostOfficeId, onPostOfficeSelect }: PostOfficeSelectorProps) => {
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activePostOffice, setActivePostOffice] = useState(selectedPostOfficeId);

  const toggle = () => setIsOpen(!isOpen);

  const formatPostOffice = ({ name, address: { country, state, city, street, tel } }: PostOffice) => {
    return `${name}, ${country}, ${state}, ${city}, ${street}, ${tel}`;
  };

  const formatSelectedPostOffice = () => {
    const postOffice = postOffices.find(({ id }) => id === activePostOffice);

    if (postOffice) {
      return formatPostOffice(postOffice);
    }

    return 'Select a postOffice*';
  };

  const searchPostOffices = async (value = '') => {
    try {
      const abortController = new AbortController();
      const { data: responseData } = await axios.get('http://localhost:3000/postOffices', {
        params: { namePrefix: value },
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
            {activePostOffice ? `Selected ${formatSelectedPostOffice()}` : 'Select a Post Office'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            type="search"
            onChange={(event) => searchPostOffices(event.target.value)}
            placeholder="Search a postOffice..."
            fullWidth
          />
          {postOffices && !!postOffices.length && (
            <Card>
              <List>
                {postOffices.map((postOffice) => (
                  <ListItem
                    key={postOffice.id}
                    onClick={() => {
                      setActivePostOffice(postOffice.id);
                      onPostOfficeSelect(postOffice.id);
                      toggle();
                    }}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#5d8ac0',
                        cursor: 'pointer',
                      },
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
