package com.bos.workout.rest;

import com.bos.workout.exception.WorkoutCategoryNotFoundException;
import com.bos.workout.model.WorkoutCategory;
import com.bos.workout.repository.WorkoutCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * TODO JavaDoc needs to written.
 *
 * @author boss
 */
@RestController()
@RequestMapping("rest/workout-category")
public class WorkoutCategoryRestController {

    @Autowired
    private WorkoutCategoryRepository workoutCategoryRepository;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    WorkoutCategory create(@RequestBody @Valid WorkoutCategory pWorkoutCategory) {
        pWorkoutCategory.setId(this.workoutCategoryRepository.count() + 1);
        return workoutCategoryRepository.save(pWorkoutCategory);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    void delete(@PathVariable("id") Long id) {
        this.workoutCategoryRepository.delete(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    List<WorkoutCategory> findAll() {
        return workoutCategoryRepository.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    WorkoutCategory findById(@PathVariable("id") Long id) {
        return workoutCategoryRepository.findOne(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    WorkoutCategory update(@RequestBody @Valid WorkoutCategory pWorkoutCategory) {
        return workoutCategoryRepository.save(pWorkoutCategory);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleTodoNotFound(WorkoutCategoryNotFoundException ex) {
    }
}
