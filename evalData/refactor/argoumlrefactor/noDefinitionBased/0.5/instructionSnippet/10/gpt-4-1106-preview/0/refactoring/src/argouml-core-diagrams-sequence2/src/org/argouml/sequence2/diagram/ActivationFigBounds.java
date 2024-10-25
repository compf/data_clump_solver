package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationFigBounds {
    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public ActivationFigBounds(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle asRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Additional methods related to bounds can be added here
}
