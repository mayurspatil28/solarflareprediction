#!/usr/bin/env python3
"""
Diagnostic script to check if everything is set up correctly
"""

import sys
import os

print("\n" + "="*60)
print("SOLAR FLARE PREDICTION - SETUP DIAGNOSTIC")
print("="*60 + "\n")

# Check Python version
print("1. Python Version")
print(f"   Python {sys.version}")
if sys.version_info < (3, 8):
    print("   ⚠️  WARNING: Python 3.8+ recommended")
else:
    print("   ✓ OK")

# Check required files
print("\n2. Required Files")
required_files = {
    'sunspots.csv': 'Sunspots dataset',
    'api_server.py': 'Flask API server',
    'requirements.txt': 'Python dependencies',
    'package.json': 'NPM dependencies',
}

for filename, description in required_files.items():
    if os.path.exists(filename):
        size = os.path.getsize(filename)
        print(f"   ✓ {filename} ({size} bytes) - {description}")
    else:
        print(f"   ❌ {filename} MISSING - {description}")

# Check Python dependencies
print("\n3. Python Dependencies")
dependencies = {
    'numpy': 'NumPy',
    'pandas': 'Pandas',
    'sklearn': 'Scikit-learn',
    'tensorflow': 'TensorFlow',
    'flask': 'Flask',
    'flask_cors': 'Flask-CORS',
}

missing = []
for module, name in dependencies.items():
    try:
        __import__(module)
        print(f"   ✓ {name}")
    except ImportError:
        print(f"   ❌ {name} - NOT INSTALLED")
        missing.append(module)

if missing:
    print(f"\n   📦 To install missing packages, run:")
    print(f"      pip install -r requirements.txt")

# Check Node.js and npm
print("\n4. Node.js / NPM")
try:
    import subprocess
    result = subprocess.run(['node', '--version'], capture_output=True, text=True)
    print(f"   ✓ Node.js {result.stdout.strip()}")
except:
    print(f"   ⚠️  Node.js not found in PATH")

try:
    result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
    print(f"   ✓ NPM {result.stdout.strip()}")
except:
    print(f"   ⚠️  NPM not found in PATH")

# Check sunspots.csv content
print("\n5. Dataset Check")
try:
    import pandas as pd
    data = pd.read_csv('sunspots.csv')
    print(f"   ✓ sunspots.csv loaded")
    print(f"   ✓ Rows: {len(data)}")
    print(f"   ✓ Columns: {list(data.columns)}")
    if 'Sunspots' in data.columns:
        print(f"   ✓ 'Sunspots' column found")
        print(f"   ✓ Min value: {data['Sunspots'].min():.2f}")
        print(f"   ✓ Max value: {data['Sunspots'].max():.2f}")
    else:
        print(f"   ❌ 'Sunspots' column not found")
except Exception as e:
    print(f"   ❌ Error loading dataset: {e}")

# Check if lstm_model.h5 exists
print("\n6. Trained Model")
if os.path.exists('lstm_model.h5'):
    size = os.path.getsize('lstm_model.h5')
    print(f"   ✓ lstm_model.h5 exists ({size} bytes)")
    print(f"   ℹ️  Model will be loaded (no training needed)")
else:
    print(f"   ℹ️  lstm_model.h5 not found")
    print(f"   ℹ️  Model will be trained on first run (~1-2 minutes)")

# Summary
print("\n" + "="*60)
print("SETUP SUMMARY")
print("="*60 + "\n")

if not missing:
    print("✓ All dependencies installed")
    print("✓ All required files present")
    print("\n🚀 You're ready to run:")
    print("   Terminal 1: python api_server.py")
    print("   Terminal 2: npm start")
else:
    print(f"❌ Missing {len(missing)} Python package(s)")
    print("   Run: pip install -r requirements.txt")

print("\n")
