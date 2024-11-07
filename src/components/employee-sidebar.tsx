import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Employee } from '@/types/employee';
import { X } from 'lucide-react'; // Import the X icon for the close button

interface EmployeeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Partial<Employee> | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  parentEmployee?: Employee | null;
}

export function EmployeeSidebar({
  isOpen,
  onClose,
  employee,
  onInputChange,
  onSave,
  parentEmployee,
}: EmployeeSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg p-6 overflow-y-auto z-50 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {employee?.id ? 'Edit Employee' : 'Add New Employee'}
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      {parentEmployee && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Adding subordinate to:</p>
          <p className="font-medium">{parentEmployee.name}</p>
        </div>
      )}
      <div className="space-y-4">
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={employee?.image || ''}
            onChange={onInputChange}
          />
        </div>
        <div>
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="firstname"
            name="name"
            value={employee?.name || ''}
            onChange={onInputChange}
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            value={employee?.role || ''}
            onChange={onInputChange}
          />
        </div>
        <div>
          <Label htmlFor="subordinates">Subordinates</Label>
          <Input
            id="subordinates"
            name="subordinates"
            value={employee?.subordinates?.length.toString() || ''}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="mt-6 space-x-2">
        <Button onClick={onSave}>
          {employee?.id ? 'Save Changes' : 'Add Employee'}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
