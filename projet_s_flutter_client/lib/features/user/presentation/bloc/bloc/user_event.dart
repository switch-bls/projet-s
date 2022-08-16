part of 'user_bloc.dart';

abstract class UserEvent extends Equatable {
  const UserEvent([List props = const <dynamic>[]]);

  @override
  List<Object> get props => [];
}

class GetAllUserEvent extends UserEvent {}
