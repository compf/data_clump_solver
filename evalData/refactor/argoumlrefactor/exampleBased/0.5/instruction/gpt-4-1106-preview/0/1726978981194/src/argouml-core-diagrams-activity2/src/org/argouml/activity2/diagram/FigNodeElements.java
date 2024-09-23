public class FigNodeElements {

    private FigBasePresentation displayState;
    private final DiagramSettings settings;
    private DiagramElement nameDiagramElement;

    public FigNodeElements(DiagramSettings settings) {
        this.settings = settings;
    }

    public void setDisplayState(FigBasePresentation displayState) {
        this.displayState = displayState;
        displayState.setOwner(getOwner());
    }

    public void setNameDiagramElement(DiagramElement name) {
        this.nameDiagramElement = name;
    }

    public Dimension getMinimumSize() {
        return displayState.getMinimumSize();
    }

    // Additional functionality can be added here
}