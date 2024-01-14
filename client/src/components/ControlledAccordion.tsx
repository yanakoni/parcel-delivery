import { SyntheticEvent, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface AccordionItem {
  accordionId: string;
  accordionSummary: string;
  accordionDetails: any;
}

interface ControlledAccordionProps {
  accordions: AccordionItem[];
}

const ControlledAccordion = ({ accordions }: ControlledAccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>('userAccordion');

  const handleChange = (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!accordions.length) return null;

  return (
    <Box mb={3}>
      {accordions.map(({ accordionId, accordionSummary, accordionDetails }) => (
        <Accordion key={accordionId} expanded={expanded === accordionId} onChange={handleChange(accordionId)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${accordionId}bh-content`}
            id={`${accordionId}bh-header`}
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{accordionSummary}</Typography>
          </AccordionSummary>
          <AccordionDetails>{accordionDetails}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export { ControlledAccordion };
export type { AccordionItem };
