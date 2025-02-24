/* eslint-disable no-undef */
let net;
let webcam;
const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');
const notification = document.getElementById('notification');

async function app() {
  console.log('Loading image recognition model...');
  net = await mobilenet.load();
  console.log('Model loaded successfully!');

  // Get webcam data
  webcam = await tf.data.webcam(webcamElement);

  // Process webcam images in real-time
  while (true) {
    const img = await webcam.capture();

    // Perform inference and predict with the classifier
    const activation = net.infer(img, 'conv_preds');
    let result2;
    try {
      result2 = await classifier.predictClass(activation);
    } catch (error) {
      result2 = {};
    }

    // Define classes for Rock-Paper-Scissors
    const classes = ['Untrained', 'Rock', 'Paper', 'Scissors'];

    // Display classifier prediction
    try {
      const label = classes[result2.label];
      const probability = result2.confidences[result2.label] || 0;
      document.getElementById('console2').innerText = `
        Prediction: ${label}\n
        Confidence: ${(probability * 100).toFixed(2)}%
      `;

      // Show notifications based on prediction
      if (label === 'Rock') {
        showNotification('Rock detected!', 'success');
      } else if (label === 'Paper') {
        showNotification('Paper detected!', 'success');
      } else if (label === 'Scissors') {
        showNotification('Scissors detected!', 'success');
      } else {
        hideNotification();
      }
    } catch (error) {
      document.getElementById('console2').innerText = 'Model not trained yet';
      hideNotification();
    }

    // Dispose of the tensor to free memory
    img.dispose();

    // Wait for the next frame
    await tf.nextFrame();
  }
}

// Function to add training examples to the classifier
async function addExample(classId) {
  const img = await webcam.capture();
  const activation = net.infer(img, true);
  classifier.addExample(activation, classId);
  img.dispose();
}

// Function to show notifications
function showNotification(message, type) {
  notification.innerText = message;
  notification.className = type;
}

// Function to hide notifications
function hideNotification() {
  notification.className = 'hidden';
}

// Function to save the classifier to localStorage
const saveKnn = async () => {
  const strClassifier = JSON.stringify(
    Object.entries(classifier.getClassifierDataset()).map(([label, data]) => [
      label,
      Array.from(data.dataSync()),
      data.shape,
    ])
  );
  const storageKey = 'knnClassifier';
  localStorage.setItem(storageKey, strClassifier);
};

// Function to load the classifier from localStorage
const loadKnn = async () => {
  const storageKey = 'knnClassifier';
  const datasetJson = localStorage.getItem(storageKey);
  classifier.setClassifierDataset(
    Object.fromEntries(
      JSON.parse(datasetJson).map(([label, data, shape]) => [
        label,
        tf.tensor(data, shape),
      ])
    )
  );
};

app();