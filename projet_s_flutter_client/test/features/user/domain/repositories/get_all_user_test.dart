import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:projet_s/core/usecase/usecase.dart';
import 'package:projet_s/features/user/domain/entities/user.dart';
import 'package:projet_s/features/user/domain/repositories/user_repository.dart';
import 'package:projet_s/features/user/domain/usecases/get_all_user.dart';

class MockUserRepository extends Mock implements UserRepository {}

void main() {
  late GetAllUser usecase;
  late MockUserRepository mockUserRepository;

  setUp(() {
    mockUserRepository = MockUserRepository();
    usecase = GetAllUser(mockUserRepository);
  });

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

  const userList = <User>[alice, bob];
  test("Should get a list of User from the repository", () async* {
    when(mockUserRepository.getAllUser())
        .thenAnswer((_) async => const Right(userList));

    final result = await usecase(NoParams());

    expect(result, const Right(userList));

    verify(mockUserRepository.getAllUser());

    verifyNoMoreInteractions(mockUserRepository);
  });
}
