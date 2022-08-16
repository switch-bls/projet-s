import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart';
import 'package:projet_s/core/usecase/usecase.dart';
import '../../../../../core/error/failure.dart';
import '../../../domain/entities/user.dart';
import '../../../domain/usecases/get_all_user.dart';
part 'user_event.dart';
part 'user_state.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  final GetAllUser getAllUser;

  UserBloc(this.getAllUser) : super(Empty()) {
    {
      on<GetAllUserEvent>((event, emit) async {
        if (kDebugMode) {
          print("Get All User Event emitted");
        }
        emit(Loading());
        final failureOrUserList = await getAllUser(NoParams());
        emit(failureOrUserList.fold(
            (failure) => Error(message: _mapFailureToMessage(failure)),
            (userList) => Loaded(userList: userList)));
      });
      if (kDebugMode) {
        print("UserBloc created");
      }
    }
  }

  static const String SERVER_FAILURE_MESSAGE = 'Server Failure';

  String _mapFailureToMessage(Failure failure) {
    switch (failure.runtimeType) {
      case ServerFailure:
        return SERVER_FAILURE_MESSAGE;
      default:
        return 'Unexpected Error';
    }
  }
}
