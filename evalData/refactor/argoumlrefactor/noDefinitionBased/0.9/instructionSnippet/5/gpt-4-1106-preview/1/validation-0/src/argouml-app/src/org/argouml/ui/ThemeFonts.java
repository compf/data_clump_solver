package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private static final FontUIResource controlFont = new FontUIResource("SansSerif", Font.PLAIN, 14);
    private static final FontUIResource systemFont = new FontUIResource("Dialog", Font.PLAIN, 14);
    private static final FontUIResource windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, 14);
    private static final FontUIResource userFont = new FontUIResource("SansSerif", Font.PLAIN, 14);
    private static final FontUIResource smallFont = new FontUIResource("Dialog", Font.PLAIN, 12);

    public static FontUIResource getControlFont() { return controlFont; }
    public static FontUIResource getSystemFont() { return systemFont; }
    public static FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public static FontUIResource getUserFont() { return userFont; }
    public static FontUIResource getSmallFont() { return smallFont; }

    // Methods for huge fonts have been removed since they caused compilation errors and seem to be unnecessary
}