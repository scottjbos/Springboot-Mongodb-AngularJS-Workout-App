package com.bos.workout.user;

import com.bos.workout.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * User Repository
 *
 * @author boss
 */
@RepositoryRestResource
public interface UserRepository extends MongoRepository<User, String> {

    User findOneByUserName(String userName);
}
