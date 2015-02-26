package com.bos.workout.exception;

/**
 * TODO JavaDoc needs to written.
 *
 * @author boss
 */
public class WorkoutCategoryNotFoundException extends RuntimeException {

    public WorkoutCategoryNotFoundException(String id) {
        super(String.format("No workout type entry found with id: <%s>", id));
    }
}
