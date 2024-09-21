package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;

public class ThemeAttributes {
    public final ColorUIResource primary1 = new ColorUIResource(102, 102, 153);
    public final ColorUIResource primary2 = new ColorUIResource(153, 153, 204);
    public final ColorUIResource primary3 = new ColorUIResource(204, 204, 255);

    public final ColorUIResource secondary1 =
        new ColorUIResource(102, 102, 102);
    public final ColorUIResource secondary2 =
        new ColorUIResource(153, 153, 153);
    public final ColorUIResource secondary3 =
        new ColorUIResource(204, 204, 204);

    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeAttributes(String fontFamily, int fontStyle, int largeFontSize, int smallFontSize) {
        this.controlFont =
            new FontUIResource(fontFamily, fontStyle, largeFontSize);
        this.systemFont =
            new FontUIResource("Dialog", Font.PLAIN, largeFontSize);
        this.windowTitleFont =
            new FontUIResource(fontFamily, Font.BOLD, largeFontSize);
        this.userFont =
            new FontUIResource(fontFamily, Font.PLAIN, largeFontSize);
        this.smallFont =
            new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
    }
}