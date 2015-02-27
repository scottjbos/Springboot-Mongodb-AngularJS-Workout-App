package com.bos.workout.repository;

import com.bos.workout.model.WorkoutType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * TODO JavaDoc needs to written.
 *
 * @author boss
 */
@RepositoryRestResource
public interface WorkoutTypeRepository extends MongoRepository<WorkoutType, String> {
}
