export const API_BASE_URL =
// apps created with create-react-app to have environment variables flow through the build process, they must be prepended with REACT_APP_
    process.env.REACT_APP_API_BASE_URL ||'http://localhost:8080/api';
    // process.env.REACT_APP_API_BASE_URL || 'mongodb://mongo:8080/api'

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
