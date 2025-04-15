import React from 'react';
import {
  Truck, Tractor, HardHat, Hammer, Wrench, Building2, Factory,
  Landmark, Award, Shield, Rocket, Leaf, Zap, 
  Sun, Wind, Stethoscope, Microscope, Pill
} from 'lucide-react';

interface DealerLogoProps {
  name: string;
  brandColor?: string;
  size?: number;
  industry?: string;
  className?: string;
}

const DealerLogo: React.FC<DealerLogoProps> = ({
  name,
  brandColor = '#0066CC',
  size = 40,
  industry,
  className = ''
}) => {
  // Use dealer name to deterministically select logo elements
  const nameSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Detect industry from name or provided industry prop
  const detectIndustry = (): string => {
    if (industry) return industry;
    
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('med') || nameLower.includes('health') || nameLower.includes('care')) {
      return 'medical';
    }
    if (nameLower.includes('farm') || nameLower.includes('agri') || nameLower.includes('crop')) {
      return 'agriculture';
    }
    if (nameLower.includes('construct') || nameLower.includes('build') || nameLower.includes('cat')) {
      return 'construction';
    }
    if (nameLower.includes('transport') || nameLower.includes('logisti') || nameLower.includes('truck')) {
      return 'transportation';
    }
    if (nameLower.includes('solar') || nameLower.includes('energy') || nameLower.includes('power')) {
      return 'energy';
    }
    
    // Default to construction for this demo
    return 'construction';
  };
  
  const industryType = detectIndustry();
  
  // Select icon based on industry
  const getIndustryIcon = () => {
    // Return an array of industry-specific icons
    switch (industryType) {
      case 'construction':
        return [HardHat, Hammer, Wrench, Building2];
      case 'agriculture':
        return [Tractor, Leaf, Factory, Wrench];
      case 'transportation':
        return [Truck, Factory, Building2, Shield];
      case 'energy':
        return [Sun, Wind, Zap, Shield];
      case 'medical':
        return [Stethoscope, Microscope, Pill, Shield];
      default:
        return [Building2, Wrench, Hammer, Shield];
    }
  };
  
  const industryIcons = getIndustryIcon();
  
  // Select a primary and secondary icon based on the name
  const PrimaryIcon = industryIcons[nameSum % industryIcons.length];
  const SecondaryIcon = industryIcons[(nameSum + 2) % industryIcons.length];
  
  // Select shape style based on name
  const shapeStyle = nameSum % 3;
  
  // Generate a darker shade of the brand color for the secondary elements
  const getDarkerShade = (hexColor: string): string => {
    // Remove the # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert to RGB
    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);
    
    // Check if conversion worked, if not use a default color
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      r = 0; g = 102; b = 204; // Default blue color #0066CC
    }
    
    // Make darker (multiply by 0.7)
    const darkerR = Math.floor(r * 0.7);
    const darkerG = Math.floor(g * 0.7);
    const darkerB = Math.floor(b * 0.7);
    
    // Convert back to hex
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  };
  
  const secondaryColor = getDarkerShade(brandColor);
  
  // Get initial letters for text logo
  const getInitials = (): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };
  
  // Render the logo based on the shape style
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`} 
      style={{ width: size, height: size }}
    >
      {shapeStyle === 0 && (
        // Circle with icon
        <>
          <div 
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: brandColor }}
          ></div>
          <PrimaryIcon stroke="white" size={size * 0.5} className="absolute" />
        </>
      )}
      
      {shapeStyle === 1 && (
        // Split background with two icons
        <>
          <div 
            className="absolute inset-0 rounded-md overflow-hidden"
            style={{ backgroundColor: brandColor }}
          >
            <div 
              className="absolute right-0 bottom-0 w-1/2 h-1/2"
              style={{ backgroundColor: secondaryColor }}
            ></div>
          </div>
          <PrimaryIcon 
            stroke="white" 
            size={size * 0.4} 
            className="absolute top-1/4 left-1/4"
          />
          <SecondaryIcon 
            stroke="white" 
            size={size * 0.3} 
            className="absolute bottom-1/4 right-1/4"
          />
        </>
      )}
      
      {shapeStyle === 2 && (
        // Text-based logo with icon accent
        <>
          <div 
            className="absolute inset-0 rounded-md flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: brandColor, fontSize: size * 0.4 }}
          >
            {getInitials()}
          </div>
          <div 
            className="absolute bottom-0 right-0 rounded-full w-1/3 h-1/3 flex items-center justify-center"
            style={{ backgroundColor: secondaryColor }}
          >
            <PrimaryIcon stroke="white" size={size * 0.18} />
          </div>
        </>
      )}
    </div>
  );
};

export default DealerLogo;