import MD5 from 'crypto-js/md5';

const API_URL = 'https://wos-giftcode-api.centurygame.com/api/player';
const SECRET = 'tB87#kPtkxqOS2';

export async function fetchUserDataById(id) {
  const res = await fetch('https://<your-project>.vercel.app/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  const data = await res.json();
  if (data.code === 0 && data.msg === 'success') {
    const apiUser = data.data;

    // normalize to match our frontend model
    return {
      _id: apiUser.fid,           // unique id
      id: apiUser.fid,            // optional alias
      kid: apiUser.kid,
      nom: apiUser.nickname,
      lvl: apiUser.stove_lv,
      avatar: apiUser.avatar_image,
      lvl_content: apiUser.stove_lv_content,
      power: 0,                   // default
      rallie: 0,                   // default
    };
  }

  throw new Error(data.msg || 'Invalid ID');
}
