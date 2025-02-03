import re, os

def clean_text(text: str):
    """
    Cleans the input text by removing unwanted characters,
    keeping punctuation marks, and converting everything to lowercase.
    
    Args:
        text (str): The text to be cleaned.

    Returns:
        str: The cleaned text.
    """

    # Convert all characters to lowercase
    text = text.lower()

    # Remove all non-alphanumeric characters except spaces and punctuation
    cleaned_text = re.sub(r"[^a-zA-Z0-9\s.,!?;:'\"-]", "", text)

    # Remove extra spaces
    cleaned_text = re.sub(r"\s+", " ", cleaned_text).strip()

    return cleaned_text