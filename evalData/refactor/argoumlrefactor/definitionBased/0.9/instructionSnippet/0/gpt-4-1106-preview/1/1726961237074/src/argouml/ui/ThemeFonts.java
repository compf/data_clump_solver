package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont = new FontUIResource("Dialog", Font.BOLD, 12);
    private final FontUIResource systemFont = new FontUIResource("Dialog", Font.PLAIN, 12);
    private final FontUIResource windowTitleFont = new FontUIResource("Dialog", Font.BOLD, 12);
    private final FontUIResource userFont = new FontUIResource("Dialog", Font.PLAIN, 12);
    private final FontUIResource smallFont = new FontUIResource("Dialog", Font.PLAIN, 10);

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}