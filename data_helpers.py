import numpy as np
import re
import itertools
from collections import Counter


def clean_str(string):
    """
    Tokenization/string cleaning for all datasets except for SST.
    Original taken from https://github.com/yoonkim/CNN_sentence/blob/master/process_data.py
    """
    #string = re.sub(r"[^A-Za-z0-9(),!?\'\`]", " ", string)
    string = re.sub(r"\'s", " \'s", string)
    string = re.sub(r"\'ve", " \'ve", string)
    string = re.sub(r"n\'t", " n\'t", string)
    string = re.sub(r"\'re", " \'re", string)
    string = re.sub(r"\'d", " \'d", string)
    string = re.sub(r"\'ll", " \'ll", string)
    string = re.sub(r",", " , ", string)
    string = re.sub(r"!", " ! ", string)
    string = re.sub(r"\(", " \( ", string)
    string = re.sub(r"\)", " \) ", string)
    string = re.sub(r"\?", " \? ", string)
    string = re.sub(r"\s{2,}", " ", string)
    return string.strip().lower()

def load_data_and_labels3(data_file_lists):
    """
    Loads MR polarity data from files, splits the data into words and generates labels.
    Returns split sentences and labels.
    """
    # Load data from files
    examples = [None] * 18
    labels = [None] * 18
    
    x_text = []
    
    for index, item in enumerate(data_file_lists):
        examples[index] = list(open(item, "r").readlines())
        examples[index] = [s.strip() for s in examples[index]]
        
        x_text = x_text + examples[index]
        x_text = [clean_str(sent) for sent in x_text]
    
    labels[0]  = [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[0]]
    labels[1]  = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[1]]
    labels[2]  = [[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[2]]
    labels[3]  = [[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[3]]
    labels[4]  = [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[4]]
    labels[5]  = [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[5]]
    labels[6]  = [[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[6]]
    labels[7]  = [[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[7]]
    labels[8]  = [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[8]]
    labels[9]  = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[9]]
    labels[10] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0] for _ in examples[10]]
    labels[11] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] for _ in examples[11]]
    labels[12] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0] for _ in examples[12]]
    labels[13] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0] for _ in examples[13]]
    labels[14] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] for _ in examples[14]]
    labels[15] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0] for _ in examples[15]]
    labels[16] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0] for _ in examples[16]]
    labels[17] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] for _ in examples[17]]

    y = np.concatenate([labels[0], labels[1], labels[2], labels[3], labels[4], labels[5], labels[6], labels[7], labels[8], labels[9], labels[10], labels[11], labels[12], labels[13], labels[14], labels[15], labels[16], labels[17]], 0)
    return [x_text, y]


def load_data_and_labels2(data_file_lists):
    """
    Loads MR polarity data from files, splits the data into words and generates labels.
    Returns split sentences and labels.
    """
    # Load data from files
    examples = [None] * 14
    labels = [None] * 14
    
    x_text = []
    
    for index, item in enumerate(data_file_lists):
        examples[index] = list(open(item, "r").readlines())
        examples[index] = [s.strip() for s in examples[index]]
        
        x_text = x_text + examples[index]
        x_text = [clean_str(sent) for sent in x_text]
    
    labels[0]  = [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[0]]
    labels[1]  = [[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[1]]
    labels[2]  = [[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[2]]
    labels[3]  = [[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[3]]
    labels[4]  = [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[4]]
    labels[5]  = [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] for _ in examples[5]]
    labels[6]  = [[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0] for _ in examples[6]]
    labels[7]  = [[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] for _ in examples[7]]
    labels[8]  = [[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0] for _ in examples[8]]
    labels[9]  = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0] for _ in examples[9]]
    labels[10] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] for _ in examples[10]]
    labels[11] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0] for _ in examples[11]]
    labels[12] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0] for _ in examples[12]]
    labels[13] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] for _ in examples[13]]

    y = np.concatenate([labels[0], labels[1], labels[2], labels[3], labels[4], labels[5], labels[6], labels[7], labels[8], labels[9], labels[10], labels[11], labels[12], labels[13]], 0)
    return [x_text, y]


def load_data_and_labels(positive_data_file, negative_data_file, good_data_file):
    """
    Loads MR polarity data from files, splits the data into words and generates labels.
    Returns split sentences and labels.
    """
    # Load data from files
    positive_examples = list(open(positive_data_file, "r").readlines())
    positive_examples = [s.strip() for s in positive_examples]

    negative_examples = list(open(negative_data_file, "r").readlines())
    negative_examples = [s.strip() for s in negative_examples]

    good_examples = list(open(good_data_file, "r").readlines())
    good_examples = [s.strip() for s in good_examples]


    # Split by words
    x_text = positive_examples + negative_examples + good_examples
    x_text = [clean_str(sent) for sent in x_text]


    # Generate labels
    positive_labels = [[0, 1, 0] for _ in positive_examples]
    negative_labels = [[1, 0, 0] for _ in negative_examples]
    good_labels = [[0, 0, 1] for _ in good_examples]

    y = np.concatenate([positive_labels, negative_labels, good_labels], 0)
    return [x_text, y]


def batch_iter(data, batch_size, num_epochs, shuffle=True):
    """
    Generates a batch iterator for a dataset.
    """
    data = np.array(data)
    data_size = len(data)
    num_batches_per_epoch = int((len(data)-1)/batch_size) + 1
    for epoch in range(num_epochs):
        # Shuffle the data at each epoch
        if shuffle:
            shuffle_indices = np.random.permutation(np.arange(data_size))
            shuffled_data = data[shuffle_indices]
        else:
            shuffled_data = data
        for batch_num in range(num_batches_per_epoch):
            start_index = batch_num * batch_size
            end_index = min((batch_num + 1) * batch_size, data_size)
            yield shuffled_data[start_index:end_index]
