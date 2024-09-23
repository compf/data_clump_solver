package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource menuFont;
    private final FontUIResource subFont;
    private final FontUIResource titleFont;

    public ThemeFontResources(int[] sizes, String[] fontNames, int[] styles) {
        controlFont = new FontUIResource(fontNames[0], styles[0], sizes[0]);
        systemFont = new FontUIResource(fontNames[1], styles[1], sizes[1]);
        userFont = new FontUIResource(fontNames[2], styles[2], sizes[2]);
        menuFont = new FontUIResource(fontNames[3], styles[3], sizes[3]);
        subFont = new FontUIResource(fontNames[4], styles[4], sizes[4]);
        titleFont = new FontUIResource(fontNames[2], styles[2], sizes[2]);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getMenuFont() { return menuFont; }
    public FontUIResource getSubFont() { return subFont; }
    public FontUIResource getTitleFont() { return titleFont; }
}
