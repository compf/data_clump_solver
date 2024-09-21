package org.argouml.ui;
package org.argouml.ui;
package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeColors {
    // Methods related to colors and fonts used in themes
    //...
}
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;
import java.awt.Font;
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;

public class ThemeColors {
    public ColorUIResource getPrimary1() { return new ColorUIResource(102, 102, 153); }
    public ColorUIResource getPrimary2() { return new ColorUIResource(153, 153, 204); }
    public ColorUIResource getPrimary3() { return new ColorUIResource(204, 204, 255); }
    public ColorUIResource getSecondary1() { return new ColorUIResource(102, 102, 102); }
    public ColorUIResource getSecondary2() { return new ColorUIResource(153, 153, 153); }
    public ColorUIResource getSecondary3() { return new ColorUIResource(204, 204, 204); }
    public FontUIResource getControlTextFont() { return new FontUIResource("SansSerif", Font.PLAIN, 14); }
    public FontUIResource getSystemTextFont() { return new FontUIResource("Dialog", Font.PLAIN, 14); }
    public FontUIResource getUserTextFont() { return new FontUIResource("SansSerif", Font.PLAIN, 14); }
    public FontUIResource getSmallFont() { return new FontUIResource("Dialog", Font.PLAIN, 12); }
    public FontUIResource getWindowTitleFont() { return new FontUIResource("SansSerif", Font.BOLD, 14); }
}