// src/components/User.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserForm from './Forms/UserForm';
import { useUsers } from '../hooks/useUsers'; 

export default function User({ user ,setUser,updatePowerRallie}) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (newPower,newRallie) => {
    // updateUser takes (id, updates)
    const success = await updatePowerRallie(user.id, newPower, newRallie);
    if (success) {
      setIsEditing(false);
      setUser(success)
    }
    else alert('Failed to save user.');
  };

  return (
    <div id="User">
      {isEditing ? (
        <UserForm
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <img className="img avatar" src={user.avatar} alt="avatar" />
          <div>
            <div className="roleInfo">
              <p className="name">{user.nom}</p>
            </div>
            <div className="roleInfo">
              <p className="furnace">
                {t('furnace-level') + ' ' + user.lvl}
              </p>
            </div>
            <div className="roleInfo">
              <p className="server">
                {t('kid') + ' ' + user.kid}
              </p>
            </div>
          </div>
          <div id="edituser" onClick={() => setIsEditing(true)}>
            <i className="fas fa-edit" />
          </div>
        </>
      )}
    </div>
  );
}
