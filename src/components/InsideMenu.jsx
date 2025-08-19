import React from 'react';
import BuildingsPanel from './Menus/BuildingsPanel';
import UserPanel from './Menus/UserPanel';
import TerritoryPanel from './Menus/TerritoryPanel';
import AlliancePanel from './Menus/AlliancePanel';
import GiftPanel from './Menus/GiftPanel';
import { DataPanel } from './Menus/DataPanel';

export default function InsideMenu({   active,
  setSelectedBuildingType,
  selectedBuildingType, users,
  guilds,addGuild,updateGuild,deleteGuild
}) {
  return (
    <div id="InsideMenu">
      <div className={active === 'Buildings' ? 'visible' : ''}>
        <BuildingsPanel onSelect={setSelectedBuildingType}
          selectedBuildingType={selectedBuildingType}/>
      </div>
      <div className={active === 'Users' ? 'visible' : ''}>
        <UserPanel users={users} />
      </div>
      <div className={active === 'Gift' ? 'visible' : ''}>
        <GiftPanel />
      </div>
      <div className={active === 'Furnace-Placed' ? 'visible' : ''}>
        <TerritoryPanel />
      </div>
        <div className={active === 'Alliance' ? 'visible' : ''}>
        <AlliancePanel guilds={guilds} addGuild={addGuild} updateGuild={updateGuild} deleteGuild={deleteGuild} />
      </div>
      <div className={active === 'Data' ? 'visible' : ''}>
        <DataPanel />
      </div>
    </div>
  );
}
