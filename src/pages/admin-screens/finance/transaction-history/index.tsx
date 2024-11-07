'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Upload,
  Search,
  X,
  MinusCircle,
  PlusCircle,
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  ArrowLeft,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { format, addMonths } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Papa from 'papaparse';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import transactionsData from '../../../../data/transactions.json';
import { useTheme } from '@/context/theme-context/ThemeContext';
import {
  fetchTransactions,
  saveTransactions,
  getStoredTransactions,
} from '@/api/transactionApi';

// Update the mock data to include transaction and category data for each account
const accountData = {
  all: {
    remaining: 782.18,
    income: 6099.76,
    expenses: 5317.57,
    remainingChange: -63,
    incomeChange: -1,
    expensesChange: 32,
    transactionData: [
      { name: 'Jan', income: 4000, expenses: 2400 },
      { name: 'Feb', income: 3000, expenses: 1398 },
      { name: 'Mar', income: 2000, expenses: 9800 },
      { name: 'Apr', income: 2780, expenses: 3908 },
      { name: 'May', income: 1890, expenses: 4800 },
      { name: 'Jun', income: 2390, expenses: 3800 },
    ],
    categoryData: [
      { name: 'Food', value: 400 },
      { name: 'Transport', value: 300 },
      { name: 'Entertainment', value: 300 },
      { name: 'Utilities', value: 200 },
    ],
  },
  checking: {
    remaining: 500.0,
    income: 4000.0,
    expenses: 3500.0,
    remainingChange: -20,
    incomeChange: 5,
    expensesChange: 10,
    transactionData: [
      { name: 'Jan', income: 3000, expenses: 2000 },
      { name: 'Feb', income: 2500, expenses: 1200 },
      { name: 'Mar', income: 1800, expenses: 8000 },
      { name: 'Apr', income: 2200, expenses: 3000 },
      { name: 'May', income: 1500, expenses: 4000 },
      { name: 'Jun', income: 2000, expenses: 3200 },
    ],
    categoryData: [
      { name: 'Food', value: 300 },
      { name: 'Transport', value: 200 },
      { name: 'Entertainment', value: 200 },
      { name: 'Utilities', value: 150 },
    ],
  },
  savings: {
    remaining: 282.18,
    income: 2099.76,
    expenses: 1817.57,
    remainingChange: -10,
    incomeChange: 2,
    expensesChange: 5,
    transactionData: [
      { name: 'Jan', income: 1000, expenses: 400 },
      { name: 'Feb', income: 500, expenses: 198 },
      { name: 'Mar', income: 200, expenses: 1800 },
      { name: 'Apr', income: 580, expenses: 908 },
      { name: 'May', income: 390, expenses: 800 },
      { name: 'Jun', income: 390, expenses: 600 },
    ],
    categoryData: [
      { name: 'Food', value: 100 },
      { name: 'Transport', value: 100 },
      { name: 'Entertainment', value: 100 },
      { name: 'Utilities', value: 50 },
    ],
  },
};

// Initial JSON data
const initialTransactions = [
  {
    id: 1,
    date: '2024-05-03',
    category: 'Rent',
    payee: 'Landlord',
    amount: 1200.0,
    account: 'Checking',
  },
  {
    id: 2,
    date: '2024-05-04',
    category: 'Groceries',
    payee: 'Supermarket',
    amount: 150.5,
    account: 'Checking',
  },
  // ... add more initial transactions as needed
];

