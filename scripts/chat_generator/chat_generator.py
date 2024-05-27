import svgwrite
def measure_text_length(text, font_size="14px", font_family="Arial"):
    # Estimate the width of the text. This is a simplified estimation.
    # You might need a more sophisticated method for precise measurements.
    return len(text) * (int(font_size[:-2]) * 0.6)

def create_chat_svg(queries_replies, filename="chat_dialog.svg"):
    dwg = svgwrite.Drawing(filename, profile='full', size=("400px", "600px"))

    # Add background
    dwg.add(dwg.rect(insert=(0, 0), size=("100%", "100%"), fill="#f9f9f9"))

    y_position = 20
    bubble_padding = 10
    line_height = 20
    max_width = 350  # Maximum width of a bubble

    for item in queries_replies:
        text = item["text"]
        is_query = item["type"] == "query"

        # Split the text into lines
        lines = text.split('\n')
        num_lines = len(lines)
        text_length = max(measure_text_length(line) for line in lines)
        bubble_width = min(text_length + 20, max_width)  # Add some padding and limit to max width
        bubble_height = num_lines * line_height + 10  # Calculate height based on number of lines

        if is_query:
            x_position = 400 - bubble_width - bubble_padding
            fill_color = "#d1e7ff"
            text_x = x_position + 10
        else:
            x_position = bubble_padding
            fill_color = "#e0e0e0"
            text_x = x_position + 10

        dwg.add(dwg.rect(
            insert=(x_position, y_position),
            size=(bubble_width, bubble_height),
            rx=10, ry=10,
            fill=fill_color
        ))

        # Add each line of text
        for i, line in enumerate(lines):
            dwg.add(dwg.text(
                line,
                insert=(text_x, y_position + 20 + i * line_height),
                font_size="14px",
                font_family="Arial",
                fill="#000"
            ))

        y_position += bubble_height + bubble_padding

    dwg.save()

# List of queries and replies
chat_data = [
    {"type": "query", "text": "Find and refactor all data clumps in the given file"},
    {"type": "query", "text": """
    // MathStuff.java
    public void printLength(int x, int y, int z) {
    }

    public void printSum(int x, int y, int z) {
    }
"""},
    {"type": "query", "text": """"
     // Library.java
    private boolean sign;
    private double mantissa;
    private int exponent;

     """},
    {"type": "query", "text":"""
    // MathUser.java
    private boolean sign;
    private double mantissa;
    private int exponent;
     """},
     {"type": "reply", "text":"The source code contains \nmethods and field for mathematical operations"}
]

create_chat_svg(chat_data)
