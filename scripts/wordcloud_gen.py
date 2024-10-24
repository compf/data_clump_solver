from wordcloud import WordCloud
import matplotlib.pyplot as plt

text = ""
with open ("stuff/prTextFeedback_cat.txt") as f:
    text=f.read()
print(text)

# Generate a word cloud image
wordcloud = WordCloud(background_color="white").generate(text)
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.savefig("stuff/wordcloud.svg")