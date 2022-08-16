part of 'user_bloc.dart';

abstract class UserState extends Equatable {
  const UserState([List props = const <dynamic>[]]) : super();

  @override
  List<Object> get props => [];
}

class Empty extends UserState {}

class Loading extends UserState {}

class Loaded extends UserState {
  final List<User> userList;

  const Loaded({required this.userList});
}

class Error extends UserState {
  final String message;

  Error({required this.message}) : super([message]);
}
