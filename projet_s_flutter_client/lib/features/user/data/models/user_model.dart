import '../../domain/entities/user.dart';

class UserModel extends User {
  const UserModel(
      {required super.firstname,
      required super.lastname,
      required super.email,
      required super.pseudo});

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      firstname: json['firstname'],
      lastname: json['lastname'],
      email: json['email'],
      pseudo: json['pseudo'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'pseudo': pseudo
    };
  }
}
