package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontResources(int[] sizes, String[] fontNames, int[] styles) {
        controlFont = new FontUIResource(fontNames[0], styles[0], sizes[0]);
        systemFont = new FontUIResource(fontNames[1], styles[1], sizes[1]);
        windowTitleFont = new FontUIResource(fontNames[2], styles[2], sizes[2]);
        userFont = new FontUIResource(fontNames[3], styles[3], sizes[3]);
        smallFont = new FontUIResource(fontNames[4], styles[4], sizes[4]);
    }

    // Getter methods for fonts
}
