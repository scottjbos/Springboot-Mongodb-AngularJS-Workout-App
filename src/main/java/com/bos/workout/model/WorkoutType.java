package com.bos.workout.model;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.springframework.data.annotation.Id;

/**
 * Model representing a work out type.
 *
 * @author boss
 */
public class WorkoutType {

    @Id
    private Long workoutTypeId;
    private String description;

    public WorkoutType(Long workoutTypeId, String description) {
        this.workoutTypeId = workoutTypeId;
        this.description = description;
    }

    public WorkoutType() {
    }

    public Long getWorkoutTypeId() {
        return workoutTypeId;
    }

    public void setWorkoutTypeId(Long workoutTypeId) {
        this.workoutTypeId = workoutTypeId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
