package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigMessage;

public class ActivationFigData {
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public ActivationFigData(int x, int y, int width, int height, DiagramSettings settings, FigMessage messageFig) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    // Getters and other methods
}