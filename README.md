# Real-Time Computer Vision Classification App

A browser-based application that uses machine learning to classify objects in real-time via webcam. Pre-configured for Rock-Paper-Scissors recognition but can be trained to recognize any object.

![Demo](demos/demo.gif)

## Features

- Real-time webcam object classification
- Trainable model with 3 default classes (Rock/Paper/Scissors)
- Customizable classification labels
- Model persistence using browser storage
- Visual notifications for predictions
- Mobile-friendly interface

## Technologies Used

- **TensorFlow.js** - Machine learning library
- **MobileNet** - Pre-trained vision model for feature extraction
- **KNN Classifier** - Custom classification algorithm
- HTML5 Webcam API
- CSS Flexbox for responsive design
- Web Storage API for model persistence

## Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/jorgexe/web-classifier.git
   cd web-classifier
   ```

2. **Serve the application** (required for webcam access):
   - Python 3.x:
     ```bash
     python -m http.server 8000
     ```
   - VS Code: Use Live Server extension

3. **Open in browser**:
   ```
   http://localhost:8000
   ```

4. **Allow webcam access** when prompted

## Usage

### Training the Model
1. **Capture training examples**:
   - Show object to webcam
   - Click appropriate class button:
     - **Rock** 
     - **Paper** 
     - **Scissors** 
   - Capture multiple angles/lighting variations (10-20 examples per class recommended)

2. **Test the model**:
   - Position object in webcam view
   - Model will auto-update predictions every 500ms

3. **Save/Load Model**:
   - Save trained model: Click "Save Model"
   - Load previous model: Click "Load Model"

### Custom Training
To recognize new objects:
1. Modify button labels in `index.html`:
   ```html
   <button onclick="addExample(1)">New Object 1</button>
   ```
2. Update class labels in `script.js`:
   ```javascript
   const classes = ['Untrained', 'New Object 1', 'New Object 2', 'New Object 3'];
   ```

## Key Functions

| Button            | Functionality                          |
|-------------------|----------------------------------------|
| Piedra/Papel/Tijeras | Add training examples for each class |
| Guardar Modelo    | Save model to browser storage         |
| Cargar Modelo     | Load model from browser storage       |

## Browser Support

- Chrome 76+
- Firefox 70+
- Edge 79+
- Safari 13.4+ (with flags enabled)

## Troubleshooting

1. **Webcam not working**:
   - Verify browser permissions
   - Try different browser
   - Check for physical webcam blockers

2. **Low prediction accuracy**:
   - Add more training examples
   - Use varied lighting/angles
   - Clear old model and retrain

