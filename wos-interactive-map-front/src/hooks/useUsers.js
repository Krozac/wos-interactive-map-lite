import { useState, useEffect, useCallback } from 'react';
import { fetchUserDataById } from '../utils/userApi'
const STORAGE_KEY = 'lite_users';

function getStoredUsers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveStoredUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function useUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(() => {
    const all = getStoredUsers();
    setUsers(all);
  }, []);

   const addUserById = useCallback(async (id) => {
    try {
      const data = await fetchUserDataById(id);
      const all = getStoredUsers();
      const index = all.findIndex(u => u.id === data.fid);
      if (index !== -1) {
        all[index] = { ...all[index], ...data };
      } else {
        all.push(data);
      }
      saveStoredUsers(all);
      setUsers(all);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, []);

  const updateUser = useCallback((id, updates) => {
    const all = getStoredUsers();
    const index = all.findIndex(u => u.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      saveStoredUsers(all);
      setUsers(all);
    }
  }, []);

  const updatePowerRallie = useCallback((id, power, rallie) => {
    const all = getStoredUsers();
    const index = all.findIndex(u => u.id === id);
    if (index !== -1) {
      const updatedUser = { ...all[index], power, rallie };
      all[index] = updatedUser;
      saveStoredUsers(all);
      setUsers(all);
      return updatedUser; // return the updated user
    }
    return null;
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, fetchUsers, addUserById, updateUser, updatePowerRallie };
}
