// UsersService: mock/real data switching for users
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const API_URL = import.meta.env.VITE_API_URL || '/api';

export interface User {
  id?: number;
  username: string;
  email: string;
  created_at?: string;
}

const mockUsers: User[] = [
  { id: 1, username: 'alice', email: 'alice@example.com', created_at: new Date().toISOString() },
  { id: 2, username: 'bob', email: 'bob@example.com', created_at: new Date().toISOString() },
];

export async function getUsers(): Promise<User[]> {
  if (USE_MOCK_DATA) {
    return mockUsers;
  }
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
  if (USE_MOCK_DATA) {
    const newUser: User = { ...user, id: mockUsers.length + 1, created_at: new Date().toISOString() };
    mockUsers.push(newUser);
    return newUser;
  }
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}
