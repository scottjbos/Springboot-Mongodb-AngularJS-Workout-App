package com.bos.workout.model;

import org.springframework.data.annotation.Id;

/**
 * Created by Scott on 3/21/2015.
 */
public class StrengthExercise {
    @Id
    private String id;

    private String exercise;

    private Integer reps;

    private Integer sets;

    private boolean maxOut;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getExercise() {
        return exercise;
    }

    public void setExercise(String exercise) {
        this.exercise = exercise;
    }

    public Integer getReps() {
        return reps;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public Integer getSets() {
        return sets;
    }

    public void setSets(Integer sets) {
        this.sets = sets;
    }

    public boolean isMaxOut() {
        return maxOut;
    }

    public void setMaxOut(boolean maxOut) {
        this.maxOut = maxOut;
    }
}
