# Ingredient Label Lookup

A simple web application for quickly looking up common food label ingredients. The project includes a Flask
backend that serves ingredient data and a lightweight frontend to search and view details.

## Features

- Search for ingredients by name, synonym, or E-number
- View descriptions, common uses, dietary notes, allergen information, and ingredient origin
- Responsive design suitable for desktop and mobile devices

## Getting started

### Requirements

- Python 3.9+
- `pip` for installing Python dependencies

### Installation

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Running the app

```bash
flask --app app run
```

The application will be available at http://127.0.0.1:5000/.

### Development notes

- Ingredient data is stored locally in `data/ingredients.json`. You can add more entries to extend the
  knowledge base.
- The `/api/ingredients` endpoint accepts a `query` string parameter and returns matching entries.

## Testing

The project does not include automated tests. You can verify that the backend loads by running:

```bash
python -m compileall app.py
```
