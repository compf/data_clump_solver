package org.argouml.activity2.diagram;

import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;

public class DiagramElementBuilder {

    public static void buildDiagramElement(FigBaseNode fig, String style, Object owner, DiagramSettings settings) {
        Rectangle bounds = fig.getBounds();
        if (style.equals("rect")) {
            FigNamedRect figNamedRect = new FigNamedRect(owner, bounds, settings);
            fig.setDisplayState(figNamedRect);
        } else if (style.equals("rrect")) {
            FigNamedRRect figNamedRRect = new FigNamedRRect(owner, bounds, settings);
            fig.setDisplayState(figNamedRRect);
        } else if (style.equals("pentagon")) {
            FigNamedPentagon figNamedPentagon = new FigNamedPentagon(owner, bounds, settings);
            fig.setDisplayState(figNamedPentagon);
        } else if (style.equals("concave-pentagon")) {
            FigNamedConcavePentagon figNamedConcavePentagon = new FigNamedConcavePentagon(owner, bounds, settings);
            fig.setDisplayState(figNamedConcavePentagon);
        }
        // Additional styles can be added here
    }
}
