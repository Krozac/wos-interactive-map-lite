import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'lite_guilds';

function getStoredGuilds() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveStoredGuilds(guilds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(guilds));
}

function generateId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function useGuilds() {
  const [guilds, setGuilds] = useState([]);

  const fetchGuilds = useCallback(() => {
    const all = getStoredGuilds();
    setGuilds(all);
  }, []);

  const addGuild = useCallback((guild) => {
    const all = getStoredGuilds();
    const id =  generateId();
    const newGuild = { _id:id ,id: id, ...guild };
    all.push(newGuild);
    saveStoredGuilds(all);
    setGuilds(all);
    return newGuild; // return so caller can use the id immediately
  }, []);

  const updateGuild = useCallback((id, updates) => {
    const all = getStoredGuilds();
    const index = all.findIndex(g => g.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      saveStoredGuilds(all);
      setGuilds(all);
      return all[index];
    }
    return null;
  }, []);

  const deleteGuild = useCallback((id) => {
    const all = getStoredGuilds().filter(g => g.id !== id);
    saveStoredGuilds(all);
    setGuilds(all);
  }, []);

  useEffect(() => {
    fetchGuilds();
  }, [fetchGuilds]);

  return { guilds, fetchGuilds, addGuild, updateGuild, deleteGuild };
}
