package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class PrimaryColorScheme {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public PrimaryColorScheme() {
        primary1 = new ColorUIResource(102, 102, 153);
        primary2 = new ColorUIResource(153, 153, 204);
        primary3 = new ColorUIResource(204, 204, 255);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }

    // Possibly additional functionality related to primary color scheme
}