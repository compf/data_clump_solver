package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationDimensions {

    private final int x, y, width, height;

    public ActivationDimensions(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle asRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Getters and potentially other methods...
}
