package org.argouml.ui;

import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(FontUIResource control, FontUIResource system, FontUIResource windowTitle, FontUIResource user, FontUIResource small) {
        this.controlFont = control;
        this.systemFont = system;
        this.windowTitleFont = windowTitle;
        this.userFont = user;
        this.smallFont = small;
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}