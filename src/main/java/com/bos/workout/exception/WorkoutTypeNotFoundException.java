package com.bos.workout.exception;

/**
 * TODO JavaDoc needs to written.
 *
 * @author boss
 */
public class WorkoutTypeNotFoundException extends RuntimeException {

    public WorkoutTypeNotFoundException(String id) {
        super(String.format("No workout type entry found with id: <%s>", id));
    }
}
