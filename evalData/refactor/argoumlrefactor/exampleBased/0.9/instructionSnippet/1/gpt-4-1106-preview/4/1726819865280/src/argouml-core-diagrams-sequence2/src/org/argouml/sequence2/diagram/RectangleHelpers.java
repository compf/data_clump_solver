package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class RectangleHelpers {
    public static Rectangle createBounds(int x, int y, int width, int height) {
        return new Rectangle(x, y, width, height);
    }
}