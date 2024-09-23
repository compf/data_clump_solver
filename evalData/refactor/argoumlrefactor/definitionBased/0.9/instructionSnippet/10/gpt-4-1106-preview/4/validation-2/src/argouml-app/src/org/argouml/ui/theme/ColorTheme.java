package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ColorTheme {

    private final ColorUIResource primary1 = new ColorUIResource(102, 102, 153);
    private final ColorUIResource primary2 = new ColorUIResource(153, 153, 204);
    private final ColorUIResource primary3 = new ColorUIResource(204, 204, 255);

    private final ColorUIResource secondary1 = new ColorUIResource(102, 102, 102);
    private final ColorUIResource secondary2 = new ColorUIResource(153, 153, 153);
    private final ColorUIResource secondary3 = new ColorUIResource(204, 204, 204);

    private final FontUIResource controlFont = new FontUIResource("Dialog", Font.PLAIN, FontUIResource.DEFAULT_SIZE);
    private final FontUIResource systemFont = new FontUIResource("Dialog", Font.PLAIN, FontUIResource.DEFAULT_SIZE);
    private final FontUIResource userFont = new FontUIResource("Dialog", Font.PLAIN, FontUIResource.DEFAULT_SIZE);
    private final FontUIResource smallFont = new FontUIResource("Dialog", Font.PLAIN, FontUIResource.DEFAULT_SIZE - 2);
    private final FontUIResource windowTitleFont = new FontUIResource("Dialog", Font.BOLD, FontUIResource.DEFAULT_SIZE + 2);

    public ColorUIResource getPrimary1() {
        return primary1;
    }

    public ColorUIResource getPrimary2() {
        return primary2;
    }

    public ColorUIResource getPrimary3() {
        return primary3;
    }

    public ColorUIResource getSecondary1() {
        return secondary1;
    }

    public ColorUIResource getSecondary2() {
        return secondary2;
    }

    public ColorUIResource getSecondary3() {
        return secondary3;
    }

    public FontUIResource getControlTextFont() {
        return controlFont;
    }

    public FontUIResource getSystemTextFont() {
        return systemFont;
    }

    public FontUIResource getUserTextFont() {
        return userFont;
    }

    public FontUIResource getMenuTextFont() {
        return controlFont;
    }

    public FontUIResource getSubTextFont() {
        return smallFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}
