import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String firstname;
  final String lastname;
  final String email;
  final String pseudo;

  const User(
      {required this.firstname,
      required this.lastname,
      required this.email,
      required this.pseudo});

  @override
  List<Object?> get props => [firstname, lastname, email, pseudo];
}
