package com.bos.workout.rest;

import com.bos.workout.exception.WorkoutTypeNotFoundException;
import com.bos.workout.model.WorkoutType;
import com.bos.workout.repository.WorkoutTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
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
@RequestMapping("rest/workout-type")
public class WorkoutTypeRestController  {

    @Autowired
    private WorkoutTypeRepository workoutTypeRepository;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    WorkoutType create(@RequestBody @Valid WorkoutType pWorkoutType) {
        WorkoutType workoutType = new WorkoutType(this.workoutTypeRepository.count() + 1, pWorkoutType.getDescription());
        return workoutTypeRepository.save(workoutType);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    void delete(@PathVariable("id") Long id) {
        this.workoutTypeRepository.delete(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    List<WorkoutType> findAll() {
        return workoutTypeRepository.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    WorkoutType findById(@PathVariable("id") Long id) {
        return workoutTypeRepository.findOne(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    WorkoutType update(@RequestBody @Valid WorkoutType pWorkoutType) {
        return workoutTypeRepository.save(pWorkoutType);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleTodoNotFound(WorkoutTypeNotFoundException ex) {
    }
}
