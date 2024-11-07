"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchEmployees } from "@/api/employeeApi";
import { useTheme } from "@/context/theme-context/ThemeContext";

interface Employee {
  id?: string;
  name: string;
  role: string;
  image: string;
  subordinates?: Employee[];
}

const EmployeeNode: React.FC<{ employee: Employee; isRoot?: boolean }> = ({
  employee,
  isRoot = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center ${isRoot ? "mb-4 md:mb-8" : ""}`}
    >
      <Avatar
        className={`${
          isRoot ? "w-16 h-16 md:w-24 md:h-24" : "w-12 h-12 md:w-16 md:h-16"
        } border-4 border-white shadow-lg`}
      >
        <AvatarImage src={employee.image} alt={employee.name} />
        <AvatarFallback>
          {employee.name ? employee.name.charAt(0) : "?"}
        </AvatarFallback>
      </Avatar>
      <div className="text-center mt-2">
        <div
          className={`font-semibold ${
            isRoot ? "text-base md:text-lg" : "text-xs md:text-sm"
          }`}
        >
          {employee.name || "Unknown"}
        </div>
        <div
          className={`text-gray-500 ${
            isRoot ? "text-xs md:text-sm" : "text-xxs md:text-xs"
          }`}
        >
          {employee.role || "No role"}
        </div>
      </div>
    </div>
  );
};

const OrganogramLevel: React.FC<{
  employees: Employee[] | Employee;
  isRoot?: boolean;
}> = ({ employees, isRoot = false }) => {
  const employeeArray = Array.isArray(employees) ? employees : [employees];

  return (
    <div
      className={`relative flex flex-col items-center ${
        isRoot ? "mb-8 md:mb-16" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        {employeeArray.map((employee, index) => (
          <div
            key={employee.id}
            className={`flex flex-col items-center ${
              index > 0 ? "mt-8 md:mt-0 md:ml-8 lg:ml-16" : ""
            }`}
          >
            <EmployeeNode employee={employee} isRoot={isRoot} />
            {employee.subordinates && employee.subordinates.length > 0 && (
              <div className="relative mt-4 md:mt-8">
                <div className="absolute top-0 left-1/2 w-px h-4 md:h-8 bg-gray-300 -translate-x-1/2 -translate-y-full"></div>
                <OrganogramLevel employees={employee.subordinates} />
              </div>
            )}
          </div>
        ))}
      </div>
      {!isRoot && (
        <div className="absolute top-0 left-0 right-0 -translate-y-4 md:-translate-y-8 hidden md:block">
          <div className="relative h-4 md:h-8">
            <div className="absolute top-0 left-0 right-0 h-px bg-gray-300"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-gray-300"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-gray-300"></div>
          </div>
        </div>
      )}
      {isRoot && Array.isArray(employees) && employees[0]?.subordinates && (
        <div className="absolute top-full left-1/2 w-px h-4 md:h-8 bg-gray-300 -translate-x-1/2 -translate-y-4 md:-translate-y-8"></div>
      )}
    </div>
  );
};

const Organogram: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<Employee | Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        if (!data.employees || !Array.isArray(data.employees)) {
          throw new Error("Invalid employee data");
        }
        setEmployeeData(data.employees);
      } catch (error) {
        console.error("Error loading employee data:", error);
        if (error instanceof Error) {
          setError(`Failed to load employee data: ${error.message}`);
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    loadEmployees();

    const handleEmployeesUpdated = (event: CustomEvent<{ employees: Employee[] }>) => {
      setEmployeeData(event.detail.employees);
    };

    window.addEventListener('employeesUpdated', handleEmployeesUpdated as EventListener);

    return () => {
      window.removeEventListener('employeesUpdated', handleEmployeesUpdated as EventListener);
    };
  }, []);

  if (error) {
    return <div className={`text-red-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>{error}</div>;
  }

  if (!employeeData || (Array.isArray(employeeData) && employeeData.length === 0)) {
    return <div className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>Loading...</div>;
  }

  console.log("Rendering with employee data:", employeeData);

  return (
    <div className={`p-4 md:p-8 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-800'}`}>
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">
        ORGANIZATIONAL
        <span className="block text-xs md:text-sm font-normal text-gray-500">
          INFOGRAPHICS
        </span>
      </h2>
      <div className="max-w-full md:max-w-6xl mx-auto overflow-x-auto">
        <div className="min-w-[640px]">
          <OrganogramLevel employees={employeeData} isRoot={true} />
        </div>
      </div>
    </div>
  );
};

export default Organogram;
