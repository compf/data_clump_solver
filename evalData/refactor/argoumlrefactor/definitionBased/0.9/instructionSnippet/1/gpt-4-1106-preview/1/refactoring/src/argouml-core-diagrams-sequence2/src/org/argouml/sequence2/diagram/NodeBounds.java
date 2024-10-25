package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class NodeBounds {
    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public NodeBounds(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Getters and potentially other methods related to node bounds.

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }
}
