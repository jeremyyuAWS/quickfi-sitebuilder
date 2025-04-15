import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { DealerInfo, ConversationStep } from '../types';

interface ConversationManagerProps {
  onComplete: (dealerInfo: DealerInfo) => void;
}

const ConversationManager: React.FC<ConversationManagerProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<ConversationStep>('welcome');
  const [dealerInfo, setDealerInfo] = useState<DealerInfo>({
    name: '',
    specialization: '',
    location: '',
    brandColor: '#002366',
    secondaryColor: '#FFD700',
    financingOptions: {
      newEquipment: {
        tier1: { rates: [0, 0, 0, 0, 1.99], terms: [12, 24, 36, 48, 60] },
        tier2: { rates: [0, 0, 0, 1.99, 1.99], terms: [12, 24, 36, 48, 60] },
        tier3: { rates: [3.99, 3.99, 3.99, 3.99, 3.99], terms: [12, 24, 36, 48, 60] }
      },
      usedEquipment: {
        rate: 7.75,
        terms: [12, 24, 36, 48],
        minAmount: 25000,
        maxAmount: 5000000
      }
    }
  });

  const steps = [
    'Welcome',
    'Basic Information',
    'Financing Options',
    'Equipment Details',
    'Branding',
    'Review & Publish'
  ];

  const handleInputChange = (field: keyof DealerInfo, value: string) => {
    setDealerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('basicInfo');
        break;
      case 'basicInfo':
        setCurrentStep('financing');
        break;
      case 'financing':
        setCurrentStep('equipment');
        break;
      case 'equipment':
        setCurrentStep('branding');
        break;
      case 'branding':
        setCurrentStep('review');
        break;
      case 'review':
        onComplete(dealerInfo);
        break;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Welcome to the QuickFi Dealer Microsite Builder!
            </Typography>
            <Typography paragraph>
              I'll help you create a professional microsite for your dealership. Let's get started by gathering some basic information.
            </Typography>
          </Box>
        );
      case 'basicInfo':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <TextField
              fullWidth
              label="Dealership Name"
              value={dealerInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Equipment Specialization"
              value={dealerInfo.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Location"
              value={dealerInfo.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              margin="normal"
            />
          </Box>
        );
      case 'financing':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Financing Options
            </Typography>
            <Typography paragraph>
              We'll set up promotional financing rates for your equipment. Would you like to customize these rates?
            </Typography>
            {/* Financing options form would go here */}
          </Box>
        );
      case 'equipment':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Equipment Details
            </Typography>
            <Typography paragraph>
              Let's add details about your equipment lineup and promotional models.
            </Typography>
            {/* Equipment details form would go here */}
          </Box>
        );
      case 'branding':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Branding
            </Typography>
            <Typography paragraph>
              Customize your microsite's appearance with your brand colors.
            </Typography>
            {/* Branding customization form would go here */}
          </Box>
        );
      case 'review':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Microsite
            </Typography>
            <Typography paragraph>
              Let's review all the details before publishing your microsite.
            </Typography>
            {/* Review content would go here */}
          </Box>
        );
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Stepper activeStep={steps.indexOf(currentStep)} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: 3 }}>
        {renderStepContent()}
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 2 }}
          >
            {currentStep === 'review' ? 'Publish' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ConversationManager; 