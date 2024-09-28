import 'dart:async';
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'dart:convert';

import 'package:new_photo_app/send.dart'; // For base64 encoding

void main() async {
  // Ensure that plugin services are initialized.
  WidgetsFlutterBinding.ensureInitialized();

  // Obtain a list of available cameras on the device.
  final cameras = await availableCameras();

  // Get the first camera from the list.
  final firstCamera = cameras.first;

  runApp(MyApp(camera: firstCamera));
}

class MyApp extends StatelessWidget {
  final CameraDescription camera;

  const MyApp({Key? key, required this.camera}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Countdown Camera App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: TakePictureScreen(camera: camera),
    );
  }
}

class TakePictureScreen extends StatefulWidget {
  final CameraDescription camera;

  const TakePictureScreen({Key? key, required this.camera}) : super(key: key);

  @override
  _TakePictureScreenState createState() => _TakePictureScreenState();
}

class _TakePictureScreenState extends State<TakePictureScreen> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;
  String? _imagePath;
  TextEditingController _serverUrlController = TextEditingController();
  TextEditingController _countdownController = TextEditingController();
  bool _isCountingDown = false;

  @override
  void initState() {
    super.initState();
    // Initialize the camera controller and future.
    _controller = CameraController(
      widget.camera,
      ResolutionPreset.medium,
    );
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Dispose the camera controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }

  Future<void> _takePicture() async {
    try {
      // Ensure that the camera is initialized.
      await _initializeControllerFuture;

      // Attempt to take a picture and get the file path.
      final image = await _controller.takePicture();

      //  convert image to base64
      final bytes = await image.readAsBytes();  
      final base64Image = base64Encode(bytes);

      // initialize server connection
      final serverUrl = _serverUrlController.text;
      
      sendImage(base64Image, serverUrl);

      setState(() {
        _imagePath = image.path;
      });
    } catch (e) {
      print(e);
    }
  }

  void _startCountdownAndTakePicture(int seconds) {
    setState(() {
      _isCountingDown = true;
    });

    Timer(Duration(seconds: seconds), () {
      setState(() {
        _isCountingDown = false;
      });
      _takePicture();
    });
  }

  void _resetCamera() {
    setState(() {
      _imagePath = null;
      _initializeControllerFuture = _controller.initialize();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Countdown Camera')),
      body: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _countdownController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Enter countdown in seconds',
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _serverUrlController,
              keyboardType: TextInputType.text,
              decoration: const InputDecoration(
                labelText: 'Enter server URL',
              ),
            ),
          ),
          Expanded(
            child: _imagePath == null
                ? FutureBuilder<void>(
                    future: _initializeControllerFuture,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.done) {
                        // If the Future is complete, display the camera preview.
                        return AspectRatio(
                          aspectRatio: _controller.value.aspectRatio,
                          child: CameraPreview(_controller),
                        );
                      } else {
                        // Otherwise, display a loading indicator.
                        return const Center(child: CircularProgressIndicator());
                      }
                    },
                  )
                : Image.file(
                    File(_imagePath!),
                    fit: BoxFit.cover,
                  ),
          ),
          _imagePath == null
              ? ElevatedButton(
                  onPressed: _isCountingDown
                      ? null
                      : () {
                          final int? countdownTime =
                              int.tryParse(_countdownController.text);
                          if (countdownTime != null && countdownTime > 0) {
                            _startCountdownAndTakePicture(countdownTime);
                          } else {
                            // Invalid input handling.
                            ScaffoldMessenger.of(context)
                                .showSnackBar(const SnackBar(
                              content: Text('Please enter a valid number'),
                            ));
                          }
                        },
                  child: Text(
                      _isCountingDown ? 'Counting Down...' : 'Start Timer'),
                )
              : ElevatedButton(
                  onPressed: _resetCamera,
                  child: const Text('Retake Picture'),
                ),
        ],
      ),
    );
  }
}
