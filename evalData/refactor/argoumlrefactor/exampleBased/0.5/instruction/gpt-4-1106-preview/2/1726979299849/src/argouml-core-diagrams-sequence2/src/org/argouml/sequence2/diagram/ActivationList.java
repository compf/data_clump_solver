public class ActivationList {

    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public ActivationList() {
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();
    }

    public void createActivations(List<FigMessage> messages, FigLifeLine lifeLine) {
        // Implementation of activation creation logic
    }

    public void clearActivations(FigLifeLine lifeLine) {
        // Implementation of activation clearing logic
    }

    // Other methods related to activations
}