-- Inserting sample data into users table
INSERT INTO users (user_id, username, email, role, phone, password_hash, created_at, updated_at) VALUES
(1, 'john_doe', 'john.doe@example.com', 'CUSTOMER', '1234567890', 'hashed_password_1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'jane_smith', 'jane.smith@example.com', 'TECHNICIAN', '0987654321', 'hashed_password_2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

--inserting sample data into service table
INSERT INTO services (service_id, name, description) VALUES
(1, 'VPN', 'This is vpn service'),
(2, 'EMAIL', 'This is email service');

-- Inserting sample data into tickets table
INSERT INTO tickets (ticket_id, user_id, subject, description, priority, status, created_at, updated_at, assigned_to, sla_due_date, service_id) VALUES
(1, 1, 'Issue with login', 'Unable to login with my credentials', 'HIGH', 'OPEN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, CURRENT_TIMESTAMP, 1),
(2, 2, 'Feature request', 'Request to add a new feature to the application', 'MEDIUM', 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 2);
