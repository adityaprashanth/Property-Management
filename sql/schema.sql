-- =====================================================
-- Property Management System - Schema
-- =====================================================

CREATE DATABASE IF NOT EXISTS property_management;
USE property_management;

-- =====================================================
-- 1. PROPERTY TABLE
-- (created first since customer references it)
-- =====================================================
CREATE TABLE property (
    pid INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    last_updated_by VARCHAR(100),
    last_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. CUSTOMER TABLE
-- =====================================================
CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50),
    address VARCHAR(255),
    phone_no VARCHAR(15),
    docs VARCHAR(255),
    approved BOOLEAN DEFAULT FALSE,
    advance DECIMAL(12,2) DEFAULT 0,
    till_date_money DECIMAL(12,2) DEFAULT 0,
    how_paid VARCHAR(50),
    pid INT,
    FOREIGN KEY (pid) REFERENCES property(pid)
);

-- =====================================================
-- 3. USER TABLE (login credentials)
-- =====================================================
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,   -- store encrypted/hashed password
    last_updated_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- =====================================================
-- 4. METADATA TABLE (units of measure)
-- =====================================================
CREATE TABLE metadata_units (
    item_name VARCHAR(50) PRIMARY KEY,
    unit_of_measure VARCHAR(50) NOT NULL
);

-- =====================================================
-- 5. PHOTOS TABLE
-- =====================================================
CREATE TABLE photos (
    phid INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    type VARCHAR(50),
    last_updated_by VARCHAR(100),
    last_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    print BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- =====================================================
-- 6. DOCS TABLE
-- =====================================================
CREATE TABLE docs (
    docid INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    doc_type VARCHAR(50),
    doc_remarks VARCHAR(255),
    last_updated_by VARCHAR(100),
    last_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- =====================================================
-- 7. STAGE TABLE
-- =====================================================
CREATE TABLE stage (
    stage_id INT AUTO_INCREMENT PRIMARY KEY,
    stage_name VARCHAR(100) NOT NULL,
    last_updated_by VARCHAR(100),
    last_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 8. ELECTRICALS TABLE
-- =====================================================
CREATE TABLE electricals (
    electrical_id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    measurement VARCHAR(50),
    last_updated_by VARCHAR(100),
    last_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 9. PLUMBING TABLE
-- =====================================================
CREATE TABLE plumbing (
    plumbing_id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    measurement VARCHAR(50),
    last_updated_by VARCHAR(100),
    last_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 10. PAYMENT TABLE
-- =====================================================
CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    type ENUM('Advance','1st Installment','2nd Installment','3rd Installment',
              '4th Installment','5th Installment','6th Installment',
              '7th Installment','8th Installment','9th Installment','10th Installment'),
    way ENUM('PhonePe','Cheque','Online','Cash'),
    amount DECIMAL(12,2),
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);
