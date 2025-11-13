import React, { useState, useEffect } from 'react';
import { GROWTH91_THEMES } from '../helper/themes';
import { message, Button, Spin } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import Bridge from '../constants/Bridge';
import './ThemeSelector.css';

const ThemeSelector = ({
    tudTempUdID,
    unicornDealID,
    currentTheme,
    onThemeChange,
    showPreview = false, // NOT USED IN FORMS - only for preview pages
    compact = false
}) => {
    const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'default');
    const [saving, setSaving] = useState(false);
    const [savedTheme, setSavedTheme] = useState(currentTheme || 'default');

    useEffect(() => {
        setSelectedTheme(currentTheme || 'default');
        setSavedTheme(currentTheme || 'default');
    }, [currentTheme]);

    // Handle theme selection and save directly
    const handleThemeSelect = async (themeId) => {
        if (saving) return;

        setSelectedTheme(themeId);

        // Save immediately to database (NO COLOR CHANGES IN FORM)
        setSaving(true);
        try {
            const payload = { theme: themeId };

            if (tudTempUdID) {
                payload.tudTempUdID = tudTempUdID;
            } else if (unicornDealID) {
                payload.unicornDealID = unicornDealID;
            }

            const result = await Bridge.Unicorn.updateUnicornTheme(payload);

            if (result.status === '1') {
                const themeName = GROWTH91_THEMES[themeId]?.name || themeId;
                message.success(`✅ ${themeName} theme saved! Click Preview to see changes.`);
                setSavedTheme(themeId);

                if (onThemeChange) {
                    onThemeChange(themeId);
                }
            } else {
                message.error('Failed to save theme. Please try again.');
                setSelectedTheme(savedTheme);
            }
        } catch (error) {
            console.error('Error saving theme:', error);
            message.error('Error saving theme. Please try again.');
            setSelectedTheme(savedTheme);
        }
        setSaving(false);
    };

    return (
        <div className={`theme-selector-container ${compact ? 'compact' : ''}`}>
            {!compact && (
                <>
                    <h3 className="theme-selector-title">
                        Choose Theme Color 🎨
                    </h3>
                    <p className="theme-selector-description">
                        Select a color theme. This will change specific section backgrounds (Navigation, About, Team, Contact).
                        <br />
                        <strong>Default</strong> keeps original colors. <strong>Primary Orange</strong> applies orange to key sections.
                    </p>
                </>
            )}

            <div className={`theme-grid ${compact ? 'compact-grid' : ''}`}>
                {Object.values(GROWTH91_THEMES).map((theme) => (
                    <div
                        key={theme.id}
                        className={`theme-card ${selectedTheme === theme.id ? 'selected' : ''} ${saving ? 'disabled' : ''
                            }`}
                        onClick={() => handleThemeSelect(theme.id)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleThemeSelect(theme.id);
                            }
                        }}
                    >
                        {/* Color Swatches */}
                        <div className="theme-preview">
                            <div className="color-swatches">
                                <div
                                    className="swatch swatch-primary"
                                    style={{ backgroundColor: theme.colors.primary }}
                                    title="Theme Color"
                                />
                            </div>
                        </div>

                        {/* Theme Info */}
                        <div className="theme-info">
                            <h4 className="theme-name">{theme.name}</h4>
                            {!compact && (
                                <p className="theme-description">{theme.description}</p>
                            )}
                        </div>

                        {/* Selected Badge */}
                        {selectedTheme === theme.id && (
                            <div className="selected-badge">
                                <CheckCircleFilled /> {savedTheme === theme.id ? 'Active' : 'Selected'}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Loading Overlay */}
            {saving && (
                <div className="saving-overlay">
                    <Spin size="large" tip="Saving your theme..." />
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
