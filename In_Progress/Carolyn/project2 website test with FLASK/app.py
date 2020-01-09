import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# The database URI
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/rest_data.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
dog_data = Base.classes.dog_restaurants
wc_data = Base.classes.wc_restaurants
both_data = Base.classes.both_restaurants


@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")

@app.route('/<string:page_name>')
def render_static(page_name):
    return render_template('%s' % page_name)

@app.route("/dog_restaurants_word_cloud")
def dog_restaurants_word():
    """Return dog_restaurants word cloud visualization"""

    # Query
    results = db.session.query(dog_data.neighborhood).\
        all()
    neighborhoods = [result[0] for result in results]
    dog_info = dict(map(lambda x  : (x , list(neighborhoods).count(x)) , neighborhoods))

    return jsonify(dog_info)

@app.route("/wc_restaurants_word_cloud")
def wc_restaurants_word():
    """Return wc_restaurants word cloud visualization"""

    # Query
    results = db.session.query(wc_data.neighborhood).\
        all()
    neighborhoods = [result[0] for result in results]
    wc_info = dict(map(lambda x  : (x , list(neighborhoods).count(x)) , neighborhoods))

    return jsonify(wc_info)

@app.route("/both_restaurants_word_cloud")
def both_restaurants_word():
    """Return both_restaurants word cloud visualization"""

    # Query
    results = db.session.query(both_data.neighborhood).\
        all()
    neighborhoods = [result[0] for result in results]
    both_info = dict(map(lambda x  : (x , list(neighborhoods).count(x)) , neighborhoods))

    return jsonify(both_info)

@app.route("/dog_restaurants_json")
def dog_restaurants_json():
    """Return dog_restaurants json"""
    sel = [
        dog_data.rest_name,
        dog_data.latitude,
        dog_data.longitude,
        dog_data.rest_address,
        dog_data.zip_code, 
        dog_data.website, 
        dog_data.neighborhood
    ]
    # Query
    results = db.session.query(*sel).all()
    
    dog_json_data = {
        "last_updated": "01072019", 
        "data_set" : "dog_restaurants", 
        "rest_data" : {"restaurants" : results} 
        }

    return jsonify(dog_json_data)

@app.route("/wc_restaurants_json")
def wc_restaurants_json():
    """Return wc_restaurants json"""
    sel = [
        wc_data.rest_name,
        wc_data.latitude,
        wc_data.longitude,
        wc_data.rest_address,
        wc_data.zip_code, 
        wc_data.website, 
        wc_data.neighborhood
    ]
    # Query
    results = db.session.query(*sel).all()
    
    wc_json_data = {
        "last_updated": "01072019", 
        "data_set" : "wc_restaurants", 
        "rest_data" : {"restaurants" : results} 
        }
        
    return jsonify(wc_json_data)

@app.route("/both_restaurants_json")
def both_restaurants_json():
    """Return both_restaurants json"""
    sel = [
        both_data.rest_name,
        both_data.latitude,
        both_data.longitude,
        both_data.rest_address,
        both_data.zip_code, 
        both_data.website, 
        both_data.neighborhood
    ]
    # Query
    results = db.session.query(*sel).all()
    
    both_json_data = {
        "last_updated": "01072019", 
        "data_set" : "both_restaurants", 
        "rest_data" : {"restaurants" : results} 
        }
        
    return jsonify(both_json_data)

@app.route("/both_restaurants_geojson")
def both_restaurants_geojson():
    """Return both_restaurants geojson"""
    sel = [
        both_data.rest_name,
        both_data.latitude,
        both_data.longitude,
        both_data.rest_address,
        both_data.zip_code, 
        both_data.website, 
        both_data.neighborhood
    ]
    # Query
    results = db.session.query(*sel).all()
    
    features_list = []

    for result in results:
        latitude = result.latitude
        longitude = result.longitude
        neighborhood = result.neighborhood
        rest_address = result.rest_address
        rest_name = result.rest_name
        website = result.website
        zip_code = result.zip_code
        
        dictionary = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates":  [longitude, latitude ]
                },
            "properties": {
                "name": rest_name,
                "address": rest_address,
                "zip_code": zip_code,
                "website": website,
                "neighborhood": neighborhood}
        }

        features_list.append(dictionary)    

    both_geojson_data = {
        "type": "FeatureCollection",
        "features": features_list
    }
        
    return jsonify(both_geojson_data)

if __name__ == '__main__':
    app.run(debug=True)
