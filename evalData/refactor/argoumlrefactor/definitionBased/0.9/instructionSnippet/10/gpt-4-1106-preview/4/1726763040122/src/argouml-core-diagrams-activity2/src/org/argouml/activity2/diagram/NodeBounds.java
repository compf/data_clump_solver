package org.argouml.activity2.diagram;

public class NodeBounds {
    private int x, y, width, height;

    public NodeBounds(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }
    // More utility methods could be added here
}
