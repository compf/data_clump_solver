package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private final ColorUIResource primary1, primary2, primary3;

    public ThemeColor(int p1Red, int p1Green, int p1Blue, int p2Red, int p2Green, int p2Blue, int p3Red, int p3Green, int p3Blue) {
        this.primary1 = new ColorUIResource(p1Red, p1Green, p1Blue);
        this.primary2 = new ColorUIResource(p2Red, p2Green, p2Blue);
        this.primary3 = new ColorUIResource(p3Red, p3Green, p3Blue);
    }

    // Additional methods to work with the colors could be added here
}