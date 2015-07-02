package com.bos.workout.user;

/**
 * Created by Scott on 7/1/2015.
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String id) {
        super(String.format("No workout type entry found with id: <%s>", id));
    }
}
