package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

public class FigActivationData {
    private Object owner;
    private int x, y, width, height;
    private DiagramSettings settings;

    public FigActivationData(Object owner, int x, int y, int width, int height, DiagramSettings settings) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
    }

    // getters
}