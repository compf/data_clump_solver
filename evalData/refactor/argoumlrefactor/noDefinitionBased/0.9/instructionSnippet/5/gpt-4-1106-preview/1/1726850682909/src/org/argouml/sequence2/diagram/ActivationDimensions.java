package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationDimensions {
    final int x, y, width, height;

    public ActivationDimensions(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Additional functionality or business logic could be added here
}