interface Transaction {
  id: string | number;
  date: string;
  category: string;
  payee: string;
  amount: number;
  account: string;
  notes?: string;
}

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpense, setIsExpense] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 3, 4),
    to: new Date(2024, 4, 4),
  });
  const [transactionChartType, setTransactionChartType] = useState('area');
  const [categoryChartType, setCategoryChartType] = useState('pie');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [currentData, setCurrentData] = useState(accountData.all);
  const [currentTransactionData, setCurrentTransactionData] = useState(
    accountData.all.transactionData
  );
  const [currentCategoryData, setCurrentCategoryData] = useState(
    accountData.all.categoryData
  );
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>(
    {
      date: '',
      category: '',
      payee: '',
      amount: 0,
      account: '',
      notes: '',
    }
  );
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedTransactions, setSelectedTransactions] = useState<
    (string | number)[]
  >([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<null | {
    id: string | number;
    date: string;
    category: string;
    payee: string;
    amount: number;
    account: string;
    notes?: string;
  }>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<
    string | number | null
  >(null);
  const [editingIsExpense, setEditingIsExpense] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const importedTransactions: Transaction[] = results.data
            .filter((row: any) => row.date && row.amount) // Basic validation
            .map((row: any) => ({
              id: crypto.randomUUID(), // Use UUID for imported transactions
              date: row.date,
              category: row.category || '',
              payee: row.payee || '',
              amount: parseFloat(row.amount) || 0,
              account: row.account || '',
            }));
          setTransactions([...transactions, ...importedTransactions]);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  useEffect(() => {
    const selectedAccountData =
      accountData[selectedAccount as keyof typeof accountData];
    setCurrentData(selectedAccountData);
    setCurrentTransactionData(selectedAccountData.transactionData);
    setCurrentCategoryData(selectedAccountData.categoryData);
  }, [selectedAccount]);

  useEffect(() => {
    setTransactions(transactionsData);
  }, []);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        // First try to get from localStorage
        const storedTransactions = getStoredTransactions();
        if (storedTransactions.length > 0) {
          setTransactions(storedTransactions);
        } else {
          // If no localStorage data, fetch from file
          const data = await fetchTransactions();
          if (!data.transactions || !Array.isArray(data.transactions)) {
            throw new Error('Invalid transaction data');
          }

          const formattedTransactions = data.transactions.map((t) => ({
            ...t,
            id: t.id.toString(),
          }));

          setTransactions(formattedTransactions);
          // Store in localStorage
          localStorage.setItem(
            'transactions',
            JSON.stringify(formattedTransactions)
          );
        }
      } catch (error) {
        console.error('Error loading transaction data:', error);
        setTransactions(
          transactionsData.map((t) => ({
            ...t,
            id: t.id.toString(),
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();

    const handleTransactionsUpdated = (
      event: CustomEvent<{ transactions: Transaction[] }>
    ) => {
      setTransactions(event.detail.transactions);
    };

    window.addEventListener(
      'transactionsUpdated',
      handleTransactionsUpdated as EventListener
    );

    return () => {
      window.removeEventListener(
        'transactionsUpdated',
        handleTransactionsUpdated as EventListener
      );
    };
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Simulate API call
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTransactionType = () => {
    setIsExpense((prev) => !prev);
  };

  // Create
  const handleAddNewTransaction = async () => {
    try {
      const transactionToAdd: Transaction = {
        id: crypto.randomUUID(),
        date: newTransaction.date,
        category: newTransaction.category,
        payee: newTransaction.payee,
        amount: isExpense
          ? -Math.abs(parseFloat(newTransaction.amount.toString()))
          : Math.abs(parseFloat(newTransaction.amount.toString())),
        account: newTransaction.account,
        notes: newTransaction.notes,
      };

      const updatedTransactions = [...transactions, transactionToAdd];

      // Save to localStorage first
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      // Then try to save via API
      await saveTransactions(updatedTransactions);

      // Update local state
      setTransactions(updatedTransactions);

      // Explicitly dispatch the event
      window.dispatchEvent(
        new CustomEvent('transactionsUpdated', {
          detail: { transactions: updatedTransactions },
        })
      );

      setSidebarOpen(false);
      setNewTransaction({
        date: '',
        category: '',
        payee: '',
        amount: 0,
        account: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Update
  const handleEditTransaction = async (
    transaction: typeof editingTransaction
  ) => {
    if (!transaction) return;

    try {
      const updatedTransaction = {
        ...transaction,
        amount: editingIsExpense
          ? -Math.abs(transaction.amount)
          : Math.abs(transaction.amount),
      };

      const updatedTransactions = transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      );

      await handleSaveTransactions(updatedTransactions);
      setTransactions(updatedTransactions);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // Delete
  const handleDeleteTransaction = (id: string | number) => {
    setTransactionToDelete(id);
    setDeleteConfirmOpen(true);
  };

  // Bulk Delete
  const handleDeleteSelected = () => {
    setTransactions(
      transactions.filter((t) => !selectedTransactions.includes(t.id))
    );
    setSelectedTransactions([]);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedTransactions = React.useMemo(() => {
    if (!sortColumn) return transactions;
    return [...transactions].sort((a, b) => {
      const aVal = a[sortColumn as keyof Transaction] ?? '';
      const bVal = b[sortColumn as keyof Transaction] ?? '';

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [transactions, sortColumn, sortDirection]);

  const paginatedTransactions = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(paginatedTransactions.map((t) => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (id: string | number, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, id]);
    } else {
      setSelectedTransactions(selectedTransactions.filter((tId) => tId !== id));
    }
  };

  // Add a new function to confirm deletion
  const confirmDelete = async () => {
    if (transactionToDelete === null) return;

    try {
      const updatedTransactions = transactions.filter(
        (t) => t.id !== transactionToDelete
      );
      await handleSaveTransactions(updatedTransactions);

      setTransactions(updatedTransactions);
      setDeleteConfirmOpen(false);
      setTransactionToDelete(null);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Add this function to toggle expense/income for editing
  const toggleEditingTransactionType = () => {
    setEditingIsExpense((prev) => !prev);
    if (editingTransaction) {
      setEditingTransaction({
        ...editingTransaction,
        amount: Math.abs(editingTransaction.amount),
      });
    }
  };

  // Update the handleSaveTransactions function
  const handleSaveTransactions = async (updatedTransactions: Transaction[]) => {
    try {
      setLoading(true);
      await saveTransactions(updatedTransactions);

      // Update local state
      setTransactions(updatedTransactions);

      // Dispatch event to notify other components
      window.dispatchEvent(
        new CustomEvent('transactionsUpdated', {
          detail: { transactions: updatedTransactions },
        })
      );
    } catch (error) {
      console.error('Error saving transactions:', error);
      throw error;
    } finally {
      setLoading(false);
    }
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
          {/* Replace Link with Button */}
          <Button
            variant="ghost"
            className="mb-4 text-white hover:bg-blue-700 transition-colors"
            onClick={() => {
              // Add navigation logic here, e.g.:
              // history.push('/admin-screens/finance');
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Finance
          </Button>

          <div className="space-y-4 mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome Back, Anajemba 👋
            </h2>
            <p className="text-xl text-blue-200">
              Your Financial Overview Report
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              defaultValue="all"
              onValueChange={(value) => setSelectedAccount(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors">
                <SelectValue placeholder="All accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All accounts</SelectItem>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-[240px] justify-start text-left font-normal bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange?.to ? (
                      <>
                        {format(dateRange?.from!, 'LLL dd, y')} -{' '}
                        {format(dateRange?.to!, 'LLL dd, y')}
                      </>
                    ) : (
                      format(dateRange?.from!, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range: DateRange | undefined) =>
                      setDateRange(range)
                    }
                    numberOfMonths={2}
                    className="rounded-md border"
                    classNames={{
                      day_selected: 'bg-blue-800 text-white hover:bg-blue-700',
                      day_today: 'bg-blue-100 text-blue-900',
                    }}
                  />
                </div>
                <div className="flex justify-between p-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setDateRange({ from: undefined, to: undefined })
                    }
                    className="text-gray-600"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => {
                      // Apply logic here
                    }}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Remove this commented-out Link component */}
            {/* <Link href="/admin-screens/finance/transaction-history" passHref>
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors"
              >
                View Transaction History
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
      <div
        className={`max-w-7xl mx-auto ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
        } rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl px-4 sm:px-6 lg:px-8 -mt-24`}
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h2
              className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Transaction History
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add new
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                onClick={handleImportClick}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
            </div>
          </div>
          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search payee"
              className="pl-10 pr-10 py-2 w-full sm:max-w-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="overflow-x-auto">
            {selectedTransactions.length > 0 && (
              <div className="mb-4">
                <Button variant="outline" onClick={handleDeleteSelected}>
                  Delete Selected
                </Button>
              </div>
            )}
            <Table>
              <TableHeader
                className={`${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                } sticky top-0`}
              >
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={
                        selectedTransactions.length ===
                        paginatedTransactions.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  {['date', 'category', 'payee', 'amount', 'account'].map(
                    (column) => (
                      <TableHead
                        key={column}
                        className="cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => handleSort(column)}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                        {sortColumn === column &&
                          (sortDirection === 'asc' ? (
                            <ChevronUp className="ml-2 h-4 w-4 inline" />
                          ) : (
                            <ChevronDown className="ml-2 h-4 w-4 inline" />
                          ))}
                      </TableHead>
                    )
                  )}
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className={`h-24 text-center ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id.toString()}
                      className={`${
                        theme === 'dark'
                          ? 'hover:bg-gray-700'
                          : 'hover:bg-gray-50'
                      } transition-colors duration-200`}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedTransactions.includes(
                            transaction.id
                          )}
                          onCheckedChange={(checked) =>
                            handleSelectTransaction(
                              transaction.id,
                              checked as boolean
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.payee}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            transaction.amount >= 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.account}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-gray-200 rounded-full"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setEditingTransaction(transaction)}
                              className="flex items-center"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeleteTransaction(transaction.id)
                              }
                              className="flex items-center text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div
              className={`mt-4 flex justify-between items-center ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <div>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(
                  currentPage * itemsPerPage,
                  sortedTransactions.length
                )}{' '}
                of {sortedTransactions.length} entries
              </div>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Transaction Sheet */}
      <Sheet
        open={!!editingTransaction}
        onOpenChange={() => setEditingTransaction(null)}
      >
        <SheetContent className="sm:max-w-[400px]">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Make changes to your transaction here. Click save when you're
              done.
            </SheetDescription>
          </SheetHeader>
          {editingTransaction && (
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="edit-date">Date</Label>
                <div className="relative">
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingTransaction.date}
                    onChange={(e) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        date: e.target.value,
                      })
                    }
                    className="pl-10"
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-account">Account</Label>
                <Select
                  value={editingTransaction.account}
                  onValueChange={(value) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      account: value,
                    })
                  }
                >
                  <SelectTrigger id="edit-account">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingTransaction.category}
                  onValueChange={(value) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-payee">Payee</Label>
                <Input
                  id="edit-payee"
                  value={editingTransaction.payee}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      payee: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-amount">Amount</Label>
                <div className="flex">
                  <Button
                    type="button"
                    onClick={toggleEditingTransactionType}
                    className={`px-3 rounded-l-md ${
                      editingIsExpense
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white transition-colors duration-200`}
                  >
                    {editingIsExpense ? (
                      <MinusCircle className="h-4 w-4" />
                    ) : (
                      <PlusCircle className="h-4 w-4" />
                    )}
                  </Button>
                  <Input
                    id="edit-amount"
                    type="number"
                    value={Math.abs(editingTransaction.amount)}
                    onChange={(e) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        amount: parseFloat(e.target.value),
                      })
                    }
                    className={`flex-1 rounded-l-none ${
                      editingIsExpense ? 'text-red-500' : 'text-green-500'
                    }`}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  This will count as an{' '}
                  {editingIsExpense ? 'expense' : 'income'}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input
                  id="edit-notes"
                  value={editingTransaction.notes}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Optional notes"
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleEditTransaction(editingTransaction)}
              >
                Save changes
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-80 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
        } shadow-xl transform ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3
              className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Add Transaction
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewTransaction();
            }}
          >
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={newTransaction.date}
                  onChange={handleInputChange}
                  className="pl-10"
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label
                htmlFor="account"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Account
              </label>
              <Select
                onValueChange={(value) => handleSelectChange('account', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={newTransaction.account || 'Select account'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <Select
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={newTransaction.category || 'Select category'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="payee"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payee
              </label>
              <Input
                type="text"
                id="payee"
                name="payee"
                value={newTransaction.payee}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <div className="flex">
                <Button
                  type="button"
                  onClick={toggleTransactionType}
                  className={`px-3 rounded-l-md ${
                    isExpense
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white transition-colors duration-200`}
                >
                  {isExpense ? (
                    <MinusCircle className="h-4 w-4" />
                  ) : (
                    <PlusCircle className="h-4 w-4" />
                  )}
                </Button>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  className={`flex-1 rounded-l-none ${
                    isExpense ? 'text-red-500' : 'text-green-500'
                  }`}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                This will count as an {isExpense ? 'expense' : 'income'}
              </p>
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Notes
              </label>
              <Input
                type="text"
                id="notes"
                name="notes"
                value={newTransaction.notes}
                onChange={handleInputChange}
                placeholder="Optional notes"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add transaction
            </Button>
          </form>
        </div>
      </div>

      {/* Add this Dialog component at the end of the JSX, before the closing div */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent
          className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}
        >
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
