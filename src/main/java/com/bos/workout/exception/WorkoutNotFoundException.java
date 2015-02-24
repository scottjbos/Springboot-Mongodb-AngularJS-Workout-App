package com.bos.workout.exception;

/**
 * TODO JavaDoc needs to written.
 *
 * @author boss
 */
public class WorkoutNotFoundException extends RuntimeException {

    public WorkoutNotFoundException(String id) {
        super(String.format("No workout entry found with id: <%s>", id));
    }
}
