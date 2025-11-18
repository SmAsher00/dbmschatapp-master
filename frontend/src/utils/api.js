const normalizeBaseUrl = (url = "") => {
	if (!url) return "";
	const trimmed = url.trim();
	if (!trimmed) return "";
	return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
};

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_URL);

export const buildApiUrl = (path = "/") => {
	if (!path.startsWith("/")) path = `/${path}`;
	return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
};

export const getSocketUrl = () => {
	return API_BASE_URL || undefined;
};

