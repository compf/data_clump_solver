package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

/**
 * This class encapsulates the dimensions and figures for a lifeline.
 */
class LifeLineDimensions {

    private FigLine lineFig;
    private FigRect rectFig;
    private int x, y, width, height;

    LifeLineDimensions(Rectangle bounds, int width, int height) {
        this.x = bounds.x;
        this.y = bounds.y;
        this.width = width;
        this.height = height;
    }

    void createFigures() {
        rectFig = new FigRect(x, y, width, height);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, FigLifeLine.LINE_COLOR);
        lineFig.setDashed(true);
        lineFig.setLineWidth(FigLifeLine.LINE_WIDTH);
    }

    FigRect getRectFig() {
        return rectFig;
    }

    FigLine getLineFig() {
        return lineFig;
    }

    int getLineX() {
        return lineFig.getX();
    }

    int getLineY() {
        return lineFig.getY();
    }

    int getLineWidth() {
        return lineFig.getWidth();
    }

    int getLineHeight() {
        return lineFig.getHeight();
    }

    int getInitialActivationWidth() {
        return 0;
    }

    int getInitialActivationHeight() {
        return 0;
    }

    void setLineHeight(int newHeight) {
        lineFig.setHeight(newHeight);
    }

    void setBounds(int x, int y, int w, int h) {
        rectFig.setBounds(x, y, w, h);
        updateLineFig();
    }

    void updateLineFig() {
        lineFig.setBounds(x + width / 2, y, width, height);
    }
}
