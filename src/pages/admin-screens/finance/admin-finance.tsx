'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart3Icon,
  PieChartIcon,
  PiggyBankIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  format,
  addMonths,
  isWithinInterval,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  differenceInDays,
  addDays,
} from 'date-fns';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import CountUp from 'react-countup';
import transactionsData from '../../../data/transactions.json';
import { useTheme } from '@/context/theme-context/ThemeContext';
import { Transaction } from '../../../types/transaction';
import {
  fetchTransactions,
  getStoredTransactions,
} from '../../../api/transactionApi';

const getChartColors = (theme: 'light' | 'dark') => {
  return theme === 'dark'
    ? ['#60A5FA', '#34D399', '#FBBF24', '#F87171'] // Brighter colors for dark theme
    : ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Original colors for light theme
};

interface TransactionDataPoint {
  name: string;
  income: number;
  expenses: number;
}

interface CategoryDataPoint {
  name: string;
  value: number;
}

const calculatePercentageChange = (
  currentValue: number,
  previousValue: number
): number => {
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
};

export default function AdminFinance() {
  const { theme } = useTheme();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1), // January 1, 2024
    to: new Date(2024, 11, 31), // December 31, 2024
  });
  const [transactionChartType, setTransactionChartType] = useState('area');
  const [categoryChartType, setCategoryChartType] = useState('pie');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [currentData, setCurrentData] = useState<{
    remaining: number;
    income: number;
    expenses: number;
    remainingChange: number;
    incomeChange: number;
    expensesChange: number;
    transactionData: TransactionDataPoint[];
    categoryData: CategoryDataPoint[];
  }>({
    remaining: 0,
    income: 0,
    expenses: 0,
    remainingChange: 0,
    incomeChange: 0,
    expensesChange: 0,
    transactionData: [],
    categoryData: [],
  });
  const [currentTransactionData, setCurrentTransactionData] = useState<
    TransactionDataPoint[]
  >([]);
  const [currentCategoryData, setCurrentCategoryData] = useState<
    CategoryDataPoint[]
  >([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Loading transactions data...');
    try {
      setTransactions(transactionsData);
      console.log('Transactions loaded:', transactionsData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading transactions:', err);
      setError('Failed to load transactions data');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      console.log('Calculating financial data. Transactions:', transactions);
      console.log('Date range:', dateRange);

      // Calculate financial data based on transactions and selected date range
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = parseISO(transaction.date);
        return (
          dateRange &&
          dateRange.from &&
          dateRange.to &&
          isWithinInterval(transactionDate, {
            start: dateRange.from,
            end: dateRange.to,
          })
        );
      });

      console.log('Filtered transactions:', filteredTransactions);

      const calculateData = (accountType: string) => {
        // Get filtered transactions for the selected account
        const accountTransactions =
          accountType === 'all'
            ? transactions
            : transactions.filter((t) => t.account === accountType);

        // Get current period dates
        const currentPeriodStart = dateRange?.from || new Date(2024, 0, 1);
        const currentPeriodEnd = dateRange?.to || new Date();

        // Get current period transactions
        const currentPeriodTransactions = accountTransactions.filter(
          (transaction) => {
            const transactionDate = parseISO(transaction.date);
            return isWithinInterval(transactionDate, {
              start: currentPeriodStart,
              end: currentPeriodEnd,
            });
          }
        );

        // Calculate current period totals
        const currentPeriodIncome = currentPeriodTransactions
          .filter((t) => t.amount > 0)
          .reduce((sum, t) => sum + t.amount, 0);

        const currentPeriodExpenses = Math.abs(
          currentPeriodTransactions
            .filter((t) => t.amount < 0)
            .reduce((sum, t) => sum + t.amount, 0)
        );

        // Calculate previous period dates (same duration as current period)
        const periodDuration = differenceInDays(
          currentPeriodEnd,
          currentPeriodStart
        );
        const previousPeriodEnd = addDays(currentPeriodStart, -1);
        const previousPeriodStart = addDays(previousPeriodEnd, -periodDuration);

        // Get previous period transactions
        const previousPeriodTransactions = accountTransactions.filter(
          (transaction) => {
            const transactionDate = parseISO(transaction.date);
            return isWithinInterval(transactionDate, {
              start: previousPeriodStart,
              end: previousPeriodEnd,
            });
          }
        );

        // Calculate previous period totals
        const previousPeriodIncome = previousPeriodTransactions
          .filter((t) => t.amount > 0)
          .reduce((sum, t) => sum + t.amount, 0);

        const previousPeriodExpenses = Math.abs(
          previousPeriodTransactions
            .filter((t) => t.amount < 0)
            .reduce((sum, t) => sum + t.amount, 0)
        );

        // Calculate percentage changes
        const incomeChange =
          previousPeriodIncome === 0
            ? 100 // If previous income was 0, treat as 100% increase
            : ((currentPeriodIncome - previousPeriodIncome) /
                previousPeriodIncome) *
              100;

        const expensesChange =
          previousPeriodExpenses === 0
            ? 0 // If previous expenses were 0, treat as 0% change
            : ((currentPeriodExpenses - previousPeriodExpenses) /
                previousPeriodExpenses) *
              100;

        const previousRemaining = previousPeriodIncome - previousPeriodExpenses;
        const currentRemaining = currentPeriodIncome - currentPeriodExpenses;

        const remainingChange =
          previousRemaining === 0
            ? 100 // If previous remaining was 0, treat as 100% increase
            : ((currentRemaining - previousRemaining) /
                Math.abs(previousRemaining)) *
              100;

        // Calculate monthly transaction data
        const transactionData = eachMonthOfInterval({
          start: currentPeriodStart,
          end: currentPeriodEnd,
        }).map((date) => {
          const monthStart = startOfMonth(date);
          const monthEnd = endOfMonth(date);
          const monthTransactions = accountTransactions.filter((t) =>
            isWithinInterval(parseISO(t.date), {
              start: monthStart,
              end: monthEnd,
            })
          );

          const monthIncome = monthTransactions
            .filter((t) => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);
          const monthExpenses = Math.abs(
            monthTransactions
              .filter((t) => t.amount < 0)
              .reduce((sum, t) => sum + t.amount, 0)
          );

          return {
            name: format(date, 'MMM yyyy'),
            income: monthIncome,
            expenses: monthExpenses,
          };
        });

        // Calculate category data
        const categoryData = currentPeriodTransactions
          .filter((t) => t.amount < 0)
          .reduce((acc, transaction) => {
            const category = transaction.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
            return acc;
          }, {} as Record<string, number>);

        const transformedCategoryData = Object.entries(categoryData).map(
          ([name, value]) => ({ name, value })
        );

        console.log('Period Data:', {
          currentPeriod: {
            income: currentPeriodIncome,
            expenses: currentPeriodExpenses,
          },
          previousPeriod: {
            income: previousPeriodIncome,
            expenses: previousPeriodExpenses,
          },
          changes: {
            income: incomeChange,
            expenses: expensesChange,
            remaining: remainingChange,
          },
        });

        return {
          remaining: currentRemaining,
          income: currentPeriodIncome,
          expenses: currentPeriodExpenses,
          remainingChange: Math.round(remainingChange),
          incomeChange: Math.round(incomeChange),
          expensesChange: Math.round(expensesChange),
          transactionData,
          categoryData: transformedCategoryData,
        };
      };

      const allData = calculateData('all');
      const checkingData = calculateData('checking');
      const savingsData = calculateData('savings');

      console.log('Calculated data:', allData);
      setCurrentData(allData);
      setCurrentTransactionData(allData.transactionData);
      setCurrentCategoryData(allData.categoryData);

      // Update accountData
      const newAccountData = {
        all: allData,
        checking: checkingData,
        savings: savingsData,
      };
      // You might want to update your state with this new account data
      // setAccountData(newAccountData);
    }
  }, [transactions, dateRange]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        // First try to get from localStorage
        const storedTransactions = getStoredTransactions();
        if (storedTransactions.length > 0) {
          setTransactions(storedTransactions);
        } else {
          const data = await fetchTransactions();
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
        console.error('Error loading transactions:', error);
        setTransactions(
          transactionsData.map((t) => ({
            ...t,
            id: t.id.toString(),
          }))
        );
      }
    };

    loadTransactions();

    // Use a more specific event type
    const handleTransactionsUpdated = (
      event: CustomEvent<{ transactions: Transaction[] }>
    ) => {
      console.log(
        'AdminFinance received transaction update:',
        event.detail.transactions
      );
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

  const renderTransactionChart = () => {
    switch (transactionChartType) {
      case 'area':
        return (
          <AreaChart
            data={currentTransactionData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        );
      case 'line':
        return (
          <LineChart
            data={currentTransactionData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart
            data={currentTransactionData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="expenses" fill="#82ca9d" />
          </BarChart>
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  const renderCategoryChart = () => {
    switch (categoryChartType) {
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={currentCategoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {currentCategoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    getChartColors(theme)[index % getChartColors(theme).length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#374151' : 'white',
                color: theme === 'dark' ? 'white' : 'black',
                border: 'none',
              }}
            />
            <Legend />
          </PieChart>
        );
      case 'radar':
        return (
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={currentCategoryData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              name="Category"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(value);
  };

  // Add this new function to render the animated value
  const renderAnimatedValue = (value: number, prefix: string = '') => {
    return (
      <CountUp
        start={0}
        end={value}
        duration={2}
        separator=","
        decimals={2}
        decimal="."
        prefix={prefix}
        formattingFn={(value) => formatCurrency(value)}
      />
    );
  };

  const formatDateRange = (from: Date, to: Date) => {
    if (from.getFullYear() === to.getFullYear()) {
      if (from.getMonth() === to.getMonth()) {
        return `${format(from, 'MMM d')} - ${format(to, 'd, yyyy')}`;
      }
      return `${format(from, 'MMM d')} - ${format(to, 'MMM d, yyyy')}`;
    }
    return `${format(from, 'MMM d, yyyy')} - ${format(to, 'MMM d, yyyy')}`;
  };

  const currentPeriodText =
    dateRange?.from && dateRange?.to
      ? formatDateRange(dateRange.from, dateRange.to)
      : 'Select a date range';

  // Modify the return statement to include error handling
  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="text-center text-2xl font-bold mt-20">Loading...</div>
    );
  }
  if (error) {
    console.log('Rendering error state:', error);
    return (
      <div className="text-center text-2xl font-bold mt-20 text-red-500">
        Error: {error}
      </div>
    );
  }

  console.log('Rendering main component');
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
              <SelectTrigger
                className={`w-full sm:w-[180px] ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white/10 text-white border-white/20'
                } hover:bg-opacity-20 transition-colors`}
              >
                <SelectValue placeholder="All accounts" />
              </SelectTrigger>
              <SelectContent
                className={
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
                }
              >
                <SelectItem value="all">All accounts</SelectItem>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full sm:w-[240px] justify-start text-left font-normal ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white/10 text-white border-white/20'
                  } hover:bg-opacity-20 transition-colors`}
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

            {/* Add this new Link component */}
            <a href="/admin-screens/finance/transaction-history">
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors"
              >
                View Transaction History
              </Button>
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card
              className={`shadow-lg hover:shadow-xl transition-shadow ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle
                    className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Remaining
                  </CardTitle>
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {currentPeriodText}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <PiggyBankIcon className="w-6 h-6 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {renderAnimatedValue(currentData.remaining)}
                </div>
                <p
                  className={`text-sm flex items-center mt-1 ${
                    currentData.remainingChange >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {currentData.remainingChange >= 0 ? (
                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(currentData.remainingChange)}%{' '}
                  {currentData.remainingChange >= 0 ? 'increase' : 'decrease'}{' '}
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card
              className={`shadow-lg hover:shadow-xl transition-shadow ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle
                    className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Income
                  </CardTitle>
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {currentPeriodText}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-6 w-6 text-green-600"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {renderAnimatedValue(currentData.income)}
                </div>
                <p className="text-sm flex items-center mt-1 text-green-500">
                  <ArrowUpIcon className="w-4 h-4 mr-1" />
                  {Math.abs(currentData.incomeChange)}% increase from last
                  period
                </p>
              </CardContent>
            </Card>

            <Card
              className={`shadow-lg hover:shadow-xl transition-shadow ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle
                    className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Expenses
                  </CardTitle>
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {currentPeriodText}
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-6 w-6 text-red-600"
                  >
                    <path d="M23 18L13.5 8.5L8.5 13.5L1 6" />
                    <path d="M17 18H23V12" />
                  </svg>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {renderAnimatedValue(currentData.expenses, '-')}
                </div>
                <p className="text-sm flex items-center mt-1 text-red-500">
                  <ArrowDownIcon className="w-4 h-4 mr-1" />
                  {Math.abs(currentData.expensesChange)}% decrease from last
                  period
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Charts */}
            <Card
              className={`shadow-lg hover:shadow-xl transition-shadow ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle
                  className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Transactions
                </CardTitle>
                <Select
                  defaultValue="area"
                  onValueChange={(value) => setTransactionChartType(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area">
                      <div className="flex items-center">
                        <BarChart3Icon className="w-4 h-4 mr-2" />
                        Area chart
                      </div>
                    </SelectItem>
                    <SelectItem value="line">
                      <div className="flex items-center">
                        <BarChart3Icon className="w-4 h-4 mr-2" />
                        Line chart
                      </div>
                    </SelectItem>
                    <SelectItem value="bar">
                      <div className="flex items-center">
                        <BarChart3Icon className="w-4 h-4 mr-2" />
                        Bar chart
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {renderTransactionChart()}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card
              className={`shadow-lg hover:shadow-xl transition-shadow ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle
                  className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Categories
                </CardTitle>
                <Select
                  defaultValue="pie"
                  onValueChange={(value) => setCategoryChartType(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pie">
                      <div className="flex items-center">
                        <PieChartIcon className="w-4 h-4 mr-2" />
                        Donut chart
                      </div>
                    </SelectItem>
                    <SelectItem value="radar">
                      <div className="flex items-center">
                        <PieChartIcon className="w-4 h-4 mr-2" />
                        Radar chart
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {renderCategoryChart()}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
