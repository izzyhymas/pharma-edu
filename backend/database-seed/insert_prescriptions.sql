INSERT INTO Prescription (rx_number, patient_id, prescriber_id, prescribed_date, rx_item_id, directions, quantity, quantity_dispensed, refills, status, tech_initials) 
VALUES 
(1, 1, 1, '2024-09-01', 1, 'Take 1 tablet by mouth daily', 30, 30, 3, 'PENDING', 'JD'),
(2, 2, 2, '2024-09-02', 2, 'Take 2 tablets by mouth every 4-6 hours', 60, 60, 0, 'PENDING', 'AS'),
(3, 3, 3, '2024-09-03', 3, 'Take 1 capsule by mouth 3 times daily', 90, 90, 1, 'PENDING', 'MH'),
(4, 4, 4, '2024-09-04', 4, 'Take 1 tablet by mouth twice daily', 60, 60, 2, 'PENDING', 'CB'),
(5, 5, 5, '2024-09-05', 5, 'Take 1 tablet by mouth every morning', 30, 30, 1, 'PENDING', 'DJ'),
(6, 6, 6, '2024-09-06', 6, 'Take 1 tablet by mouth at bedtime', 30, 30, 0, 'PENDING', 'JW'),
(7, 1, 2, '2024-09-07', 1, 'Take 1 tablet by mouth daily', 30, 30, 3, 'PENDING', 'JD'),
(8, 2, 3, '2024-09-08', 2, 'Take 2 tablets by mouth as needed for pain', 40, 40, 0, 'PENDING', 'AS'),
(9, 3, 4, '2024-09-09', 3, 'Take 1 capsule by mouth 3 times daily', 90, 45, 1, 'PENDING', 'MH'),
(10, 4, 5, '2024-09-10', 4, 'Take 1 tablet by mouth every morning', 30, 30, 2, 'PENDING', 'CB');

