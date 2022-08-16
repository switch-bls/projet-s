import 'package:get_it/get_it.dart';
import 'package:projet_s/features/user/data/repositories/user_repository_impl.dart';
import 'package:projet_s/features/user/domain/repositories/user_repository.dart';
import 'package:projet_s/features/user/domain/usecases/get_all_user.dart';
import 'package:projet_s/features/user/presentation/bloc/bloc/user_bloc.dart';
import 'package:http/http.dart' as http;
import 'features/user/data/datasources/user_remote_data_source.dart';

final sl = GetIt.instance;

Future<void> init() async {
  sl.registerFactory(() => UserBloc(sl<GetAllUser>()));
  sl.registerLazySingleton(() => GetAllUser(sl<UserRepository>()));
  sl.registerLazySingleton<UserRepository>(
      () => UserRepositoryImpl(sl<UserRemoteDataSource>()));
  sl.registerLazySingleton<UserRemoteDataSource>(
      () => UserRemoteDataSourceImpl(client: sl()));
  sl.registerLazySingleton(() => http.Client());
}
