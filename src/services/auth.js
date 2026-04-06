// Simple admin authentication (no backend needed)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'  // Change this to your desired password
  };
  
  export const adminLogin = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = btoa(`${username}:${Date.now()}`); // Simple token
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', username);
      return true;
    }
    return false;
  };
  
  export const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };
  
  export const isAdminAuthenticated = () => {
    return localStorage.getItem('adminToken') !== null;
  };
  
  export const getCurrentAdmin = () => {
    return localStorage.getItem('adminUser');
  };