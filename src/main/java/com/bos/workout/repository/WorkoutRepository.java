package com.bos.workout.repository;

import com.bos.workout.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * TODO JavaDoc needs to written.
 *
 * @author boss
 */
public interface WorkoutRepository extends MongoRepository<Workout, String> {
}
