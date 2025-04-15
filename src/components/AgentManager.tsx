import React, { useState, useEffect } from 'react';
import { AgentOutput, DealerConfig } from '../types';
import { agentRegistry } from '../agents';
import AgentProcessing from './AgentProcessing';

interface AgentManagerProps {
  dealer: DealerConfig;
  onComplete?: (outputs: AgentOutput[]) => void;
}

const AgentManager: React.FC<AgentManagerProps> = ({ dealer, onComplete }) => {
  const [agentOutputs, setAgentOutputs] = useState<AgentOutput[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);
  
  useEffect(() => {
    const startProcessing = async () => {
      // Initialize all agents as pending
      const initialOutputs = agentRegistry.getAllAgents().map(agent => ({
        id: agent.id,
        type: agent.type,
        status: 'pending' as const
      }));
      
      setAgentOutputs(initialOutputs);
      setIsProcessing(true);
      
      // Process all agents
      const results = await agentRegistry.processDealer(dealer);
      
      setAgentOutputs(results);
      setIsProcessing(false);
      
      if (onComplete) {
        onComplete(results);
      }
    };
    
    startProcessing();
  }, [dealer]);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          AI Agents Processing
        </h3>
        {isProcessing ? (
          <span className="text-sm text-blue-600">Processing...</span>
        ) : (
          <span className="text-sm text-green-600">Complete</span>
        )}
      </div>
      
      {agentOutputs.map(agent => (
        <AgentProcessing 
          key={agent.id}
          agent={agent}
        />
      ))}
    </div>
  );
};

export default AgentManager;