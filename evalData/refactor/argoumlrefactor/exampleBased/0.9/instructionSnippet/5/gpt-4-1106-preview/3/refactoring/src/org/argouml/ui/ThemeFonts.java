package org.argouml.ui;

import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(FontUIResource control, FontUIResource system, FontUIResource windowTitle, FontUIResource user, FontUIResource small) {
        this.controlFont = control;
        this.systemFont = system;
        this.windowTitleFont = windowTitle;
        this.userFont = user;
        this.smallFont = small;
    }
    // getters
}