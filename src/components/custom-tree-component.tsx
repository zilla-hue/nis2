import React, { createContext, useContext, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

// Context for managing expanded state
const TreeContext = createContext<{
  expanded: Record<string, boolean>;
  toggleExpanded: (id: string) => void;
}>({
  expanded: {},
  toggleExpanded: () => {},
});

interface TreeProps {
  children: React.ReactNode;
}

export const Tree: React.FC<TreeProps> = ({ children }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TreeContext.Provider value={{ expanded, toggleExpanded }}>
      <div className="tree">{children}</div>
    </TreeContext.Provider>
  );
};

interface TreeItemProps {
  id: string;
  label: React.ReactNode;
  children?: React.ReactNode;
}

export const TreeItem: React.FC<TreeItemProps> = ({ id, label, children }) => {
  const { expanded, toggleExpanded } = useContext(TreeContext);
  const isExpanded = expanded[id];
  const hasChildren = React.Children.count(children) > 0;

  return (
    <li className="group">
      <div
        className="tree-item-header flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => hasChildren && toggleExpanded(id)}
      >
        {hasChildren && (
          <span className="mr-2">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
        <span className="tree-item-label">{label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="tree-item-children ml-4 mt-1 border-l-2 border-gray-200 pl-4">
          {children}
        </div>
      )}
    </li>
  );
};
