import 'package:flutter/foundation.dart';

import '../models/user_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

abstract class UserRemoteDataSource {
  Future<List<UserModel>> getAllUser();
}

class UserRemoteDataSourceImpl implements UserRemoteDataSource {
  final http.Client client;

  UserRemoteDataSourceImpl({required this.client});

  @override
  Future<List<UserModel>> getAllUser() async {
    final response = await client.get(
      Uri(scheme: 'http', host: '192.168.1.48', port: 5000, path: 'user/all'),
      headers: {'Content-Type': 'application/json'},
    );

    final responseBodyList = json.decode(response.body)["data"];

    if (kDebugMode) {
      print(responseBodyList);
    }

    final userModelList = <UserModel>[];

    responseBodyList
        .forEach((user) => {userModelList.add(UserModel.fromJson(user))});

    return userModelList;
  }
}
