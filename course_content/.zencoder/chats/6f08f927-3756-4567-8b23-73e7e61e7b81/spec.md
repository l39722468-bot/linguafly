# Technical Specification: JSON to CSV Keyword Conversion

## Technical Context
- **Language**: Python 3.x
- **Input File**: `/Users/lidia/Documents/focusonenglish/seo-keyword-categorization.json`
- **Output File**: `/Users/lidia/Documents/focusonenglish/seo-keyword-categorization.csv`
- **Dependencies**: Standard Python `json` and `csv` modules.

## Implementation Approach
1. Create a Python script `scripts/convert-keywords-to-csv.py`.
2. Read the JSON file, which contains a dictionary where keys are categories and values are lists of keywords.
3. Flatten the data into a list of tuples: `(category, keyword)`.
4. Write the flattened data to a CSV file with headers `category` and `keyword`.

## Source Code Structure Changes
- New file: `scripts/convert-keywords-to-csv.py`
- New file: `seo-keyword-categorization.csv` (output)

## Data Model / API / Interface Changes
- None. This is a data transformation task.

## Verification Approach
1. Check that the output CSV file exists.
2. Verify that the number of rows in the CSV (excluding header) matches the total number of keywords in the JSON file.
3. Sample check a few entries to ensure correct mapping.
