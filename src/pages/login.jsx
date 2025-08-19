import { useState } from 'react';
import '../styles/login.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import { fetchUserDataById } from '../utils/userApi'; // your WOS API util
//import { saveStoredUsers } from '../hooks/useUsers'; // helper to store users locally

export default function Login() {
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      const data = await fetchUserDataById(id);

      if (!data) {
        setError('Invalid ID or API error');
        return;
      }

      // Get existing users from localStorage
      const rawUsers = localStorage.getItem('lite_users');
      const users = rawUsers ? JSON.parse(rawUsers) : [];

      // Check if user already exists, update or add
      const index = users.findIndex(u => u.fid === data.fid);
      if (index !== -1) {
        users[index] = { ...users[index], ...data };
      } else {
        users.push(data);
      }

      // Save updated users to localStorage
      localStorage.setItem('lite_users', JSON.stringify(users));
      localStorage.setItem('PlayerData', JSON.stringify(data)); // current session user

      // redirect
      window.location.href = '#/map';
    } catch (err) {
      console.error(err);
      setError('Failed to validate ID');
    }
  };

  return (
    <>
      <LanguageSelector />
      <img
        src="img/home_logo.83ba690.png"
        alt="Logo"
        className="home_logo"
        draggable={false}
      />
      <div id="overlay">
        <div id="modal">
          <h2>{t('menu-login')}</h2>
          <form
            id="idForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <p>{t('menu-login-prompt')}</p>
            <input
              id="modalPlayerId"
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={t('menu-login-preview')}
            />
            <button type="submit">{t('menu-login')}</button>
          </form>
          <p id="modalError" style={{ display: error ? 'block' : 'none' }}>
            {error}
          </p>
        </div>
      </div>
    </>
  );
}
