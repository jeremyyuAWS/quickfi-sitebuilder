import React from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { DealerInfo } from '../types';

interface EquipmentDetailsFormProps {
  dealerInfo: DealerInfo;
  onUpdate: (updates: Partial<DealerInfo>) => void;
}

const EquipmentDetailsForm: React.FC<EquipmentDetailsFormProps> = ({ dealerInfo, onUpdate }) => {
  const handleAddEquipment = () => {
    onUpdate({
      equipment: [
        ...dealerInfo.equipment,
        {
          name: '',
          description: '',
          imageUrl: '',
          category: 'new'
        }
      ]
    });
  };

  const handleEquipmentChange = (index: number, field: string, value: string) => {
    const newEquipment = [...dealerInfo.equipment];
    newEquipment[index] = {
      ...newEquipment[index],
      [field]: value
    };
    
    onUpdate({
      equipment: newEquipment
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Equipment Details
      </Typography>
      
      {dealerInfo.equipment.map((item, index) => (
        <Box key={index} sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Equipment Name"
                value={item.name}
                onChange={(e) => handleEquipmentChange(index, 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                select
                value={item.category}
                onChange={(e) => handleEquipmentChange(index, 'category', e.target.value)}
                SelectProps={{
                  native: true
                }}
              >
                <option value="new">New Equipment</option>
                <option value="used">Used Equipment</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={item.description}
                onChange={(e) => handleEquipmentChange(index, 'description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={item.imageUrl}
                onChange={(e) => handleEquipmentChange(index, 'imageUrl', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEquipment}
        sx={{ mt: 2 }}
      >
        Add Equipment
      </Button>
    </Box>
  );
};

export default EquipmentDetailsForm; 