import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomReadableAccordion = ({
  title,
  children,
  isDisabled = false,
  expanded: propExpanded,
  onChange,
  summarySx,
  detailsSx,
  ...props
}) => {
  const [localExpanded, setLocalExpanded] = useState(false);
  const theme = useTheme();

  const isControlled = typeof propExpanded !== 'undefined';
  const expanded = isControlled ? propExpanded : localExpanded;

  const handleChange = (event, newExpanded) => {
    if (!isControlled) {
      setLocalExpanded(newExpanded);
    }
    onChange?.(event, newExpanded);
  };

  return (
    <MuiAccordion
      expanded={expanded}
      onChange={handleChange}
      disabled={isDisabled}
      sx={{
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        '&:before': { display: 'none' }, // Remove default underline
        '&:hover': {
          boxShadow: theme.shadows[3],
        },
        ...props.sx
      }}
      {...props}
    >
      <AccordionSummary
        expandIcon={
          <Box
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
            }}
          >
            <ExpandMoreIcon />
          </Box>
        }
        sx={{
          backgroundColor: expanded
            ? theme.palette.action.selected
            : theme.palette.background.paper,
          '&:hover': {
            backgroundColor: !expanded && theme.palette.action.hover,
          },
          ...summarySx
        }}
      >
        <Typography variant="subtitle1" component="div">
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
          ...detailsSx
        }}
      >
        <Box sx={{ padding: theme.spacing(1, 0) }}>
          {children}
        </Box>
      </AccordionDetails>
    </MuiAccordion>
  );
};


export default CustomReadableAccordion;