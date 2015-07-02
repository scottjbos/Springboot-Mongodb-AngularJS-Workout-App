package com.bos.workout.user;

import com.bos.workout.exception.WorkoutCategoryNotFoundException;
import com.bos.workout.model.Workout;
import com.bos.workout.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Rest controller for {@link Workout}s.
 * @author boss
 */
@RestController()
@RequestMapping("rest/user")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    User create(@RequestBody @Valid User pUser) {
        return userRepository.save(pUser);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    void delete(@PathVariable("id") String id) {
        this.userRepository.delete(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    List<User> findAll() {
        return this.userRepository.findAll();
    }

    @RequestMapping(value = "{userName}", method = RequestMethod.GET)
    User findByUserName(@PathVariable("userName") String userName) {
        return this.userRepository.findOneByUserName(userName);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    User update(@RequestBody @Valid User pUser) {
        return this.userRepository.save(pUser);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleTodoNotFound(UserNotFoundException ex) {
    }
}
