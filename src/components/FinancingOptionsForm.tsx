import React from 'react';
import { Box, Typography, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DealerInfo } from '../types';

interface FinancingOptionsFormProps {
  dealerInfo: DealerInfo;
  onUpdate: (updates: Partial<DealerInfo>) => void;
}

const FinancingOptionsForm: React.FC<FinancingOptionsFormProps> = ({ dealerInfo, onUpdate }) => {
  const handleRateChange = (tier: 'tier1' | 'tier2' | 'tier3', termIndex: number, value: string) => {
    const newRates = [...dealerInfo.financingOptions.newEquipment[tier].rates];
    newRates[termIndex] = parseFloat(value) || 0;
    
    onUpdate({
      financingOptions: {
        ...dealerInfo.financingOptions,
        newEquipment: {
          ...dealerInfo.financingOptions.newEquipment,
          [tier]: {
            ...dealerInfo.financingOptions.newEquipment[tier],
            rates: newRates
          }
        }
      }
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        New Equipment Financing
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Term (Months)</TableCell>
              <TableCell>Tier 1 (Excellent)</TableCell>
              <TableCell>Tier 2 (Good)</TableCell>
              <TableCell>Tier 3 (Fair)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dealerInfo.financingOptions.newEquipment.tier1.terms.map((term, index) => (
              <TableRow key={term}>
                <TableCell>{term}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={dealerInfo.financingOptions.newEquipment.tier1.rates[index]}
                    onChange={(e) => handleRateChange('tier1', index, e.target.value)}
                    InputProps={{ endAdornment: '%' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={dealerInfo.financingOptions.newEquipment.tier2.rates[index]}
                    onChange={(e) => handleRateChange('tier2', index, e.target.value)}
                    InputProps={{ endAdornment: '%' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={dealerInfo.financingOptions.newEquipment.tier3.rates[index]}
                    onChange={(e) => handleRateChange('tier3', index, e.target.value)}
                    InputProps={{ endAdornment: '%' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom>
        Used Equipment Financing
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Interest Rate"
            value={dealerInfo.financingOptions.usedEquipment.rate}
            onChange={(e) => onUpdate({
              financingOptions: {
                ...dealerInfo.financingOptions,
                usedEquipment: {
                  ...dealerInfo.financingOptions.usedEquipment,
                  rate: parseFloat(e.target.value) || 0
                }
              }
            })}
            InputProps={{ endAdornment: '%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Minimum Amount"
            value={dealerInfo.financingOptions.usedEquipment.minAmount}
            onChange={(e) => onUpdate({
              financingOptions: {
                ...dealerInfo.financingOptions,
                usedEquipment: {
                  ...dealerInfo.financingOptions.usedEquipment,
                  minAmount: parseFloat(e.target.value) || 0
                }
              }
            })}
            InputProps={{ startAdornment: '$' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Maximum Amount"
            value={dealerInfo.financingOptions.usedEquipment.maxAmount}
            onChange={(e) => onUpdate({
              financingOptions: {
                ...dealerInfo.financingOptions,
                usedEquipment: {
                  ...dealerInfo.financingOptions.usedEquipment,
                  maxAmount: parseFloat(e.target.value) || 0
                }
              }
            })}
            InputProps={{ startAdornment: '$' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancingOptionsForm; 