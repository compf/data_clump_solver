package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigMessage;

public class ActivationFigParams {
    final Object owner;
    final int x;
    final int y;
    final int w;
    final int h;
    final DiagramSettings settings;
    final FigMessage messageFig;

    public ActivationFigParams(Object owner, int x, int y, int w, int h, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.settings = settings;
        this.messageFig = messageFig;
    }
}