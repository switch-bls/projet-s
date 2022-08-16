import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:projet_s/features/user/data/models/user_model.dart';
import 'package:projet_s/features/user/domain/entities/user.dart';

import '../../../../fixtures/fixture_reader.dart';

void main() {
  const tUserModel = UserModel(
    firstname: "Alice",
    lastname: "Dupont",
    email: "alice.d@mail.com",
    pseudo: "alice50",
  );

  test("Should be a subclass of User entity", () async {
    expect(tUserModel, isA<User>());
  });

  group("from Json", () {
    test('Should return a valid model from Json', () async {
      final Map<String, dynamic> jsonMap =
          jsonDecode(fixture('user_alice.json'));
      final result = UserModel.fromJson(jsonMap);

      expect(result, tUserModel);
    });
  });

  group('toJson', () {
    test(
      'should return a JSON map containing the proper data',
      () async {
        // act
        final result = tUserModel.toJson();
        // assert
        final Map<String, dynamic> expectedJsonMap =
            jsonDecode(fixture('user_alice.json'));

        expect(result, expectedJsonMap);
      },
    );
  });
}
