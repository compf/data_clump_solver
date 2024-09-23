package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

public class ActivationParams {
    private final Object owner;
    private final int xPosition;
    private final int yPosition;
    private final int widthValue;
    private final int heightValue;
    private final DiagramSettings diagramSettings;
    private final FigMessage figMessage;

    public ActivationParams(Object owner, int x, int y, int width, int height, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.xPosition = x;
        this.yPosition = y;
        this.widthValue = width;
        this.heightValue = height;
        this.diagramSettings = settings;
        this.figMessage = messageFig;
    }

    public Object getOwner() { return owner; }
    public int getXPosition() { return xPosition; }
    public int getYPosition() { return yPosition; }
    public int getWidthValue() { return widthValue; }
    public int getHeightValue() { return heightValue; }
    public DiagramSettings getDiagramSettings() { return diagramSettings; }
    public FigMessage getFigMessage() { return figMessage; }
}
