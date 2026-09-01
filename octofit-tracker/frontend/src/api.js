/**
 * API Configuration Utility
 *
 * VITE_CODESPACE_NAME must be defined in .env.local when running in GitHub Codespaces.
 * If it is missing, we fall back to localhost to avoid invalid URLs such as
 * https://undefined-8000.app.github.dev.
 */

export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const getApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api/${endpoint}`;
};

export const fetchApiData = async (endpoint) => {
  try {
    const url = getApiUrl(endpoint);
    console.log(`Fetching: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};
