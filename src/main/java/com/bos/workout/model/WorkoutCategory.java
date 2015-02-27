package com.bos.workout.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

/**
 * Model representing a work out category, such as Running or Swimming.
 *
 * @author boss
 */
public class WorkoutCategory {

    @Id
    private String id;
    private String description;
    private List<WorkoutType> workoutTypes = new ArrayList<WorkoutType>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<WorkoutType> getWorkoutTypes() {
        return workoutTypes;
    }

    public void setWorkoutTypes(List<WorkoutType> workoutTypes) {
        this.workoutTypes = workoutTypes;
    }
}
