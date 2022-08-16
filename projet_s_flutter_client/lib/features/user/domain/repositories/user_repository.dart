import 'dart:async';
import 'dart:core';

import 'package:dartz/dartz.dart';

import '../../../../core/error/failure.dart';
import '../entities/user.dart';

abstract class UserRepository {
  Future<Either<Failure, List<User>>> getAllUser();
  Future<Either<Failure, User>> getCurrentUser();
  Future<Either<Failure, User>> registerUser(User user);
  Future<Either<Failure, User>> loginUser();
}
