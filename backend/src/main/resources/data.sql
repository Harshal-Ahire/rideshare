-- Mock Rider
INSERT INTO users (email, name, role, rating, total_rides, created_at)
VALUES ('user@example.com', 'Tanmay Singh', 'RIDER', 4.8, 15, NOW())
ON CONFLICT (email) DO NOTHING;

-- Mock Drivers (Mumbai-based)
INSERT INTO users (email, name, role, rating, total_rides, created_at)
VALUES ('driver1@rideshare.com', 'Rahul Jha', 'DRIVER', 4.94, 124, NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, name, role, rating, total_rides, created_at)
VALUES ('driver2@rideshare.com', 'Amit Sharma', 'DRIVER', 4.72, 89, NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, name, role, rating, total_rides, created_at)
VALUES ('driver3@rideshare.com', 'Priya Patel', 'DRIVER', 4.95, 67, NOW())
ON CONFLICT (email) DO NOTHING;