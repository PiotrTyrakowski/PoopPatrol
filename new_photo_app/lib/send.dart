import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> sendImage(String base64Image, String serverUrl) async {
  // final url = Uri.parse('http://your-server-url/api/upload'); // Replace with your server URL
  final url = Uri.parse(serverUrl); // Replace with your server URL


  try {
    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'img': base64Image}),
    );

    if (response.statusCode == 200) {
      // Handle success
      print('Image sent successfully: ${response.body}');
    } else {
      // Handle error
      print('Failed to send image: ${response.body}');
      print('Status code: ${response.statusCode}');
    }
  } catch (error) {
    print('Error: $error');
  }
}
