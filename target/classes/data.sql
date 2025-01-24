-- Insert test users
INSERT INTO users (user_id, username, email) VALUES (1, 'john_doe', 'john@example.com');
INSERT INTO users (user_id, username, email) VALUES (2, 'jane_doe', 'jane@example.com');

-- Insert test tickets
--INSERT INTO tickets (ticket_id, user_id, subject, description, priority, status, created_at, updated_at, assigned_to, sla_due_date) 
--VALUES (1, 1, 'Login Issue', 'User cannot log in to the system.', 'High', 'Open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, DATEADD('DAY', 2, CURRENT_TIMESTAMP));

--INSERT INTO tickets (ticket_id, user_id, subject, description, priority, status, created_at, updated_at, assigned_to, sla_due_date) 
--VALUES (2, 2, 'Payment Failure', 'Payment gateway not responding.', 'Low', 'In_Progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, DATEADD('DAY', 1, CURRENT_TIMESTAMP));

--INSERT INTO tickets (ticket_id, user_id, subject, description, priority, status, created_at, updated_at, assigned_to, sla_due_date) 
--VALUES (3, 1, 'Bug in Dashboard', 'Dashboard graphs not loading.', 'Medium', 'Resolved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, DATEADD('DAY', 3, CURRENT_TIMESTAMP));
