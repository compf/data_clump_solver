/* $Id$
 *****************************************************************************
 * Copyright (c) 2010 Contributors - see below
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bob Tarling
 *****************************************************************************
 */

package org.argouml.activity2.diagram;

import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;

class DiagramElementBuilder {

    private static final int WIDTH = 90;
    private static final int HEIGHT = 25;
    
    static void buildDiagramElement(
            final DiagramNode fig,
            final String style,
            final Object owner,
            final DiagramSettings settings) {

        FigBaseNode figBaseNode = (FigBaseNode) fig;
        
        final Rectangle bounds =
            new Rectangle(fig.getX(), fig.getX(), WIDTH, HEIGHT);
        
        if (style.equals("compartmentbox")) {
            // For classifiers
        } else if (style.equals("rect")) {
            fig.setDisplayState(
                    new FigNamedRect(
                            owner, 
                            bounds, 
                            fig.getLineColor(), 
                            fig.getFillColor(),
                            owner,
                            settings));
        } else if (style.equals("rrect")) {
            figBaseNode.setDisplayState(
                    new FigNamedRRect(
                            owner, 
                            bounds, 
                            fig.getLineColor(), 
                            fig.getFillColor(),
                            owner,
                            settings));
        } else if (style.equals("pentagon")) {
            figBaseNode.setDisplayState(
                    new FigNamedPentagon(
                            owner, 
                            bounds, 
                            fig.getLineColor(), 
                            fig.getFillColor(),
                            owner,
                            settings));
        } else if (style.equals("concave-pentagon")) {
            figBaseNode.setDisplayState(
                    new FigNamedConcavePentagon(
                            owner, 
                            bounds, 
                            fig.getLineColor(), 
                            fig.getFillColor(),
                            owner,
                            settings));
        }
    }

}
