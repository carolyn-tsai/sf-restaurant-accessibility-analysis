CREATE TABLE wheelchair_rest_neighborhoods (
    rest_name VARCHAR(500),
    latitude VARCHAR(50),
    longitude VARCHAR(50),
    rest_address VARCHAR(5000),
    zip_code VARCHAR(50),
    website VARCHAR(5000),
    neighborhood VARCHAR(5000)
    );
CREATE TABLE dog_rest_neighborhoods (
    rest_name VARCHAR(50),
    latitude VARCHAR(50),
    longitude VARCHAR(50),
    rest_address VARCHAR(5000),
    zip_code VARCHAR(50),
    website VARCHAR(5000),
    neighborhood VARCHAR(5000)
    );
CREATE TABLE both_wheelchair_dog_rest_neighborhoods (
    rest_name VARCHAR(500),
    latitude VARCHAR(50),
    longitude VARCHAR(50),
    rest_address VARCHAR(5000),
    zip_code VARCHAR(50),
    website VARCHAR(5000),
    neighborhood VARCHAR(5000)
    );
SELECT * FROM both_wheelchair_dog_rest_neighborhoods
SELECT * FROM dog_rest_neighborhoods
SELECT * FROM wheelchair_rest_neighborhoods

	
	