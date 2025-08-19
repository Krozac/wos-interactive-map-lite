import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { convertLocalToWorld } from '../three/helpers.js';
import { showBuildings } from '../three/building.js';

const STORAGE_KEY = 'lite_furnaces';

function getStoredFurnaces() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveStoredFurnaces(furnaces) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(furnaces));
}

function generateId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function useFurnaces() {
  const [furnaces, setFurnaces] = useState([]);

  // Load furnaces from localStorage
  const fetchFurnaces = useCallback(() => {
    const all = getStoredFurnaces();
    setFurnaces(all);
    showBuildings(); // redraw 3D scene
  }, []);

  // Add a furnace locally
  const addFurnace = useCallback(({ name, xLocal, yLocal, alliance, addedBy }) => {
    const pointWorld = convertLocalToWorld(new THREE.Vector3(xLocal, yLocal, 0), window.plane);
    const newFurnace = {
      _id: generateId(),
      id: generateId(),
      location: { x: pointWorld.x, y: pointWorld.y },
      size: { w: 2, h: 2 },
      type: 'Furnace',
      addedBy,
      extraData: { name, alliance },
    };
    const all = getStoredFurnaces();
    all.push(newFurnace);
    saveStoredFurnaces(all);
    setFurnaces(all);
    showBuildings();
    return newFurnace;
  }, []);

  const updateFurnace = useCallback((id, updates) => {
    const all = getStoredFurnaces();
    const index = all.findIndex(f => f.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...updates };
      saveStoredFurnaces(all);
      setFurnaces(all);
      showBuildings();
      return all[index];
    }
    return null;
  }, []);

  const deleteFurnace = useCallback((id) => {
    const all = getStoredFurnaces().filter(f => f.id !== id);
    saveStoredFurnaces(all);
    setFurnaces(all);
    showBuildings();
  }, []);

  useEffect(() => {
    fetchFurnaces();
  }, [fetchFurnaces]);

  return { furnaces, fetchFurnaces, addFurnace, updateFurnace, deleteFurnace };
}
