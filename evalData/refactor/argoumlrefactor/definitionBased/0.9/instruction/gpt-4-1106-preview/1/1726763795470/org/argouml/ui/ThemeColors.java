package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int p1Red, int p1Green, int p1Blue, int p2Red, int p2Green, int p2Blue, int p3Red, int p3Green, int p3Blue, int s1Red, int s1Green, int s1Blue, int s2Red, int s2Green, int s2Blue, int s3Red, int s3Green, int s3Blue) {
        primary1 = new ColorUIResource(p1Red, p1Green, p1Blue);
        primary2 = new ColorUIResource(p2Red, p2Green, p2Blue);
        primary3 = new ColorUIResource(p3Red, p3Green, p3Blue);

        secondary1 = new ColorUIResource(s1Red, s1Green, s1Blue);
        secondary2 = new ColorUIResource(s2Red, s2Green, s2Blue);
        secondary3 = new ColorUIResource(s3Red, s3Green, s3Blue);
    }

    // Getters for individual colors...
}