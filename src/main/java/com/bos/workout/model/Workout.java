package com.bos.workout.model;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.springframework.data.annotation.Id;

/**
 * Model representing a work out.
 *
 * @author boss
 */
public class Workout {

    @Id
    private Long id;

    private WorkoutType workoutType;
    private LocalDate date;
    private LocalTime duration;
    private String description;

    private double distance;

    public Workout(Long id, WorkoutType workoutType, LocalDate date, LocalTime duration, String description, double distance) {
        this.id = id;
        this.workoutType = workoutType;
        this.date = date;
        this.duration = duration;
        this.description = description;
        this.distance = distance;
    }

    public Workout() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WorkoutType getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(WorkoutType workoutType) {
        this.workoutType = workoutType;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getDuration() {
        return duration;
    }

    public void setDuration(LocalTime duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }
}
