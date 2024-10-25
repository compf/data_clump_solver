package org.argouml.ui;

import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(FontUIResource control, FontUIResource system, FontUIResource windowTitle, FontUIResource user, FontUIResource small) {
        controlFont = control;
        systemFont = system;
        windowTitleFont = windowTitle;
        userFont = user;
        smallFont = small;
    }

    // Getters for each font...
}
