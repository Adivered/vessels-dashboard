let jsonObject = 
[
        {
            "ship_number": 1,
            "ship_name": "The Voyager",
            "serial_number": "SN12345",
            "ship_kind": "Livestock Carriers",
            "captain_name": "John Smith",
            "year_built": 2015,
            "capacity": 50000,
            "current_location": "Los Angeles, United States",
            "coordinates": {
                "latitude": 34.0522,
                "longitude": -118.2437
            },
            "status": "En Route",
            "price": {
                "amount": 120,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Livestock Carriers Ship"
            },
            "cost_per_unit": {
                "amount": 300,
                "currency": "USD",
                "unit": "sheeps/goats",
                "description": "Cost per sheep/goat"
            },
            "purpose": "Transports Livestock and export sheep, cattle, and goats alive.",
            "route": {
                "departure": {
                    "port": "Los Angeles",
                    "country": "United States"
                },
                "destination": {
                    "port": "Shanghai", 
                    "country": "China"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Livestock-Carriers.jpg.webp"
        },
        {
            "ship_number": 2,
            "ship_name": "Oceanic Explorer",
            "serial_number": "SN23456",
            "ship_kind": "Passenger",
            "captain_name": "Sarah Johnson",
            "year_built": 2010,
            "capacity": 3000,
            "current_location": "New York, United States",
            "coordinates": {
                "latitude": 40.7128,
                "longitude": -74.0060
            },
            "status": "Docked",
            "price": {
                "amount": 200,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Passenger Ship"
            },
            "cost_per_unit": {
                "adult": 1500,
                "child": 750,
                "currency": "USD",
                "unit": "passenger",
                "description": "Cost per adult or child passenger"
            },
            "purpose": "Transports passengers on luxury cruises, offering accommodations and amenities for tourists.",
            "route": {
                "departure": {
                    "port": "New York",
                    "country": "United States"
                },
                "destination": {
                    "port": "London",
                    "country": "United Kingdom"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Passenger-Ships.jpg.webp"
        },
        {
            "ship_number": 3,
            "ship_name": "Sea Titan",
            "serial_number": "SN34567",
            "ship_kind": "Container",
            "captain_name": "Michael Brown",
            "year_built": 2018,
            "capacity": 100000,
            "current_location": "Hamburg, Germany",
            "coordinates": {
                "latitude": 53.5511,
                "longitude": 9.9937
            },
            "status": "En Route",
            "price": {
                "amount": 150,
                "currency": "USD",
                "unit": "millions", 
                "description": "Price per Container Ship"
            },
            "cost_per_unit": {
                "amount": 1000,
                "currency": "USD", 
                "unit": "container",
                "description": "Cost per container"
            },
            "purpose": "Carries shipping containers, typically used for transporting goods globally.",
            "route": {
                "departure": {
                    "port": "Hamburg",
                    "country": "Germany"
                },
                "destination": {
                    "port": "Ashdod", 
                    "country": "Israel"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Container-ships.jpg.webp"
        },
        {
            "ship_number": 4,
            "ship_name": "Pacific Spirit",
            "serial_number": "SN45678",
            "ship_kind": "Oil Tanker",
            "captain_name": "Emily Davis",
            "year_built": 2012,
            "capacity": 200000,
            "current_location": "Singapore",
            "coordinates": {
                "latitude": 1.3521,
                "longitude": 103.8198
            },
            "status": "Docked",
            "price": {
                "amount": 250,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Oil Tanker Ship"
            },
            "cost_per_unit": {
                "amount": 100,
                "currency": "USD",
                "unit": "ton",
                "description": "Cost per ton of oil"
            },
            "purpose": "Transports oil in bulk from one port to another, mainly for industrial use.",
            "route": {
                "departure": {
                    "port": "Singapore",
                    "country": "Singapore"
                },
                "destination": {
                    "port": "Rotterdam",
                    "country": "Netherlands"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Tanker-Ships.jpg.webp"
        },
        {
            "ship_number": 5,
            "ship_name": "Aurora Seas",
            "serial_number": "SN56789",
            "ship_kind": "Roll-on Roll-off Ship",
            "captain_name": "Robert Williams", 
            "year_built": 2020,
            "capacity": 2500,
            "current_location": "Miami, United States",
            "coordinates": {
                "latitude": 25.7617,
                "longitude": -80.1918
            },
            "status": "Docked",
            "price": {
                "amount": 180,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Roll-on Roll-off Ship"
            },
            "cost_per_unit": {
                "amount": 500,
                "currency": "USD",
                "unit": "vehicle",
                "description": "Cost per vehicle transported"
            },
            "purpose": "Transports vehicles, such as cars, trucks, and machinery, across oceans, using a roll-on/roll-off mechanism for loading and unloading.",
            "route": {
                "departure": {
                    "port": "Miami",
                    "country": "United States"
                },
                "destination": {
                    "port": "Cozumel",
                    "country": "Mexico"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Roll-on-Roll-Off-Ships.jpg.webp"
        },
        {
            "ship_number": 6,
            "ship_name": "Storm Rider",
            "serial_number": "SN67890",
            "ship_kind": "Dredger",
            "captain_name": "Laura Wilson",
            "year_built": 2017,
            "capacity": 80000,
            "current_location": "Sydney, Australia",
            "coordinates": {
                "latitude": -33.8688,
                "longitude": 151.2093
            },
            "status": "En Route",
            "price": {
                "amount": 110,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Dredger"
            },
            "cost_per_unit": {
                "amount": 600,
                "currency": "USD",
                "unit": "ton",
                "description": "Cost per ton of dredged material"
            },
            "purpose": "Used for dredging operations, often in ports and waterways to maintain navigable depths.",
            "route": {
                "departure": {
                    "port": "Sydney",
                    "country": "Australia"
                },
                "destination": {
                    "port": "Auckland",
                    "country": "New Zealand"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Dredgers.jpg.webp"
        },
        {
            "ship_number": 7,
            "ship_name": "The Phoenix",
            "serial_number": "SN78901",
            "ship_kind": "Gas Carrier Ship",
            "captain_name": "David Miller",
            "year_built": 2014,
            "capacity": 120000,
            "current_location": "Port of New York, United States",
            "coordinates": {
                "latitude": 40.7128,
                "longitude": -74.0060
            },
            "status": "En Route",
            "price": {
                "amount": 220,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Gas Carrier Ship"
            },
            "cost_per_unit": {
                "amount": 800,
                "currency": "USD",
                "unit": "ton",
                "description": "Cost per ton of gas transported"
            },
            "purpose": "Transports liquefied natural gas (LNG) or liquefied petroleum gas (LPG) across oceans, typically in large quantities.",
            "route": {
                "departure": {
                    "port": "Port of New York",
                    "country": "United States"
                },
                "destination": {
                    "port": "Haifa",
                    "country": "Israel"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Gas-Carriers.jpg.webp"
        },
        {
            "ship_number": 8,
            "ship_name": "Atlantic Star",
            "serial_number": "SN89012",
            "ship_kind": "Passenger",
            "captain_name": "Jennifer Moore",
            "year_built": 2019,
            "capacity": 1500,
            "current_location": "Vancouver, Canada",
            "coordinates": {
                "latitude": 49.2827,
                "longitude": -123.1207
            },
            "status": "En Route",
            "price": {
                "amount": 160,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Passenger Ship"
            },
            "cost_per_unit": {
                "adult": 1800,
                "child": 900,
                "currency": "USD",
                "unit": "passenger",
                "description": "Cost per adult or child passenger"
            },
            "purpose": "Luxury passenger transportation on long-distance voyages, offering amenities and entertainment.",
            "route": {
                "departure": {
                    "port": "Vancouver",
                    "country": "Canada"
                },
                "destination": {
                    "port": "Tokyo",
                    "country": "Japan"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Passenger-Ships.jpg.webp"
        },
        {
            "ship_number": 9,
            "ship_name": "Wind Crest",
            "serial_number": "SN90123",
            "ship_kind": "Bulk Carrier Ship",
            "captain_name": "Andrew Clark",
            "year_built": 2022,
            "capacity": 75000,
            "current_location": "Los Angeles, United States",
            "coordinates": {
                "latitude": 34.0522,
                "longitude": -118.2437
            },
            "status": "Docked",
            "price": {
                "amount": 140,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Bulk Carrier Ship"
            },
            "cost_per_unit": {
                "amount": 500,
                "currency": "USD",
                "unit": "ton",
                "description": "Cost per ton of bulk cargo"
            },
            "purpose": "Carries bulk goods such as coal, grains, and minerals across international waters, focusing on bulk transport.",
            "route": {
                "departure": {
                    "port": "Los Angeles",
                    "country": "United States"
                },
                "destination": {
                    "port": "Hong Kong", 
                    "country": "China"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Bulk-Carrier-Ships.jpg.webp"
        },
        {
            "ship_number": 10,
            "ship_name": "Royal Voyager",
            "serial_number": "SN01234",
            "ship_kind": "Luxury Yacht",
            "captain_name": "Samantha Clark",
            "year_built": 2021,
            "capacity": 100,
            "current_location": "Monaco",
            "coordinates": {
                "latitude": 43.7333,
                "longitude": 7.4167
            },
            "status": "Docked",
            "price": {
                "amount": 350,
                "currency": "USD",
                "unit": "millions",
                "description": "Price per Luxury Yacht"
            },
            "cost_per_unit": {
                "amount": 5000,
                "currency": "USD",
                "unit": "passenger",
                "description": "Cost per passenger (adult)"
            },
            "purpose": "Private luxury yacht for wealthy clients, used for exclusive leisure voyages with high-end accommodations.",
            "route": {
                "departure": {
                    "port": "Monaco",
                    "country": "Monaco"
                },
                "destination": {
                    "port": "Barcelona", 
                    "country": "Spain"
                }
            },
            "image": "https://engineeringlearn.com/wp-content/uploads/2022/08/Yacht-1024x576.jpg.webp"
        }
    ]