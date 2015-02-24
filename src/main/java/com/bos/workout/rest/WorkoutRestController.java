package com.bos.workout.rest;

import com.bos.workout.exception.WorkoutTypeNotFoundException;
import com.bos.workout.model.Workout;
import com.bos.workout.model.WorkoutType;
import com.bos.workout.repository.WorkoutRepository;
import com.bos.workout.repository.WorkoutTypeRepository;
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
@RequestMapping("rest/workout")
public class WorkoutRestController {

    @Autowired
    private WorkoutRepository workoutRepository;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    Workout create(@RequestBody @Valid Workout pWorkout) {
        pWorkout.setId(this.workoutRepository.count() + 1);
        return workoutRepository.save(pWorkout);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    void delete(@PathVariable("id") Long id) {
        this.workoutRepository.delete(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    List<Workout> findAll() {
        return this.workoutRepository.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    Workout findById(@PathVariable("id") Long id) {
        return this.workoutRepository.findOne(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    Workout update(@RequestBody @Valid Workout pWorkout) {
        return this.workoutRepository.save(pWorkout);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleTodoNotFound(WorkoutTypeNotFoundException ex) {
    }
}
