import 'package:projet_s/features/user/data/datasources/user_remote_data_source.dart';
import 'package:projet_s/features/user/domain/entities/user.dart';
import 'package:projet_s/core/error/failure.dart';
import 'package:dartz/dartz.dart';
import 'package:projet_s/features/user/domain/repositories/user_repository.dart';

class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource userRemoteDataSource;

  UserRepositoryImpl(this.userRemoteDataSource);

  @override
  Future<Either<Failure, List<User>>> getAllUser() async {
    final result = await userRemoteDataSource.getAllUser();
    return Right(result);
  }

  @override
  Future<Either<Failure, User>> getCurrentUser() {
    // TODO: implement getCurrentUser
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, User>> loginUser() {
    // TODO: implement loginUser
    throw UnimplementedError();
  }

  @override
  Future<Either<Failure, User>> registerUser(User user) {
    // TODO: implement registerUser
    throw UnimplementedError();
  }
}
