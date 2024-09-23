package org.argouml.activity2.diagram;

import java.awt.Rectangle;

public class NodeBounds {
    private int x;
    private int y;
    private int width;
    private int height;

    public NodeBounds(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Getter and setter methods
}
