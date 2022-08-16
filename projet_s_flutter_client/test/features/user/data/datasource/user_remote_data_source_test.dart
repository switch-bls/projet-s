import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:projet_s/features/user/data/datasources/user_remote_data_source.dart';
import 'package:http/http.dart' as http;
import 'package:projet_s/features/user/domain/entities/user.dart';

import '../../../../fixtures/fixture_reader.dart';

class MockHttpClient extends Mock implements http.Client {}

void main() {
  late UserRemoteDataSourceImpl dataSource;
  late MockHttpClient mockHttpClient;

  setUp(() {
    mockHttpClient = MockHttpClient();
    dataSource = UserRemoteDataSourceImpl(client: mockHttpClient);
  });

  group('getAllUser', () {
    const alice = User(
      firstname: "Alice",
      lastname: "Martin",
      email: "alice.m@mail.com",
      pseudo: "alice50",
    );

    const bob = User(
      firstname: "Bob",
      lastname: "Dupont",
      email: "bobybob@mail.com",
      pseudo: "boby40",
    );

    const tUserModelList = <User>[alice, bob];

    test(
      'should preform a GET request on a URL with number being the endpoint and with application/json header',
      () async* {
        //arrange
        when(mockHttpClient.get(
          Uri(
              scheme: 'http',
              host: '192.168.1.48',
              port: 5000,
              path: 'user/all'),
          headers: {'Content-Type': 'application/json'},
        )).thenAnswer(
          (_) async => http.Response(fixture('user_list.json'), 200),
        );
        // act
        dataSource.getAllUser();
        // assert
        verify(mockHttpClient.get(
          Uri(
              scheme: 'http',
              host: '192.168.1.48',
              port: 5000,
              path: 'user/all'),
          headers: {'Content-Type': 'application/json'},
        ));
      },
    );
  });
}
