import BannerForm from "./BannerForm";
import FurnaceForm from "./FurnaceForm";
import HQForm from "./HQForm";
import TrapForm from "./TrapForm";
import FarmForm from "./FarmForm";
import React from "react";

// import HQForm, TrapForm, etc.

export default function BuildingForm({ mode, building, cell, onClose,  addBuilding, updateBuilding, guilds }) {
  console.log("BuildingForm mode:", mode);
  console.log("BuildingForm building:", building);
  switch (building.value) {
    case "Furnace":
      return <FurnaceForm mode={mode} cell={cell} onClose={onClose} addBuilding={addBuilding} updateBuilding={updateBuilding} guilds= {guilds}/>;
    case "HQ":
      return <HQForm mode={mode} cell={cell} onClose={onClose} addBuilding={addBuilding} updateBuilding={updateBuilding} guilds= {guilds}/>;
    case "Banner":
      return <BannerForm mode={mode} cell={cell} onClose={onClose} addBuilding={addBuilding} updateBuilding={updateBuilding} guilds= {guilds}/>;
    case "Trap":
      return <TrapForm mode={mode} cell={cell} onClose={onClose} addBuilding={addBuilding} updateBuilding={updateBuilding} guilds= {guilds}/>;
    case "Iron":
    case "Coal":
    case "Farm":
    case "Wood":
      return <FarmForm mode={mode} cell={cell} onClose={onClose} type={building.value} addBuilding={addBuilding} updateBuilding={updateBuilding} guilds= {guilds}/>;
    default:
      return null;
  }
}
