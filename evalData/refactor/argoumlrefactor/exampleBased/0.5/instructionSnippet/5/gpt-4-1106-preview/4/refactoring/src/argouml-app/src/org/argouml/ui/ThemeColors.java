package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;
    private ColorUIResource secondary1;
    private ColorUIResource secondary2;
    private ColorUIResource secondary3;

    public ThemeColors(int p1r, int p1g, int p1b, int p2r, int p2g, int p2b, int p3r, int p3g, int p3b) {
        primary1 = new ColorUIResource(p1r, p1g, p1b);
        primary2 = new ColorUIResource(p2r, p2g, p2b);
        primary3 = new ColorUIResource(p3r, p3g, p3b);
    }

    public ThemeColors(int s1r, int s1g, int s1b, int s2r, int s2g, int s2b, int s3r, int s3g, int s3b) {
        secondary1 = new ColorUIResource(s1r, s1g, s1b);
        secondary2 = new ColorUIResource(s2r, s2g, s2b);
        secondary3 = new ColorUIResource(s3r, s3g, s3b);
    }

    // Getters...
}