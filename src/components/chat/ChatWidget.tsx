import { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

interface ChatWidgetProps {
  employeeName?: string;
  employeeRole?: string;
}

export function ChatWidget({ employeeName, employeeRole }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatWindow 
        isOpen={isOpen} 
        employeeName={employeeName}
        employeeRole={employeeRole}
      />
      <ChatButton 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
      />
    </>
  );
}