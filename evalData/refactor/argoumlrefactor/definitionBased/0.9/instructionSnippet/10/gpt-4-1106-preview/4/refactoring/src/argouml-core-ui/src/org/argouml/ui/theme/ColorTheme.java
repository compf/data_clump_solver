package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;

public class ColorTheme {

    private final ColorUIResource primary1 = new ColorUIResource(102, 102, 153);
    private final ColorUIResource primary2 = new ColorUIResource(153, 153, 204);
    private final ColorUIResource primary3 = new ColorUIResource(204, 204, 255);

    private final ColorUIResource secondary1 =
	new ColorUIResource(102, 102, 102);
    private final ColorUIResource secondary2 =
	new ColorUIResource(153, 153, 153);
    private final ColorUIResource secondary3 =
	new ColorUIResource(204, 204, 204);

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ColorTheme(int fontSize) {
        this.controlFont = new FontUIResource("SansSerif", Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, fontSize);
        this.userFont = new FontUIResource("SansSerif", Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, fontSize - 2);
    }

    // Methods returning color and font resource objects

}
