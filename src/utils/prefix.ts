const isProd = process.env.NODE_ENV === 'production';
const basePath = '';

export const prefix = (path: string) => {
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${cleanPath}`;
};
