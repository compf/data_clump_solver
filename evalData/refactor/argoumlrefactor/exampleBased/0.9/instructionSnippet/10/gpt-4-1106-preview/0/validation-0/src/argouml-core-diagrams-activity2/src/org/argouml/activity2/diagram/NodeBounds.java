package org.argouml.activity2.diagram;

import java.awt.Rectangle;

public class NodeBounds {
    private final Rectangle bounds;

    public NodeBounds(Rectangle bounds) {
        this.bounds = bounds;
    }

    public int getX() {
        return bounds.x;
    }

    public int getY() {
        return bounds.y;
    }

    public int getWidth() {
        return bounds.width;
    }

    public int getHeight() {
        return bounds.height;
    }

    // Additional methods and logic can be added here
}