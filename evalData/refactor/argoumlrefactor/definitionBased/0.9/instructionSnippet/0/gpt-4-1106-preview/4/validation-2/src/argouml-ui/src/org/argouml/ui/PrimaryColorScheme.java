package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class PrimaryColorScheme {
    private final ColorUIResource primaryOne;
    private final ColorUIResource primaryTwo;
    private final ColorUIResource primaryThree;

    public PrimaryColorScheme() {
        primaryOne = new ColorUIResource(102, 102, 153);
        primaryTwo = new ColorUIResource(153, 153, 204);
        primaryThree = new ColorUIResource(204, 204, 255);
    }

    public ColorUIResource getPrimaryOne() { return primaryOne; }
    public ColorUIResource getPrimaryTwo() { return primaryTwo; }
    public ColorUIResource getPrimaryThree() { return primaryThree; }

    // Possibly additional functionality related to primary color scheme
}