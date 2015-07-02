package com.bos.workout.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Model representing a work out.
 *
 * @author boss
 */
public class Workout {

    @Id
    private String id;

    private WorkoutCategory workoutCategory;
    private WorkoutType workoutType;

    private Date date;
    private String duration;
    private Integer distance;
    private String description;

    private List<StrengthExercise> strengthExercises = new ArrayList<StrengthExercise>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public WorkoutCategory getWorkoutCategory() {
        return workoutCategory;
    }

    public void setWorkoutCategory(WorkoutCategory workoutCategory) {
        this.workoutCategory = workoutCategory;
    }

    public WorkoutType getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(WorkoutType workoutType) {
        this.workoutType = workoutType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<StrengthExercise> getStrengthExercises() {
        return strengthExercises;
    }

    public void setStrengthExercises(List<StrengthExercise> strengthExercises) {
        this.strengthExercises = strengthExercises;
    }
}
