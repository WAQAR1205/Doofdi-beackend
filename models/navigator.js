const getMenuForRole = (role) => {
    // Logic to retrieve menu items from database or hardcoded menu based on role
    if (role === 'admin') {
        return [
            { label: 'Dashboard', link: '/dashboard' },
            { label: 'Users', link: '/users' },
            { label: 'Settings', link: '/settings' }
        ];
    } else {
        return [
            { label: 'Dashboard', link: '/dashboard' },
            { label: 'Profile', link: '/profile' }
        ];
    }
};

module.exports = {
    getMenuForRole
};
