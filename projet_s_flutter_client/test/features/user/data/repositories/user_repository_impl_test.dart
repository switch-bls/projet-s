import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:projet_s/core/error/exception.dart';
import 'package:projet_s/core/error/failure.dart';
import 'package:projet_s/features/user/data/datasources/user_remote_data_source.dart';
import 'package:projet_s/features/user/data/models/user_model.dart';
import 'package:projet_s/features/user/data/repositories/user_repository_impl.dart';

class MockRemoteDataSource extends Mock implements UserRemoteDataSource {}

void main() {
  late MockRemoteDataSource mockRemoteDataSource;
  late UserRepositoryImpl repository;

  setUp(() {
    mockRemoteDataSource = MockRemoteDataSource();
    repository = UserRepositoryImpl(mockRemoteDataSource);
  });

  group('getAllUser', () {
    const alice = UserModel(
      firstname: "Alice",
      lastname: "Martin",
      email: "alice.m@mail.com",
      pseudo: "alice50",
    );

    const bob = UserModel(
      firstname: "Bob",
      lastname: "Dupont",
      email: "bobybob@mail.com",
      pseudo: "boby40",
    );

    const tUserModelList = <UserModel>[alice, bob];

    test(
      'should return remote data when the call to remote data source is successful',
      () async* {
        // arrange
        when(mockRemoteDataSource.getAllUser())
            .thenAnswer((_) async => tUserModelList);
        // act
        final result = await repository.getAllUser();
        // assert
        verify(mockRemoteDataSource.getAllUser());
        expect(result, equals(const Right(tUserModelList)));
      },
    );

    test(
      'should return server failure when the call to remote data source is unsuccessful',
      () async* {
        // arrange
        when(mockRemoteDataSource.getAllUser()).thenThrow(ServerException());
        // act
        final result = await repository.getAllUser();
        // assert
        verify(mockRemoteDataSource.getAllUser());
        verifyZeroInteractions(mockRemoteDataSource);
        expect(result, equals(Left(ServerFailure())));
      },
    );
  });
}
