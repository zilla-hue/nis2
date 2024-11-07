'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Employee } from '@/types/employee';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash2,
  Users,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { EmployeeSidebar } from '@/components/employee-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import employeesData from '@/data/employees.json';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { fetchEmployees, saveEmployees } from '@/api/employeeApi';
import { useTheme } from '@/context/theme-context/ThemeContext';

export default function EmployeeManagement() {
  const { theme } = useTheme();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<Partial<Employee> | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [parentEmployee, setParentEmployee] = useState<Employee | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

  const fetchEmployeeData = async () => {
    try {
      const data = await fetchEmployees();
      const employeesWithIds = data.employees.map((emp: Employee) => ({
        id: emp.id || crypto.randomUUID(),
        name: emp.name,
        role: emp.role,
        image: emp.image,
        subordinates: emp.subordinates || [],
      }));
      setEmployees(employeesWithIds);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleSaveEmployees = async (updatedEmployees: Employee[]) => {
    try {
      await saveEmployees(updatedEmployees);
      // Dispatch an event to notify other components
      window.dispatchEvent(
        new CustomEvent('employeesUpdated', {
          detail: { employees: updatedEmployees },
        })
      );
    } catch (error) {
      console.error('Error saving employees:', error);
      throw error;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = async () => {
    try {
      const newEmployee = {
        ...selectedEmployee,
        id: Date.now().toString(), // Generate a unique ID
        subordinates: [],
      } as Employee;

      let updatedEmployees;
      if (parentEmployee) {
        // Add as a subordinate
        updatedEmployees = employees.map((emp) => {
          if (emp.id === parentEmployee.id) {
            return {
              ...emp,
              subordinates: [...(emp.subordinates || []), newEmployee],
            };
          }
          return emp;
        });
      } else {
        // Add as a top-level employee
        updatedEmployees = [...employees, newEmployee];
      }

      await handleSaveEmployees(updatedEmployees);
      setEmployees(updatedEmployees);
      setIsSidebarOpen(false);
      setSelectedEmployee(null);
      setParentEmployee(null);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditEmployee = async () => {
    if (selectedEmployee && selectedEmployee.id) {
      try {
        const updatedEmployees = updateEmployeeInTree(
          employees,
          selectedEmployee as Employee
        );
        await handleSaveEmployees(updatedEmployees);
        setEmployees(updatedEmployees);
        setIsSidebarOpen(false);
        setSelectedEmployee(null);
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    }
  };

  const updateEmployeeInTree = (
    employeeList: Employee[],
    updatedEmployee: Employee
  ): Employee[] => {
    return employeeList.map((emp) => {
      if (emp.id === updatedEmployee.id) {
        return { ...emp, ...updatedEmployee };
      }
      if (emp.subordinates) {
        return {
          ...emp,
          subordinates: updateEmployeeInTree(emp.subordinates, updatedEmployee),
        };
      }
      return emp;
    });
  };

  const handleDeleteEmployee = async (id: string) => {
    setEmployeeToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        const updatedEmployees = deleteEmployeeFromTree(
          employees,
          employeeToDelete
        );
        await handleSaveEmployees(updatedEmployees);
        setEmployees(updatedEmployees);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const deleteEmployeeFromTree = (
    employeeList: Employee[],
    id: string
  ): Employee[] => {
    return employeeList
      .filter((emp) => emp.id !== id)
      .map((emp) => {
        if (emp.subordinates) {
          return {
            ...emp,
            subordinates: deleteEmployeeFromTree(emp.subordinates, id),
          };
        }
        return emp;
      });
  };

  const handleSave = () => {
    if (selectedEmployee?.id) {
      handleEditEmployee();
    } else {
      handleAddEmployee();
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Filter out undefined IDs
      setSelectedEmployees(
        employees.map((e) => e.id || '').filter((id) => id !== '')
      );
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id: string | undefined, checked: boolean) => {
    if (!id) return; // Skip if ID is undefined

    if (checked) {
      setSelectedEmployees([...selectedEmployees, id]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((eId) => eId !== id));
    }
  };

  const handleBulkDelete = async () => {
    setIsBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    try {
      let updatedEmployees = [...employees];
      for (const id of selectedEmployees) {
        updatedEmployees = deleteEmployeeFromTree(updatedEmployees, id);
      }
      await handleSaveEmployees(updatedEmployees);
      setEmployees(updatedEmployees);
      setSelectedEmployees([]);
    } catch (error) {
      console.error('Error deleting selected employees:', error);
    }
    setIsBulkDeleteDialogOpen(false);
  };

  const renderEmployeeRows = (
    employees: Employee[],
    level = 0
  ): JSX.Element[] => {
    return employees.flatMap((employee) => [
      <TableRow
        key={employee.id || crypto.randomUUID()}
        className={theme === 'dark' ? 'border-gray-700' : ''}
      >
        <TableCell>
          <Checkbox
            checked={
              employee.id ? selectedEmployees.includes(employee.id) : false
            }
            onCheckedChange={(checked) =>
              handleSelectEmployee(employee.id, checked as boolean)
            }
          />
        </TableCell>
        <TableCell>
          <img
            src={employee.image}
            alt={employee.name}
            className="w-10 h-10 rounded-full"
          />
        </TableCell>
        <TableCell
          className={`font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}
        >
          {'\u00A0'.repeat(level * 4)}
          {employee.name}
        </TableCell>
        <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
          {employee.role}
        </TableCell>
        <TableCell className={theme === 'dark' ? 'text-gray-300' : ''}>
          {employee.subordinates?.length || 0}
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`hover:bg-gray-200 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
            >
              <DropdownMenuItem
                onClick={() => {
                  setSelectedEmployee(employee);
                  setIsSidebarOpen(true);
                }}
                className="flex items-center"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setParentEmployee(employee);
                  setSelectedEmployee({
                    image: '',
                    name: '',
                    role: '',
                    subordinates: [],
                  });
                  setIsSidebarOpen(true);
                }}
                className="flex items-center"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Subordinate
              </DropdownMenuItem>
              {employee.id && (
                <DropdownMenuItem
                  onClick={() => handleDeleteEmployee(employee.id as string)}
                  className="flex items-center text-red-600 hover:text-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>,
      ...(employee.subordinates
        ? renderEmployeeRows(employee.subordinates, level + 1)
        : []),
    ]);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div
        className={`${
          theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'
        } pt-24 pb-32 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Employee Organogram Management
            </h2>
            <p
              className={`text-xl ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-200'
              }`}
            >
              Manage your organization's structure
            </p>
          </div>
          <Button
            onClick={() => {
              setSelectedEmployee({
                image: '',
                name: '',
                role: '',
                subordinates: [],
              });
              setIsSidebarOpen(true);
            }}
            className={`${
              theme === 'dark'
                ? 'bg-gray-800 text-blue-400 hover:bg-gray-700'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <Card
          className={`${
            theme === 'dark'
              ? 'bg-gray-800 shadow-lg hover:shadow-xl transition-shadow'
              : 'bg-white shadow-lg hover:shadow-xl transition-shadow'
          }`}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle
                className={`text-2xl font-bold flex items-center ${
                  theme === 'dark' ? 'text-white' : ''
                }`}
              >
                <Users className="mr-2 h-6 w-6" />
                Employee List
              </CardTitle>
              {selectedEmployees.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {selectedEmployees.length} selected
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className={theme === 'dark' ? 'border-gray-700' : ''}>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedEmployees.length === employees.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Subordinates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className={theme === 'dark' ? 'text-gray-300' : ''}>
                {renderEmployeeRows(employees)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <EmployeeSidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          setSelectedEmployee(null);
          setParentEmployee(null);
        }}
        employee={selectedEmployee}
        onInputChange={handleInputChange}
        onSave={handleSave}
        parentEmployee={parentEmployee}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              employee and their subordinates from the organization.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              {selectedEmployees.length} selected employees and their
              subordinates from the organization.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete {selectedEmployees.length} Employees
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
