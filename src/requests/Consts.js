const serverUrl = "http://localhost:5020";

export const saveUrl = () => `${serverUrl}/api/savings`;
export const loadUrl = (login, password) => `${serverUrl}/api/savings/${login}/${password}`;