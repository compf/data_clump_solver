package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationDimensions {
    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public ActivationDimensions(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Additional methods can be added here
}
