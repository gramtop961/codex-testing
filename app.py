import json
import pathlib
from typing import Dict, List

from flask import Flask, jsonify, render_template, request

BASE_DIR = pathlib.Path(__file__).parent
DATA_PATH = BASE_DIR / "data" / "ingredients.json"

app = Flask(__name__)


def load_ingredient_data() -> List[Dict[str, str]]:
    """Load ingredient data from the bundled JSON file."""
    with DATA_PATH.open("r", encoding="utf-8") as handle:
        return json.load(handle)


INGREDIENTS = load_ingredient_data()


@app.route("/")
def index() -> str:
    return render_template("index.html")


@app.route("/api/ingredients")
def list_ingredients():
    """Return ingredient details filtered by a search query."""
    query = request.args.get("query", "").strip().lower()
    if not query:
        # Return a curated subset when no query is provided (first five items).
        return jsonify(INGREDIENTS[:5])

    results: List[Dict[str, str]] = []
    for ingredient in INGREDIENTS:
        haystack = " ".join([
            ingredient["name"],
            " ".join(ingredient.get("synonyms", [])),
            ingredient.get("description", ""),
        ]).lower()

        if query in haystack:
            results.append(ingredient)

    return jsonify(results)


@app.route("/api/ingredients/<string:name>")
def ingredient_detail(name: str):
    name = name.lower()
    for ingredient in INGREDIENTS:
        if ingredient["name"].lower() == name:
            return jsonify(ingredient)

    return jsonify({"error": "Ingredient not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
