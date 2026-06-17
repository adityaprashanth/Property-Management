-- =====================================================
-- Property Management System - Seed/Test Data
-- =====================================================
USE property_management;

-- Property
INSERT INTO property (address, last_updated_by, created_by)
VALUES
('123 MG Road, Bengaluru', 'admin', 'admin'),
('45 Indiranagar, Bengaluru', 'admin', 'admin');

-- Customer
INSERT INTO customer (firstname, lastname, address, phone_no, docs, approved, advance, till_date_money, how_paid, pid)
VALUES
('Ravi', 'Kumar', '123 MG Road, Bengaluru', '9876543210', 'aadhar.pdf', TRUE, 50000.00, 150000.00, 'Online', 1),
('Anita', 'Sharma', '45 Indiranagar, Bengaluru', '9876512345', 'pan.pdf', FALSE, 20000.00, 20000.00, 'Cash', 2);

-- User (note: replace with real hashed passwords in app, this is just placeholder)
INSERT INTO user (password, last_updated_by, created_by, customer_id)
VALUES
('$2b$10$examplehashedpassword1', 'admin', 'admin', 1),
('$2b$10$examplehashedpassword2', 'admin', 'admin', 2);

-- Metadata units of measure
INSERT INTO metadata_units (item_name, unit_of_measure)
VALUES
('Cement', 'Bags'),
('Iron', 'Tons/Kg'),
('M-Sand', 'Truck'),
('Jelly', 'Truck'),
('Wood', 'Square Meter'),
('Bricks', 'Number');

-- Photos
INSERT INTO photos (customer_id, type, last_updated_by, created_by, print)
VALUES
(1, 'Foundation', 'contractor1', 'contractor1', FALSE),
(2, 'Plan Layout', 'contractor2', 'contractor2', TRUE);

-- Docs
INSERT INTO docs (customer_id, doc_type, doc_remarks, last_updated_by, created_by)
VALUES
(1, 'Aadhar Card', 'Verified', 'admin', 'admin'),
(2, 'PAN Card', 'Pending verification', 'admin', 'admin');

-- Payment
INSERT INTO payment (customer_id, type, way, amount, last_updated_by, created_by)
VALUES
(1, 'Advance', 'Online', 50000.00, 'admin', 'admin'),
(1, '1st Installment', 'Cheque', 100000.00, 'admin', 'admin'),
(2, 'Advance', 'Cash', 20000.00, 'admin', 'admin');

-- Stage
INSERT INTO stage (stage_name, last_updated_by, created_by)
VALUES
('Foundation', 'admin', 'admin'),
('Framing', 'admin', 'admin'),
('Roofing', 'admin', 'admin'),
('Interior Finishing', 'admin', 'admin'),
('Final Inspection', 'admin', 'admin');

-- Electricals
INSERT INTO electricals (type, measurement, last_updated_by, created_by)
VALUES
('Wiring', 'Meters', 'contractor1', 'admin'),
('Switchboard', 'Number', 'contractor1', 'admin');

-- Plumbing
INSERT INTO plumbing (type, measurement, last_updated_by, created_by)
VALUES
('Water Pipe', 'Meters', 'contractor2', 'admin'),
('Drainage Pipe', 'Meters', 'contractor2', 'admin');
