package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class SecondaryColorTheme {

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public SecondaryColorTheme(int shade1, int shade2, int shade3) {
        secondary1 = new ColorUIResource(shade1, shade1, shade1);
        secondary2 = new ColorUIResource(shade2, shade2, shade2);
        secondary3 = new ColorUIResource(shade3, shade3, shade3);
    }

    public ColorUIResource getSecondary1() { return secondary1; }

    public ColorUIResource getSecondary2() { return secondary2; }

    public ColorUIResource getSecondary3() { return secondary3; }
}