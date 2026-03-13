#!/usr/bin/env python
"""
Simple API test script
Run after starting the server to verify endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    response = requests.get(f"{BASE_URL}/health")
    print(f"Health Check: {response.json()}")
    return response.status_code == 200

def test_register():
    data = {
        "email": "testuser@example.com",
        "password": "testpassword123"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=data)
    print(f"Register: {response.status_code}")
    if response.status_code == 201:
        print(f"User created: {response.json()}")
        return True
    elif response.status_code == 400:
        print("User already exists")
        return True
    return False

def test_login():
    data = {
        "email": "testuser@example.com",
        "password": "testpassword123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=data)
    print(f"Login: {response.status_code}")
    if response.status_code == 200:
        token = response.json()["access_token"]
        print(f"Token received: {token[:20]}...")
        return token
    return None

def test_create_event(token):
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "title": "Test Event",
        "date": "2026-12-31",
        "city": "Test City",
        "guest_count": 50
    }
    response = requests.post(f"{BASE_URL}/events", json=data, headers=headers)
    print(f"Create Event: {response.status_code}")
    if response.status_code == 201:
        event = response.json()
        print(f"Event created: {event}")
        return event["id"]
    return None

def test_get_events(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/events", headers=headers)
    print(f"Get Events: {response.status_code}")
    if response.status_code == 200:
        events = response.json()
        print(f"Found {len(events)} events")
        return True
    return False

if __name__ == "__main__":
    print("=" * 50)
    print("Testing Event Management API")
    print("=" * 50)
    
    print("\n1. Testing health endpoint...")
    if not test_health():
        print("❌ Health check failed!")
        exit(1)
    print("✅ Health check passed")
    
    print("\n2. Testing user registration...")
    if not test_register():
        print("❌ Registration failed!")
        exit(1)
    print("✅ Registration passed")
    
    print("\n3. Testing login...")
    token = test_login()
    if not token:
        print("❌ Login failed!")
        exit(1)
    print("✅ Login passed")
    
    print("\n4. Testing event creation...")
    event_id = test_create_event(token)
    if not event_id:
        print("❌ Event creation failed!")
        exit(1)
    print("✅ Event creation passed")
    
    print("\n5. Testing get events...")
    if not test_get_events(token):
        print("❌ Get events failed!")
        exit(1)
    print("✅ Get events passed")
    
    print("\n" + "=" * 50)
    print("✅ All tests passed!")
    print("=" * 50)
