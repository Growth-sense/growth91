// Growth91 Unicorn Themes - Simple Color Customization
// 6 themes: Default (original), Primary (orange), Secondary (green), Teal, Purple, and Red

export const GROWTH91_THEMES = {
  default: {
    id: 'default',
    name: 'Original Colors',
    description: 'Keep original Growth91 design',
    colors: {
      primary: 'rgb(25, 25, 100)',  // Original blue 
      themeColor: null,              // No custom color
    }
  },
  teal: {
    id: 'teal',
    name: 'Teal Blue',
    description: 'Modern teal theme',
    colors: {
      primary: '#17a2b8',        // Teal
      themeColor: '#17a2b8',     // Teal for sections
    }
  },
  purple: {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Premium purple theme',
    colors: {
      primary: '#6f42c1',        // Purple
      themeColor: '#6f42c1',     // Purple for sections
    }
  },
  red: {
    id: 'red',
    name: 'Crimson Red',
    description: 'Bold red theme',
    colors: {
      primary: '#dc3545',        // Red
      themeColor: '#dc3545',     // Red for sections
    }
  }
};

// Apply theme - sets CSS variable for custom sections
export const applyTheme = (themeId) => {
  const theme = GROWTH91_THEMES[themeId] || GROWTH91_THEMES.default;
  const root = document.documentElement;
  
  if (themeId === 'default' || !themeId) {
    // Remove theme color - use original styles
    root.style.removeProperty('--custom-theme-color');
  } else {
    // Apply custom theme color
    root.style.setProperty('--custom-theme-color', theme.colors.themeColor);
  }
  
  localStorage.setItem('growth91-unicorn-theme', themeId || 'default');
  return theme;
};

export const getCurrentTheme = () => {
  const themeId = localStorage.getItem('growth91-unicorn-theme') || 'default';
  return GROWTH91_THEMES[themeId] || GROWTH91_THEMES.default;
};

export default GROWTH91_THEMES;
