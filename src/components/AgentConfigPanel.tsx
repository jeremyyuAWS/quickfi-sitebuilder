import React, { useState } from 'react';
import { Bot, Settings, Sliders, Info, Check, X, PlusSquare, MinusSquare } from 'lucide-react';
import { Agent } from '../agents';

interface AgentConfigPanelProps {
  agents: Agent[];
  onAgentToggle: (agentId: string, enabled: boolean) => void;
  onModelChange: (agentId: string, model: string) => void;
  onThresholdChange: (agentId: string, threshold: number) => void;
  onApply: () => void;
  onCancel: () => void;
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({
  agents,
  onAgentToggle,
  onModelChange,
  onThresholdChange,
  onApply,
  onCancel
}) => {
  const [activeAgents, setActiveAgents] = useState<string[]>(
    agents.map(agent => agent.id)
  );
  const [modelSettings, setModelSettings] = useState<Record<string, string>>(
    Object.fromEntries(agents.map(agent => [agent.id, 'default']))
  );
  const [thresholds, setThresholds] = useState<Record<string, number>>(
    Object.fromEntries(agents.map(agent => [agent.id, 0.7]))
  );
  const [advancedMode, setAdvancedMode] = useState(false);
  
  const handleAgentToggle = (agentId: string) => {
    if (activeAgents.includes(agentId)) {
      setActiveAgents(activeAgents.filter(id => id !== agentId));
    } else {
      setActiveAgents([...activeAgents, agentId]);
    }
  };
  
  const handleModelChange = (agentId: string, model: string) => {
    setModelSettings({
      ...modelSettings,
      [agentId]: model
    });
  };
  
  const handleThresholdChange = (agentId: string, threshold: number) => {
    setThresholds({
      ...thresholds,
      [agentId]: threshold
    });
  };
  
  const handleApply = () => {
    // Apply changes to parent component
    agents.forEach(agent => {
      const isEnabled = activeAgents.includes(agent.id);
      onAgentToggle(agent.id, isEnabled);
      onModelChange(agent.id, modelSettings[agent.id]);
      onThresholdChange(agent.id, thresholds[agent.id]);
    });
    
    onApply();
  };
  
  const toggleAdvancedMode = () => {
    setAdvancedMode(!advancedMode);
  };
  
  const toggleAllAgents = (enabled: boolean) => {
    if (enabled) {
      setActiveAgents(agents.map(agent => agent.id));
    } else {
      setActiveAgents([]);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Settings className="mr-2" size={18} />
          Agent Configuration
        </h2>
        <button 
          onClick={toggleAdvancedMode}
          className="text-white hover:text-blue-200 flex items-center text-sm"
        >
          <Sliders size={16} className="mr-1" />
          {advancedMode ? 'Basic Mode' : 'Advanced Mode'}
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Configure which AI agents to run and their settings
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => toggleAllAgents(true)}
              className="text-xs flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
            >
              <PlusSquare size={12} className="mr-1" />
              Enable All
            </button>
            <button 
              onClick={() => toggleAllAgents(false)}
              className="text-xs flex items-center px-2 py-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
            >
              <MinusSquare size={12} className="mr-1" />
              Disable All
            </button>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          {agents.map(agent => (
            <div 
              key={agent.id} 
              className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="flex mt-0.5">
                    <button
                      onClick={() => handleAgentToggle(agent.id)}
                      className={`w-5 h-5 rounded flex items-center justify-center ${
                        activeAgents.includes(agent.id) 
                          ? 'bg-blue-600 text-white' 
                          : 'border border-gray-300 text-transparent'
                      }`}
                    >
                      <Check size={12} />
                    </button>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 flex items-center">
                      <Bot size={16} className="mr-1 text-blue-600" />
                      {agent.type.charAt(0).toUpperCase() + agent.type.slice(1)} Agent
                    </div>
                    <div className="text-sm text-gray-600">
                      {agent.description}
                    </div>
                  </div>
                </div>
              </div>
              
              {activeAgents.includes(agent.id) && advancedMode && (
                <div className="mt-3 pl-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <select
                      value={modelSettings[agent.id]}
                      onChange={(e) => handleModelChange(agent.id, e.target.value)}
                      className="w-full text-sm p-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="default">Default (GPT-4)</option>
                      <option value="fast">Fast (GPT-3.5 Turbo)</option>
                      <option value="balanced">Balanced (Claude 2)</option>
                      <option value="specialized">Specialized (Domain Expert)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Confidence Threshold ({thresholds[agent.id]})
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.1"
                      value={thresholds[agent.id]}
                      onChange={(e) => handleThresholdChange(agent.id, parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Conservative</span>
                      <span>Balanced</span>
                      <span>Confident</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 flex items-center">
            <Info size={12} className="mr-1" />
            Changes will apply to the next microsite generation
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfigPanel;