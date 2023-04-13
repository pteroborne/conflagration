// src/lib/utils.js

export function isAdmin(user) {
    return user && user.role === 'admin';
}
