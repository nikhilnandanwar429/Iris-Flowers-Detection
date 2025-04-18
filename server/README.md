# Iris Classification API

A Flask-based API for Iris flower classification using machine learning.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with the following variables:
```
PORT=5000
FLASK_DEBUG=False
FLASK_ENV=production
```

## Running the Server

### Development
```bash
python app.py
```

### Production
```bash
gunicorn app:app
```

## API Endpoints

### Health Check
- GET `/health`
- Returns server status

### Prediction
- POST `/predict`
- Request body:
```json
{
    "a": 5.1,
    "b": 3.5,
    "c": 1.4,
    "d": 0.2
}
```
- Returns prediction (0, 1, or 2)

## Deployment

The application is configured for deployment with:
- Gunicorn as the WSGI server
- Environment-based configuration
- CORS enabled
- Proper error handling

### Render Deployment
For Render deployment, use the following start command:
```bash
gunicorn app:app
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `FLASK_DEBUG`: Debug mode (default: False)
- `FLASK_ENV`: Environment (default: production)
