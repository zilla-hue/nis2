import { ensureEmployeeFilesExist } from '@/utils/fileOperations';

if (process.env.NODE_ENV === 'development') {
  ensureEmployeeFilesExist();
}
