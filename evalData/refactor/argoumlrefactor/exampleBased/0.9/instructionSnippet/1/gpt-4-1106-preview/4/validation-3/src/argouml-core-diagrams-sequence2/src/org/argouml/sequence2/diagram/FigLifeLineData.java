package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

public class FigLifeLineData {
    private Object owner;
    private int x, y, width, height;
    private DiagramSettings settings;

    public FigLifeLineData(Object owner, int x, int y, int width, int height, DiagramSettings settings) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
    }

    public Object getOwner() {
        return owner;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public DiagramSettings getSettings() {
        return settings;
    }
}