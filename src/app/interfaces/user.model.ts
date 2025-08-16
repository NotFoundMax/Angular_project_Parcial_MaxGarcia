import { UserRole } from './user-role.enum';

export interface User {
  id: string;
  nombre: string;
  email: string;
  password: string;
  roles: UserRole[];
  isActive: boolean;
  avatarUrl?: string;
}
