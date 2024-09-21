package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font controlAndUserFont, Font smallFont) {
        this.controlFont = new FontUIResource(controlAndUserFont);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, controlAndUserFont.getSize());
        this.windowTitleFont = new FontUIResource(controlAndUserFont.deriveFont(Font.BOLD));
        this.userFont = new FontUIResource(controlAndUserFont);
        this.smallFont = new FontUIResource(smallFont);
    }

    // Getters for fonts
    // ...
}
