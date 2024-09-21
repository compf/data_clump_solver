package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;
    private FontUIResource windowTitleFont;

    public ThemeFonts(int style, int largeSize, int smallSize) {
        controlFont = new FontUIResource("Dialog", style, largeSize);
        systemFont = new FontUIResource("Dialog", style, largeSize);
        userFont = new FontUIResource("Dialog", style, largeSize);
        smallFont = new FontUIResource("Dialog", style, smallSize);
        windowTitleFont = new FontUIResource("Dialog", Font.BOLD, largeSize);
    }
    // ... getter methods for each font ...
}