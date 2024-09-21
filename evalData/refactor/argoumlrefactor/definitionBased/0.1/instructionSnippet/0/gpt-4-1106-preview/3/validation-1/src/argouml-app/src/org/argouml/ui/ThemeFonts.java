package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontNameControl, int fontStyleControl, int fontSizeControl, String fontNameSystem, int fontStyleSystem, int fontSizeSystem, String fontNameWindow, int fontStyleWindow, int fontSizeWindow, String fontNameUser, int fontStyleUser, int fontSizeUser, String fontNameSmall, int fontStyleSmall, int fontSizeSmall) {
        this.controlFont = new FontUIResource(fontNameControl, fontStyleControl, fontSizeControl);
        this.systemFont = new FontUIResource(fontNameSystem, fontStyleSystem, fontSizeSystem);
        this.windowTitleFont = new FontUIResource(fontNameWindow, fontStyleWindow, fontSizeWindow);
        this.userFont = new FontUIResource(fontNameUser, fontStyleUser, fontSizeUser);
        this.smallFont = new FontUIResource(fontNameSmall, fontStyleSmall, fontSizeSmall);
    }

    // Getters for the fonts
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}