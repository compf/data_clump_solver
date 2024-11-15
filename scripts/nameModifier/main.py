import json
import humps
from itertools import chain
from nltk.corpus import wordnet
import nltk
from nltk.corpus import wordnet as wn
nltk.download('wordnet')
def load_typos():
    typos=dict()
    with open("birbeck.dat") as f:
        curr=""
        for l in f:
            l=l.strip()
            if l.startswith("$"):
                curr=l[1:]
                typos[curr]=[]
            else:
                typos[curr].append(l)
    return typos



def load_variables():
    all_names=set()
    with open("variables.txt") as f:
       arr=json.load(f)
       for item in arr:
           names=[i.split(" ")[1] for i in item.split(";")]
           names=[humps.decamelize(i) for i  in names]
           names=[i.lower() for i in names]
           names=list(chain(*[i.split("_") for i in names]))
           names=set(names)
           all_names=all_names | names
    return all_names

from collections import defaultdict

def get_expanded_synonyms_by_type(word):
    synonyms = defaultdict(set)
    
    # Iterate through all synsets of the word
    for synset in wn.synsets(word):
        word_type = synset.pos()  # Part of speech (e.g., noun, verb)
        
        # Add direct synonyms
        for lemma in synset.lemmas():
            if lemma.name() != word:
                synonyms[word_type].add(lemma.name().replace('_', ' '))
        
        # Add synonyms from related synsets
        for related_synset in synset.similar_tos() + synset.hypernyms() + synset.hyponyms():
            for lemma in related_synset.lemmas():
                if lemma.name() != word:
                    synonyms[word_type].add(lemma.name().replace('_', ' '))

    # Convert sets back to lists for uniformity
    return {word_type: list(synonyms_list) for word_type, synonyms_list in synonyms.items()}
def get_synonyms(word:str):
    synonyms = wordnet.synsets(word)
    lemmas = set(chain.from_iterable([word.lemma_names() for word in synonyms]))
    return lemmas
typos=load_typos()
all_names=load_variables()

for n in all_names:
    if n in typos:
        print("Typos", n,typos[n])
    print("Synonyms",n,get_expanded_synonyms_by_type(n))
    print()
            
