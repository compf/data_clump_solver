package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontResources(String fontNameControl, String fontNameSystem, int styleControl, int sizeControl, int styleTitle, int sizeTitle, int styleUser, int sizeUser, int styleSmall, int sizeSmall) {
        controlFont = new FontUIResource(fontNameControl, styleControl, sizeControl);
        systemFont = new FontUIResource(fontNameSystem, styleControl, sizeControl);
        windowTitleFont = new FontUIResource(fontNameControl, styleTitle, sizeTitle);
        userFont = new FontUIResource(fontNameControl, styleUser, sizeUser);
        smallFont = new FontUIResource(fontNameSystem, styleSmall, sizeSmall);
    }

    // Getters and additional functionality can be added here
}
