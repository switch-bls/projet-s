import 'package:projet_s/core/error/failure.dart';
import 'package:dartz/dartz.dart';
import 'package:projet_s/core/usecase/usecase.dart';

import '../entities/user.dart';
import '../repositories/user_repository.dart';

class GetAllUser extends UseCase<List<User>, NoParams> {
  final UserRepository repository;

  GetAllUser(this.repository);

  @override
  Future<Either<Failure, List<User>>> call(NoParams params) async {
    return await repository.getAllUser();
  }
}
