package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String fontNameControl, int fontStyleControl, int fontSizeControl, String fontNameSystem, int fontStyleSystem, int fontSizeSystem, String fontNameWindow, int fontStyleWindow, int fontSizeWindow) {
        this.controlFont = new FontUIResource(fontNameControl, fontStyleControl, fontSizeControl);
        this.systemFont = new FontUIResource(fontNameSystem, fontStyleSystem, fontSizeSystem);
        this.windowTitleFont = new FontUIResource(fontNameWindow, fontStyleWindow, fontSizeWindow);
    }

    // Getters for the fonts
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}