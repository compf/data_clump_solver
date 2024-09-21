package org.argouml.activity2.diagram;

class NodeBounds {
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

    // Accessor methods for x, y, width, and height
    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }

    // Other potentially useful methods could be added here
    // ...
}