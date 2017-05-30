/**
 * script to create database 
 * and all required tables
 */
-- create database
DROP DATABASE IF EXISTS Chaplin01;

CREATE DATABASE Chaplin01;

USE Chaplin01;
-- create device table
CREATE TABLE device
(deviceID CHAR(5)
,alias VARCHAR(30) NOT NULL
,IMEI VARCHAR(25)
,CONSTRAINT pkdevice PRIMARY KEY (deviceID)
);
-- create location table
CREATE TABLE location
(locationID VARCHAR(15)
,deviceID CHAR(5)
,lat DECIMAL(9,6) NOT NULL
,lon DECIMAL(9,6) NOT NULL
,dateNtime DATETIME NOT NULL 
,CONSTRAINT pklocation PRIMARY KEY (locationID)
,CONSTRAINT fklocation FOREIGN KEY (deviceID)
                       REFERENCES device (deviceID)
);