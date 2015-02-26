package com.bos.workout.model;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.springframework.data.annotation.Id;

import java.util.List;

/**
 * Model representing a work out type of a category.  Such as Sprinting or Long Distance.
 *
 * @author boss
 */
public class WorkoutType {

    @Id
    private Long id;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
