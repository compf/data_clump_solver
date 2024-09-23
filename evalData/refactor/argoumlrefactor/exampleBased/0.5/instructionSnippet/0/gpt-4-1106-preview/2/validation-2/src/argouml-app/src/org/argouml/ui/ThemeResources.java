package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;

public class ThemeResources {

    private final ColorUIResource primary1 = new ColorUIResource(102, 102, 153);
    private final ColorUIResource primary2 = new ColorUIResource(153, 153, 204);
    private final ColorUIResource primary3 = new ColorUIResource(204, 204, 255);
    private final ColorUIResource secondary1 = new ColorUIResource(102, 102, 102);
    private final ColorUIResource secondary2 = new ColorUIResource(153, 153, 153);
    private final ColorUIResource secondary3 = new ColorUIResource(204, 204, 204);
    private final FontUIResource controlFont = new FontUIResource("SansSerif", Font.PLAIN, 14);
    private final FontUIResource systemFont = new FontUIResource("Dialog", Font.PLAIN, 14);
    private final FontUIResource windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, 14);
    private final FontUIResource userFont = new FontUIResource("SansSerif", Font.PLAIN, 14);
    private final FontUIResource smallFont = new FontUIResource("Dialog", Font.PLAIN, 10);

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }

    // Additional methods omitted for brevity
}