// src/hooks/useBuildings.js
import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { convertLocalToWorld } from '../three/helpers.js';
import { useGuilds } from './useGuilds';

const STORAGE_KEY = 'lite_buildings';

function getStoredBuildings() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveStoredBuildings(buildings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(buildings));
}
function generateId() {
  return crypto?.randomUUID?.() || `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function enrichBuildings(rawBuildings, guilds, typeFilter) {
  const filtered = typeFilter ? rawBuildings.filter(b => b.type === typeFilter) : rawBuildings;
  return filtered.map(b => ({
    ...b,
    alliance: guilds.find(g => g._id === b.alliance) || null,
  }));
}
export function useBuildings(typeFilter = null) {
  const [buildings, setBuildings] = useState([]);
  const { guilds } = useGuilds();

  const fetchBuildings = useCallback(() => {
    const all = getStoredBuildings();
    setBuildings(enrichBuildings(all, guilds, typeFilter));
  }, [guilds, typeFilter]);

  const addBuilding = useCallback((payload) => {
    const { xLocal, yLocal, size, type, alliance, extraData = {} } = payload;
    const world = convertLocalToWorld(new THREE.Vector3(xLocal, yLocal, 0), window.plane);

    const id = generateId();
    const newBuilding = {
      id,
      _id: id,
      type,
      size,
      alliance, // still store ID
      location: { x: world.x, y: world.y },
      extraData,
    };

    const all = [...getStoredBuildings(), newBuilding];
    saveStoredBuildings(all);
    setBuildings(enrichBuildings(all, guilds, typeFilter));
    return newBuilding;
  }, [guilds, typeFilter]);

  const updateBuilding = useCallback((id, updates) => {
    const all = getStoredBuildings();
    const index = all.findIndex(b => b.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      saveStoredBuildings(all);
      const enriched = enrichBuildings(all, guilds, typeFilter);
      setBuildings(enriched);
      return enriched[index];
    }
    return null;
  }, [guilds, typeFilter]);

  const deleteBuilding = useCallback((id) => {
    const all = getStoredBuildings().filter(b => b.id !== id);
    saveStoredBuildings(all);
    setBuildings(enrichBuildings(all, guilds, typeFilter));
  }, [guilds, typeFilter]);

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings]);

  return { buildings, fetchBuildings, addBuilding, updateBuilding, deleteBuilding };
}
